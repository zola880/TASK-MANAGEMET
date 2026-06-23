# TaskFlow – Team Task Management System

TaskFlow is a full-stack task management platform built with React (Vite), Node.js/Express, and MongoDB. The application enables teams to organize work, assign tasks, track progress, manage deadlines, and collaborate efficiently through a secure role-based system.

The platform supports task creation, assignment, status tracking, file attachments, dashboard analytics, and user management. It is designed with a responsive interface that provides a seamless experience across desktop, tablet, and mobile devices.

---

## Technology Stack

| Layer    | Technology                                           |
| -------- | ---------------------------------------------------- |
| Frontend | React 18, Vite, React Router v6, Axios, Lucide Icons |
| Backend  | Node.js, Express, Mongoose, JWT, bcryptjs, Multer    |
| Database | MongoDB Atlas                                        |
| Storage  | Local File System (Development), MongoDB Metadata    |

---

## Features

### Authentication

* JWT-based user registration and login
* Secure password hashing using bcryptjs
* Protected routes and API endpoints

### Role-Based Access Control

* Admin users can create, assign, edit, and delete tasks
* Team Members can view and update their assigned tasks
* Access restrictions enforced on both frontend and backend

### Task Management

* Create, read, update, and delete tasks
* Assign tasks to team members
* Set task priority, status, and due dates
* Track task progress in real time

### File Attachments

* Upload files when creating or updating tasks
* Download attached files directly from task details
* Supports documents, PDFs, and image files

### Dashboard

* Displays task statistics and summaries
* Highlights tasks approaching their deadlines
* Provides quick insight into team productivity

### Team Directory

* View all registered users
* Access user-specific task statistics
* Monitor assigned and completed work

### User Interface

* Responsive layout for desktop, tablet, and mobile devices
* Professional sidebar navigation and dashboard design
* Clean typography and intuitive user experience

---

## Project Structure

```text
TASK-MANAGEMET/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── uploads/
│   ├── server.js
│   ├── .env
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
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Before running the application, ensure the following software is installed:

* Node.js v18 or higher
* npm (included with Node.js) or yarn
* MongoDB Atlas account or local MongoDB installation
* Git

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

### Backend Configuration

Create a `.env` file inside the `backend` folder and add the following variables:


MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-this
UPLOAD_PATH=uploads
FRONTEND_URL=http://localhost:3000
```

| Variable     | Description                                         |
| ------------ | --------------------------------------------------- |
| MONGO_URI    | MongoDB connection string (Atlas or local instance) |
| JWT_SECRET   | Secret key used to sign JSON Web Tokens             |
| UPLOAD_PATH  | Directory used to store uploaded files              |
| FRONTEND_URL | Frontend origin for CORS configuration              |

### Frontend Configuration

Create a `.env` file inside the `frontend` folder and add:

```env
VITE_API_URL=/api
```

Development:

```env
VITE_API_URL=/api
```

Production Example:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Setup and Execution Steps

### Step 1: Start the Backend Server

Open a terminal and run:


cd backend
npm run dev

Alternatively:

nodemon server.js


The backend server will start on:


http://localhost:5000


A successful connection will display a MongoDB connection message in the terminal.

### Step 2: Start the Frontend Server

Open a new terminal window and run:

cd frontend
npm run dev


The frontend application will start on:


http://localhost:3000


The Vite proxy automatically forwards API requests to the backend server.

### Step 3: Access the Application

Open your browser and navigate to:


http://localhost:3000


Register a new account and log in to begin using the application.

---

## Usage

### User Roles

#### Admin

Admins can:

* Create tasks
* Assign tasks to team members
* Update any task
* Delete any task
* View all users
* Access user statistics
* Monitor team performance

#### Team Member

Team Members can:

* View assigned tasks
* Update task status
* Upload task attachments
* Track personal progress

---

### Task Management

#### Create Tasks

Administrators can create tasks by:

1. Selecting **Create Task**
2. Entering task information
3. Assigning a user
4. Setting priority and due date
5. Uploading optional attachments

#### View Tasks

Tasks are displayed in the task list and dashboard views with status and priority indicators.

#### Update Tasks

Users can:

* Change task status
* Modify task details (Admin)
* Upload new attachments

#### Delete Tasks

Administrators can permanently remove tasks from the system.

---

### File Attachments

The platform supports:

* PDF files
* Image files
* Document files

Attachments can be uploaded during task creation or task updates and downloaded from the task details page.

---

### Dashboard

The dashboard provides:

* Total Tasks
* To Do Tasks
* In Progress Tasks
* Completed Tasks
* Deadline warnings for tasks due within the next three days


---

### Team Directory

Admins can:

* View all registered users
* View all Asigned Tasks 
* Access user profiles
* Review assigned tasks
* Monitor completion statistics
* Dlete tasks

---

## Deployment

### Frontend Deployment (Vercel)

1. Connect the frontend directory to Vercel.
2. Configure the environment variable:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

3. Deploy the application.

---

### Backend Deployment (Render)

1. Connect the backend directory to Render.
2. Configure the following environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
UPLOAD_PATH=uploads
PORT=5000
```

3. Deploy the backend service.

---

## Production Notes

For file downloads in production, attachment URLs must reference the deployed backend URL.

Example:


https://your-backend-url.com/uploads/file-name.pdf


Update download links accordingly before deployment.


Author

 Zelalem ybabe

GitHub: zola880

Email: zelalemybabe77@gmail.com