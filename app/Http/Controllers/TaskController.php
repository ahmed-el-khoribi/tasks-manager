<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Task;
use App\Traits\ApiResponse;
use Exception;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

/**
 * Class TaskController
 *
 * This controller handles the operations on tasks.
 */
class TaskController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the tasks.
     *
     * @param Request $request The request object will be needed in case of applying filters or sort order.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Determine sorting order
            $sortOrder = $request->query('sort', 'desc');

            // Determine pagination size
            $perPage = $request->query('per_page', 10);

            // Get search query
            $search = $request->query('search', null);

            // Fetch tasks using model scopes
            $tasks = Task::search($search)
                         ->sortByCreatedAt($sortOrder)
                         ->paginateTasks($perPage);

            return $this->successResponse($tasks, 'Tasks retrieved successfully');
        } catch (Exception $e) {
            // Log the exception message if needed
            // Log::error($e->getMessage());

            return $this->errorResponse('Failed to retrieve tasks', 500, $e->getMessage());
        }
    }

    /**
     * Store a newly created task in storage.
     *
     * @param StoreTaskRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        try {
            $task = Task::create($request->only(['title', 'description', 'status']));

            return $this->successResponse($task, 'Task created successfully', 201);
        } catch (Exception $e) {
            // Log the exception message if needed
            // Log::error($e->getMessage());

            return $this->errorResponse('Failed to create task', 500, $e->getMessage());
        }
    }

    /**
     * Display the specified task.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);

            return $this->successResponse($task, 'Task retrieved successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Task not found', 404, $e->getMessage());
        }
    }

    /**
     * Update the specified task in storage.
     *
     * @param UpdateTaskRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);
            $task->update($request->only(['title', 'description', 'status']));

            return $this->successResponse($task, 'Task updated successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to update task', 500, $e->getMessage());
        }
    }

    /**
     * Remove the specified task from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();

            return $this->successResponse(null, 'Task deleted successfully');
        } catch (Exception $e) {
            return $this->errorResponse('Failed to delete task', 500, $e->getMessage());
        }
    }
} 