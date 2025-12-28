<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        // All task routes require a valid JWT token
        // But we handle this in the routes file mostly
    }

    public function index()
    {
        // Get tasks for the CURRENTLY logged in user only
        $tasks = Task::where('user_id', Auth::guard('api')->id())->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'in:pending,in_progress,done',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'pending',
            'user_id' => Auth::guard('api')->id(),
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task || $task->user_id !== Auth::guard('api')->id()) {
            return response()->json(['message' => 'Not found or Unauthorized'], 404);
        }

        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task || $task->user_id !== Auth::guard('api')->id()) {
            return response()->json(['message' => 'Not found or Unauthorized'], 404);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}