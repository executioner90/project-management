<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
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

    public function create()
    {
        //
    }

    public function store(StoreProjectRequest $request)
    {
        //
    }

    public function show(Project $project)
    {
        //
    }

    public function edit(Project $project)
    {
        //
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    public function destroy(Project $project)
    {
        //
    }
}
