# Task Management System

A full-stack Task Management System built with React, Node.js, Express, and MongoDB. The application enables teams to organize work efficiently through role-based access control, task assignment, progress tracking, file attachments, and dashboard analytics.

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Password hashing with bcryptjs
* Role-based access control (Admin and Team Member)

### Task Management

* Create, read, update, and delete tasks
* Assign tasks to team members
* Track task progress and status
* Set priorities and due dates
* Upload and download task attachments

### Dashboard

* Overview of task statistics
* Task status summaries
* Upcoming deadline notifications
* Team performance insights

### Team Management

* View all registered team members
* Monitor assigned tasks
* Track individual task completion statistics

---

## Technology Stack

### Frontend

* React 18
* Vite
* React Router DOM
* Axios
* Context API
* Lucide React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose ODM

---

## Project Structure

```text
TASK-MANAGEMET/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Before running the project, ensure you have:

* Node.js (v18 or later)
* npm or yarn
* MongoDB Atlas account or local MongoDB installation

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/zola880/TASK-MANAGEMET.git
cd TASK-MANAGEMET
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend Environment Variables

Create a `.env` file inside the `backend` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
UPLOAD_PATH=uploads
PORT=5000
FRONTEND_URL=http://localhost:5173
```

#### Variable Description

| Variable     | Description                     |
| ------------ | ------------------------------- |
| MONGO_URI    | MongoDB connection string       |
| JWT_SECRET   | Secret key used for JWT signing |
| UPLOAD_PATH  | Directory for uploaded files    |
| PORT         | Backend server port             |
| FRONTEND_URL | Frontend application URL        |

---

### Frontend Environment Variables

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=/api
```

For production deployment:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Start Frontend Server

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Default Workflow

### Team Member

* Register an account
* Log in
* View assigned tasks
* Update task status
* Upload attachments
* Track task progress

### Admin

* Create tasks
* Assign tasks to team members
* Edit and delete tasks
* View all users
* Monitor team performance
* Access dashboard statistics

---

## API Overview

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | User login          |

### Tasks

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /api/tasks     | Get tasks        |
| POST   | /api/tasks     | Create task      |
| GET    | /api/tasks/:id | Get task details |
| PUT    | /api/tasks/:id | Update task      |
| DELETE | /api/tasks/:id | Delete task      |

### Users

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /api/users     | Get all users    |
| GET    | /api/users/:id | Get user details |

---

# Design Summary

## Architecture Decisions

### MERN Stack Architecture

The application follows a MERN architecture consisting of MongoDB, Express.js, React, and Node.js. This approach allows development using JavaScript across the entire stack, improving maintainability and development speed.

### RESTful API Design

The backend exposes RESTful endpoints for authentication, user management, and task operations. This separation ensures a clean architecture and allows independent frontend and backend development.

### JWT Authentication

JWT was chosen to provide secure, stateless authentication. Protected routes require valid tokens, reducing server-side session management complexity.

### MongoDB Database

MongoDB was selected because task and user data fit naturally into a document-based structure, allowing flexible schema evolution.

### React Context API

Authentication and user information are managed globally using React Context API, reducing unnecessary prop drilling.

### File Management

Multer is used to handle file uploads and attachment storage securely.

---

## Security Considerations

* Passwords are hashed using bcryptjs.
* Protected routes require valid JWT tokens.
* Role-based authorization restricts access to sensitive operations.
* Environment variables are used to store confidential credentials.
* Input validation is applied before database operations.

---

## Challenges Faced

* Implementing role-based access control.
* Managing file uploads and downloads.
* Maintaining secure authentication workflows.
* Synchronizing task assignments and status updates.

---

## Future Improvements

* Real-time notifications using Socket.IO.
* Email reminders for approaching deadlines.
* Advanced search and filtering.
* Activity logs and audit tracking.
* Team collaboration features.

---

## Deployment

### Frontend Deployment (Vercel)

1. Connect the frontend project to Vercel.
2. Configure:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

3. Deploy.

### Backend Deployment (Render/Railway)

Configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
UPLOAD_PATH=uploads
PORT=5000
```

Deploy the backend service.

---

## License

This project was developed for educational and assessment purposes.
