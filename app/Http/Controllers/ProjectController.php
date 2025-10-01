<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $this->validatedGetRequest($request);

        $projects = Project::query()
            ->when($request->input('name'), fn($query) => $query->where('name', 'like', '%' . $request->input('name') . '%'))
            ->when($request->input('status'), fn($query) => $query->where('status', $request->input('status')))
            ->when($request->input('sort_field'), fn($query) => $query->orderBy($request->input('sort_field'), $request->input('sort_direction')))
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Project/Index')
            ->with([
                'projects' => ProjectResource::collection($projects),
                'queryParams' => $request->query() ?? null,
            ]);
    }

    public function create(): Response
    {
        return Inertia::render('Project/Form');
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();
        $image = Arr::pull($validated, 'image');

        $project = Project::query()->create($validated);

        if ($image instanceof UploadedFile) {
            $imageOriginalName = $image->getClientOriginalName();
            $imageOriginalName = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $imageOriginalName);

            $image->storeAs('project/' . $project->id , $imageOriginalName, 'public');
            $project->update(['image' => $imageOriginalName]);
        }

        return Redirect::route('project.index')
            ->with([
                'success' => 'Project ' . $project->name . ' created successfully',
            ]);
    }

    public function show(Project $project, Request $request): Response
    {
        $this->validatedGetRequest($request);

        $tasks = $project->tasks()
            ->when($request->input('name'), fn($query) => $query->where('name', 'like', '%' . $request->input('name') . '%'))
            ->when($request->input('status'), fn($query) => $query->where('status', $request->input('status')))
            ->when($request->input('sort_field'), fn($query) => $query->orderBy($request->input('sort_field'), $request->input('sort_direction')))
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Project/Show')
            ->with([
                'project' => new ProjectResource($project),
                'tasks' => TaskResource::collection($tasks),
                'queryParams' => $request->query() ?? null,
            ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Project/Form')
            ->with([
                'project' => new ProjectResource($project),
            ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $validated = $request->validated();
        $validated['updated_by'] = Auth::id();
        $validated['due_date'] = $request->date('due_date')->format('Y-m-d');
        $image = Arr::pull($validated, 'image');

        $project->update($validated);

        if ($image instanceof UploadedFile) {
            Storage::disk('public')->delete("project/{$project->id}/{$project->getRawOriginal('image')}");

            $imageOriginalName = $image->getClientOriginalName();
            $imageOriginalName = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $imageOriginalName);

            $image->storeAs('project/' . $project->id , $imageOriginalName, 'public');
            $project->update(['image' => $imageOriginalName]);
        }

        return Redirect::route('project.index')
            ->with([
                'success' => 'Project ' . $project->name . ' updated successfully',
            ]);
    }

    public function destroy(Project $project)
    {
        $name = $project->name;

        if ($project->image) {
            Storage::disk('public')->delete("project/{$project->id}/{$project->getOriginal('image')}");
        }

        $project->delete();

        return Redirect::route('project.index')
            ->with([
                'success' => "Project $name deleted successfully",
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
