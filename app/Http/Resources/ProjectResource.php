<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'due_date' => Carbon::createFromDate($this->due_date)->format('d-m-Y'),
            'status' => $this->status,
            'image' => $this->image,
            'created_by' => new UserResource($this->createdBy),
            'updated_by' => new UserResource($this->updatedBy),
            'created_at' => Carbon::createFromDate($this->created_at)->format('d-m-Y'),
            'updated_at' => Carbon::createFromDate($this->updated_at)->format('d-m-Y'),
        ];
    }
}
