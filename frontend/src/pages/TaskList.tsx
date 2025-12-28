import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Loader2,
  AlertCircle,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import TaskItem from "../components/TaskItem";

const TaskList: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data: tasksData, isLoading, error } = useTasks(page);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 rounded-lg p-8">
        <AlertCircle className="h-10 w-10 mb-3" />
        <p className="font-medium">Error loading tasks</p>
        <p className="text-sm mt-1">Please try again later.</p>
      </div>
    );
  }

  const tasks = tasksData?.data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your daily goals and todos
          </p>
        </div>
        <Link
          to="/add-task"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Link>
      </div>

      <div className="space-y-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <CheckSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
            <p className="mt-1 text-gray-500">
              Get started by creating a new task.
            </p>
            <div className="mt-6">
              <Link
                to="/add-task"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Task
              </Link>
            </div>
          </div>
        )}
      </div>

      {tasksData && tasksData.last_page > 1 && (
        <div className="flex justify-center mt-6">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Page {page} of {tasksData.last_page}
            </span>
            <button
              onClick={() =>
                setPage((p) => Math.min(tasksData.last_page, p + 1))
              }
              disabled={page === tasksData.last_page}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TaskList;
