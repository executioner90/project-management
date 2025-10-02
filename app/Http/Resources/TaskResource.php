<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'due_date' => Carbon::createFromDate($this->due_date)->format('Y-m-d'),
            'status' => $this->status,
            'priority' => $this->priority,
            'image' => $this->image,
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'assigned_to' => $this->assignedTo ? new UserResource($this->assignedTo) : null,
            'project' => new ProjectResource($this->project),
            'created_at' => Carbon::createFromDate($this->created_at)->format('Y-m-d'),
            'updated_at' => Carbon::createFromDate($this->updated_at)->format('Y-m-d'),
        ];
    }
}
