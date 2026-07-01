import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TaskListPage from './pages/TaskListPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskFormPage from './pages/TaskFormPage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import AssignedTasksPage from './pages/AssignedTasksPage';  
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
      <AuthProvider>
        <div className="app-layout">
          <button className="hamburger" onClick={toggleSidebar}>☰</button>
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          <main className="main-content" onClick={closeSidebar}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute><TaskListPage /></ProtectedRoute>
              } />
              <Route path="/tasks/new" element={
                <AdminRoute><TaskFormPage /></AdminRoute>
              } />
              <Route path="/tasks/:id" element={
                <ProtectedRoute><TaskDetailPage /></ProtectedRoute>
              } />
              <Route path="/tasks/:id/edit" element={
                <AdminRoute><TaskFormPage /></AdminRoute>
              } />
              <Route path="/users" element={
                <AdminRoute><UsersPage /></AdminRoute>
              } />
              <Route path="/users/:userId" element={
                <AdminRoute><UserDetailPage /></AdminRoute>
              } />

              {/*Admin Assigned Tasks page */}
              <Route path="/assigned-tasks" element={
                <AdminRoute><AssignedTasksPage /></AdminRoute>
              } />

              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;