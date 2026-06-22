import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Redirects to login if not authenticated
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

// Also checks for admin role
export const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return isAdmin ? children : <Navigate to="/dashboard" />;
};