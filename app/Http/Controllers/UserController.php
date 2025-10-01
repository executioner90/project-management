<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $this->validatedGetRequest($request);

        $projects = User::query()
            ->when(
                $request->input('search'),
                fn($query) => $query->where('name', 'like', '%' . $request->input('search') . '%')
                    ->orWhere('email', 'like', '%' . $request->input('search') . '%')
            )
            ->when($request->input('sort_field'), fn($query) => $query->orderBy($request->input('sort_field'), $request->input('sort_direction')))
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('User/Index')
            ->with([
                'users' => UserResource::collection($projects),
                'queryParams' => $request->query() ?? null,
            ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Form');
    }

    public function store(UserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['email_verified_at'] = now();
        $data['password'] = Hash::make($data['password']);

        $user = User::query()->create($data);

        return Redirect::route('user.index')
            ->with([
                'success' => 'User ' . $user->name . ' created successfully',
            ]);
    }

    public function edit(User $user): Response
    {
        return Inertia::render('User/Form')
            ->with([
                'user' => new UserResource($user),
            ]);
    }

    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;

        if ($password) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        dd($data);

        $user->update($data);

        return Redirect::route('user.index')
            ->with([
                'success' => 'User ' . $user->name . ' updated successfully',
            ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
    }

    protected function validatedGetRequest(Request $request): void {
        $request->validate([
            'search' => ['nullable', 'string'],
            'sort_field' => ['nullable', 'string', 'in:id,name,email,created_at'],
            'sort_direction' => ['nullable', 'string', 'in:asc,desc'],
        ]);
    }
}
