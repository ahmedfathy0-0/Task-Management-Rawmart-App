import React from "react";
import type { Task } from "../types";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import clsx from "clsx";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const updateMutation = useUpdateTask();

  const deleteMutation = useDeleteTask();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(task.id);
    }
  };

  const toggleStatus = () => {
    const newStatus = task.status === "done" ? "pending" : "done";
    updateMutation.mutate({ id: task.id, status: newStatus });
  };

  const isCompleted = task.status === "done";

  return (
    <div
      className={clsx(
        "bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md flex items-start justify-between group",
        isCompleted ? "border-green-100 bg-green-50/30" : "border-gray-200"
      )}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center mb-1">
          <h3
            className={clsx(
              "font-semibold text-lg transition-colors",
              isCompleted
                ? "text-gray-500 line-through decoration-gray-400"
                : "text-gray-900"
            )}
          >
            {task.title}
          </h3>
          <span
            className={clsx(
              "ml-3 px-2 py-0.5 text-xs rounded-full capitalize font-medium",
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-800"
            )}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>

        {task.description && (
          <p
            className={clsx(
              "text-sm mt-1 mb-2",
              isCompleted ? "text-gray-400" : "text-gray-600"
            )}
          >
            {task.description}
          </p>
        )}

        <div className="text-xs text-gray-400 mt-2">
          Created: {new Date(task.created_at).toLocaleDateString()}
        </div>
      </div>

      <div className="flex items-center space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={toggleStatus}
          disabled={updateMutation.isPending}
          className={clsx(
            "p-2 rounded-full transition-colors",
            isCompleted
              ? "text-yellow-600 hover:bg-yellow-50 bg-white border border-yellow-200"
              : "text-green-600 hover:bg-green-50 bg-white border border-green-200"
          )}
          title={isCompleted ? "Mark as Pending" : "Mark as Done"}
        >
          {isCompleted ? <XCircle size={20} /> : <CheckCircle size={20} />}
        </button>

        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="p-2 text-red-600 hover:bg-red-50 bg-white border border-red-200 rounded-full transition-colors"
          title="Delete Task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
