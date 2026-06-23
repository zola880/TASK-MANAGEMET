# Design Summary – TaskFlow Team Task Management System

## 1. Overview

TaskFlow is a full-stack web application designed to help software teams organize work, track progress, and monitor task completion. The platform supports two user roles (Admin and Team Member), JWT-based authentication, task management, file attachments, and a dashboard for monitoring project activity and deadlines.

The application is built using:

* React (Vite) for the frontend
* Node.js and Express for the backend
* MongoDB with Mongoose for data persistence
* JWT for authentication and authorization
* Multer for file upload handling

The goal of the project is to provide a secure, scalable, and user-friendly task management system suitable for small development teams.

---

# 2. Architecture Decisions

   ## 2.1 Layered Backend Architecture

The backend follows a layered architecture inspired by the Model-View-Controller (MVC) pattern.

### Routes

Routes define API endpoints and map incoming requests to controller functions.

### Controllers

Controllers contain the application business logic and coordinate interactions between routes and database models.

### Models

Models define MongoDB collections using Mongoose schemas and provide data validation.

### Middleware

Middleware handles authentication, authorization, and file upload processing before requests reach controllers.



  ## 2.2 React Frontend Architecture

The frontend is organized into reusable modules and follows a component-based architecture.

### Components

Reusable UI elements such as:

* Sidebar
* TaskCard
* FileUpload
* PageHeader
* StatusSummaryCards

### Pages

Route-level components responsible for rendering complete application screens.

### Context

React Context API is used for global authentication state management.

### Services

A centralized Axios instance manages API communication and JWT authentication headers.


## 2.3 MongoDB and Mongoose

MongoDB was selected because task data contains optional and flexible fields such as attachments, due dates, and assignment information.

Mongoose provides:

* Schema validation
* Data modeling
* Relationship population
* Middleware support


# 3. Role-Based Access Control (RBAC)

  ## 3.1 Backend Authorization

The system supports two user roles:

* Admin
* Member

User roles are stored within the User model and included inside the JWT token after login.

Authorization is enforced using middleware:

### protect Middleware

Responsible for:

* Verifying JWT tokens
* Authenticating requests
* Attaching the authenticated user to `req.user`

### authorize Middleware

Responsible for:

* Checking user roles
* Restricting access to protected endpoints


Only administrators can delete tasks.

### Reason for This Design

Authorization is enforced on the server to ensure security regardless of frontend behavior.


## 3.2 Frontend Authorization

The frontend uses:

* ProtectedRoute
* AdminRoute

to restrict access to protected pages.

User interface elements are conditionally displayed based on the authenticated user's role.

Examples:

* Create Task button
* Team Directory page
* Administrative actions

# 4. Authentication Flow

## Registration

A user submits:

* Name
* Email
* Password

The password is hashed using bcryptjs before storage.

A JWT token is generated and returned immediately after successful registration.


## Login

The user submits credentials.

The backend:

1. Verifies the email.
2. Compares the password hash.
3. Generates a JWT token.

The token remains valid for 30 days.


## Authenticated Requests

The frontend automatically attaches the JWT token using an Axios interceptor.


Authorization: Bearer <token>

# 5. File Upload Handling

## 5.1 Backend File Upload Process

Multer is used to handle file uploads.

### Configuration

* Disk storage
* Maximum file size: 5 MB
* Allowed file types:

  * Images
  * PDF
  * DOC
  * DOCX
  * TXT

### Storage

Uploaded files are stored inside:


backend/uploads/


File metadata is stored inside the associated task document.

Stored metadata includes:

* Filename
* Original filename
* MIME type
* File size

### File Access

Express exposes uploaded files through:


/uploads/<filename>


### Reason for This Design

Multer integrates naturally with Express and provides a simple solution for handling document uploads.


## 5.2 Frontend File Upload Process

Task forms use FormData to send both text fields and files in a single request.

The FileUpload component provides:

* File selection
* File preview
* File removal before submission

In production environments, file downloads use the backend's public URL.



## 5.3 File Upload Trade-Offs

| Decision                   | Trade-Off                                                      |
| -------------------------- | -------------------------------------------------------------- |
| Local disk storage         | Easy to implement but not suitable for distributed deployments |
| 5 MB limit                 | Prevents excessive storage usage but restricts large files     |
| Metadata stored in MongoDB | Simplifies lookup but requires file synchronization            |
| No automatic file cleanup  | Old files may remain on disk after task deletion               |

### Future Improvement

For production-scale systems, cloud storage solutions such as AWS S3 or Cloudinary would provide better reliability and scalability.


# 6. Dashboard and Deadline Monitoring

The dashboard provides a summary of task activity.

### Statistics

* Total Tasks
* To Do Tasks
* In Progress Tasks
* Completed Tasks

### Deadline Monitoring

The system identifies tasks that:

* Are due within the next three days
* Are not yet completed

### Reason for This Design

Users receive immediate visibility into workload and upcoming deadlines without manually reviewing every task.


# 7. User Interface and User Experience Decisions

## Sidebar Navigation

A persistent sidebar provides quick access to all major application features.

This pattern is commonly used in modern productivity platforms and improves navigation efficiency.



## Card-Based Task Layout

Tasks are displayed as compact cards containing:

* Title
* Status
* Priority
* Due Date

This improves readability and allows users to scan tasks quickly.


## Consistent Design System

The interface follows a consistent design language including:

* Standard spacing
* Uniform button styles
* Consistent typography
* Responsive layouts

This creates a professional and predictable user experience.


## Empty States

When no data exists, users are presented with informative empty-state messages and clear calls to action.

This improves usability for first-time users.


# 8. Conclusion

TaskFlow was designed to balance simplicity, maintainability, and functionality. The layered backend architecture and component-based frontend structure make the system easy to extend and maintain. Role-based access control is enforced at both the frontend and backend levels, while file handling is implemented in a way that can be upgraded to cloud storage in the future.

The application demonstrates modern full-stack development practices and provides a professional user experience suitable for team collaboration and task management.

Author zelalem ybabe
