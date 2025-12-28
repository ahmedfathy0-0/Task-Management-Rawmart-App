export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  status: string;
  message?: string;
  user: User;
  authorisation: {
    token: string;
    type: string;
  };
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}
