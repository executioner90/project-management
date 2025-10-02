<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();

        $myPendingTasks = Task::query()
            ->where('assigned_to', $user->id)
            ->where('status', 'pending')
            ->count();

        $totalInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();

        $myInProgressTasks = Task::query()
            ->where('assigned_to', $user->id)
            ->where('status', 'in_progress')
            ->count();

        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();

        $myCompletedTasks = Task::query()
            ->where('assigned_to', $user->id)
            ->where('status', 'completed')
            ->count();

        $activeTasks = Task::query()
            ->where('assigned_to', $user->id)
            ->whereNot('status', 'completed')
            ->orderby('created_at', 'desc')
            ->limit(10)
            ->get();

//        dd($activeTasks);
        return Inertia::render('Dashboard')
            ->with([
                'data' => [
                    'totalPendingTasks' => $totalPendingTasks,
                    'myPendingTasks' => $myPendingTasks,
                    'totalInProgressTasks' => $totalInProgressTasks,
                    'myInProgressTasks' => $myInProgressTasks,
                    'totalCompletedTasks' => $totalCompletedTasks,
                    'myCompletedTasks' => $myCompletedTasks,
                ],
                'activeTasks' => TaskResource::collection($activeTasks),
            ]);
    }
}
