export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  TASKS: "/tasks",
};

export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export type TaskStatusType = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
