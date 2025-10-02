<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        $this->validatedGetRequest($request);

        $tasks = Task::query()
            ->when($request->input('name'), fn($query) => $query->where('name', 'like', '%' . $request->input('name') . '%'))
            ->when($request->input('status'), fn($query) => $query->where('status', $request->input('status')))
            ->when($request->input('sort_field'), fn($query) => $query->orderBy($request->input('sort_field'), $request->input('sort_direction')))
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Task/Index')
            ->with([
                'tasks' => TaskResource::collection($tasks),
                'queryParams' => $request->query() ?? null,
            ]);
    }

    public function create(): Response
    {
        $projects = Project::query()
            ->orderBy('name')
            ->get()
            ->map(fn ($project) => [
                'id' => $project->id,
                'name' => $project->name,
            ]);

        $users = User::query()
            ->orderBy('name')
            ->get()
            ->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
            ]);

        return Inertia::render('Task/Form')
            ->with([
                'projects' => $projects,
                'users' => $users,
            ]);
    }

    public function store(TaskRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();
        $image = Arr::pull($validated, 'image');

        $task = Task::query()->create($validated);

        if ($image instanceof UploadedFile) {
            $imageOriginalName = $image->getClientOriginalName();
            $imageOriginalName = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $imageOriginalName);

            $image->storeAs('task/' . $task->id , $imageOriginalName, 'public');
            $task->update(['image' => $imageOriginalName]);
        }

        return Redirect::route('task.index')
            ->with([
                'success' => 'Task ' . $task->name . ' created successfully',
            ]);
    }

    public function show(Task $task): Response
    {
        return Inertia::render('Task/Show')
            ->with(['task' => new TaskResource($task)]);
    }

    public function edit(Task $task): Response
    {
        $projects = Project::query()
            ->orderBy('name')
            ->get()
            ->map(fn ($project) => [
                'id' => $project->id,
                'name' => $project->name,
            ]);

        $users = User::query()
            ->orderBy('name')
            ->get()
            ->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
            ]);

        return Inertia::render('Task/Form')
            ->with([
                'task' => new TaskResource($task),
                'projects' => $projects,
                'users' => $users,
            ]);
    }

    public function update(TaskRequest $request, Task $task): RedirectResponse
    {
        $validated = $request->validated();
        $validated['updated_by'] = Auth::id();
        $validated['due_date'] = $request->date('due_date')->format('Y-m-d');
        $image = Arr::pull($validated, 'image');

        $task->update($validated);

        if ($image instanceof UploadedFile) {
            Storage::disk('public')->deleteDirectory("task/{$task->id}");

            $imageOriginalName = $image->getClientOriginalName();
            $imageOriginalName = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $imageOriginalName);

            $image->storeAs('task/' . $task->id , $imageOriginalName, 'public');
            $task->update(['image' => $imageOriginalName]);
        }

        return Redirect::route('task.index')
            ->with([
                'success' => 'Task ' . $task->name . ' updated successfully',
            ]);
    }

    public function destroy(Task $task): RedirectResponse
    {
        $name = $task->name;

        if ($task->image) {
            Storage::disk('public')->deleteDirectory("task/{$task->id}");
        }

        $task->delete();

        return Redirect::route('task.index')
            ->with([
                'success' => "Task $name deleted successfully",
            ]);
    }

    protected function validatedGetRequest(Request $request): void {
        $request->validate([
            'name' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:pending,completed,in_progress'],
            'sort_field' => ['nullable', 'string', 'in:id,name,status,priority,created_at,due_date'],
            'sort_direction' => ['nullable', 'string', 'in:asc,desc'],
        ]);
    }
}
