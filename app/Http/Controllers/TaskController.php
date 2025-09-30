<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'name' => ['nullable', 'string'],
            'status' => ['nullable', 'string', 'in:pending,completed,in_progress'],
            'sort_field' => ['nullable', 'string', 'in:id,name,status,created_at,due_date'],
            'sort_direction' => ['nullable', 'string', 'in:asc,desc'],
        ]);

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

    public function create()
    {
        //
    }

    public function store(StoreTaskRequest $request)
    {
        //
    }

    public function show(Task $task)
    {
        //
    }

    public function edit(Task $task)
    {
        //
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    public function destroy(Task $task)
    {
        //
    }
}
