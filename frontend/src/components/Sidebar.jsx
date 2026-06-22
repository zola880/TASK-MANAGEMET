import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
          <NavLink to="/dashboard" className="sidebar-logo" onClick={onClose}>TaskFlow</NavLink>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
            <span>📊</span> Dashboard
          </NavLink>
          <NavLink to="/tasks" className={linkClass} onClick={onClose}>
            <span>📋</span> My Tasks
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/tasks/new" className={linkClass} onClick={onClose}>
                <span>➕</span> Create Task
              </NavLink>
              <NavLink to="/users" className={linkClass} onClick={onClose}>
                <span>👥</span> Team
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
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;