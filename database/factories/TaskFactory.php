<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->realText(),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 years'),
            'status' => $this->faker->randomElement(['completed', 'in_progress', 'pending']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'image' => $this->faker->imageUrl(),
            'assigned_to' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'project_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
