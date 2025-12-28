import React from "react";
import type { Task } from "../types";
import { Trash2 } from "lucide-react";
import { useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import { TASK_STATUS, type TaskStatusType } from "../constants";
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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatusType;
    updateMutation.mutate({ id: task.id, status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case TASK_STATUS.DONE:
        return "bg-green-100 text-green-700 border-green-200";
      case TASK_STATUS.IN_PROGRESS:
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getContainerStyles = (status: string) => {
    if (status === TASK_STATUS.DONE) {
      return "border-green-100 bg-green-50/30";
    }
    return "border-gray-200";
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-lg border p-4 transition-all duration-200 hover:shadow-md flex items-start justify-between group",
        getContainerStyles(task.status)
      )}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center mb-1">
          <h3
            className={clsx(
              "font-semibold text-lg transition-colors",
              task.status === TASK_STATUS.DONE
                ? "text-gray-500 line-through decoration-gray-400"
                : "text-gray-900"
            )}
          >
            {task.title}
          </h3>
          <span
            className={clsx(
              "ml-3 px-2 py-0.5 text-xs rounded-full capitalize font-medium border",
              getStatusColor(task.status)
            )}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>

        {task.description && (
          <p
            className={clsx(
              "text-sm mt-1 mb-2",
              task.status === TASK_STATUS.DONE
                ? "text-gray-400"
                : "text-gray-600"
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
        <select
          value={task.status}
          onChange={handleStatusChange}
          disabled={updateMutation.isPending}
          className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-2 py-1 mr-2"
          onClick={(e) => e.stopPropagation()}
        >
          <option value={TASK_STATUS.PENDING}>Pending</option>
          <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
          <option value={TASK_STATUS.DONE}>Done</option>
        </select>

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
