import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ClipboardList,
  PlusSquare,
  Users,
  LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-logo" onClick={onClose}>
            TaskFlow
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
            <LayoutDashboard size={18} strokeWidth={2} />
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className={linkClass} onClick={onClose}>
            <ClipboardList size={18} strokeWidth={2} />
            My Tasks
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/tasks/new" className={linkClass} onClick={onClose}>
                <PlusSquare size={18} strokeWidth={2} />
                Create Task
              </NavLink>
              <NavLink to="/users" className={linkClass} onClick={onClose}>
                <Users size={18} strokeWidth={2} />
                Team
              </NavLink>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={16} strokeWidth={2} style={{ marginRight: '6px' }} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;