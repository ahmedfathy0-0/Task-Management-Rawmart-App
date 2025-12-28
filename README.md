# Task Management App

A full-stack task management application built with **Laravel 11** (backend) and **React + TypeScript** (frontend).

## 🚀 Features

- **Secure Authentication**: Uses **HttpOnly Cookies** (JWT) for secure, XSS-resistant authentication.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Status Tracking**: Mark tasks as Pending, In Progress, or Done.
- **Responsive UI**: Modern interface with instant feedback and error handling.

---

## 🛠️ Setup Instructions

### Backend (Laravel)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    composer install
    ```
3.  Set up environment file:
    ```bash
    cp .env.example .env
    ```
4.  Configure your database in `.env` (default is SQLite, but you can use MySQL/Postgres).
5.  Generate Application Key:
    ```bash
    php artisan key:generate
    ```
6.  Generate JWT Secret:
    ```bash
    php artisan jwt:secret
    ```
7.  Run Migrations and Seed Database:
    ```bash
    php artisan migrate --seed
    ```
    _This will create the database tables and seed test users._

### Frontend (React)

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

---

## ▶️ Running the Project

You need to run both the backend and frontend servers simultaneously.

**Terminal 1 (Backend):**

```bash
cd backend
php artisan serve
```

_Backend runs on `http://localhost:8000`_

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

_Frontend runs on `http://localhost:5173`_

---

## 🧪 Test Credentials

The database seeder creates two users for you to test with:

| User Role        | Email               | Password   |
| :--------------- | :------------------ | :--------- |
| **Admin**        | `admin@rawmart.com` | `password` |
| **Regular User** | `user@rawmart.com`  | `password` |

---

## 📡 API Endpoints

| Method     | Endpoint          | Description                         | Auth Required |
| :--------- | :---------------- | :---------------------------------- | :------------ |
| **POST**   | `/api/register`   | Register a new user                 | No            |
| **POST**   | `/api/login`      | Login and receive HttpOnly cookie   | No            |
| **POST**   | `/api/logout`     | Logout and clear cookie             | Yes           |
| **POST**   | `/api/refresh`    | Refresh session / Check auth status | Yes (Cookie)  |
| **GET**    | `/api/tasks`      | Get all tasks (paginated)           | Yes           |
| **POST**   | `/api/tasks`      | Create a new task                   | Yes           |
| **GET**    | `/api/tasks/{id}` | Get a specific task                 | Yes           |
| **PUT**    | `/api/tasks/{id}` | Update a task                       | Yes           |
| **DELETE** | `/api/tasks/{id}` | Delete a task                       | Yes           |

---

## 📸 Screenshots

_(Screenshots to be added in the `screenshots` folder)_

---

## 📌 Assumptions & Configuration

1.  **HttpOnly Cookies**: The authentication relies entirely on HttpOnly cookies. This means:
    - The backend (`localhost:8000`) and frontend (`localhost:5173`) must enable credentials (`withCredentials: true`).
    - **CORS** is strictly configured to allow `http://localhost:5173` only.
    - You cannot test authenticated endpoints easily with Postman unless you manually manage the cookie jar.
2.  **Environment**: The setup assumes a local development environment. For production, `SANCTUM_STATEFUL_DOMAINS` and `SESSION_DOMAIN` would need configuration.
3.  **Database**: Default configuration assumes SQLite or a properly configured MySQL server as per `.env`.
