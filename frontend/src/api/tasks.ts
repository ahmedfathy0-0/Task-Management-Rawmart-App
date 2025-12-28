import api from "./axios";
import { API_ENDPOINTS } from "../constants";
import type { Task, PaginatedResponse } from "../types";

export const fetchTasks = async (
  page: number = 1
): Promise<PaginatedResponse<Task>> => {
  const response = await api.get(`${API_ENDPOINTS.TASKS}?page=${page}`);
  return response.data;
};

export const createTask = async (task: {
  title: string;
  description: string;
  status: string;
}): Promise<Task> => {
  const response = await api.post(API_ENDPOINTS.TASKS, task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await api.put(`${API_ENDPOINTS.TASKS}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`${API_ENDPOINTS.TASKS}/${id}`);
};
