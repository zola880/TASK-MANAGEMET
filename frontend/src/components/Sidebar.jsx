import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ClipboardList,
  PlusSquare,
  Users,
  UserCheck,
  LogOut,
  Copy,
  Check
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? 'active' : ''}`;

  const copySecretKey = () => {
    if (user?.team?.secretKey) {
      navigator.clipboard.writeText(user.team.secretKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-logo" onClick={onClose}>
            TaskFlow
          </NavLink>
          {user?.team?.name && (
            <p className="sidebar-team-name">{user.team.name}</p>
          )}
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={linkClass} end onClick={onClose}>
            <LayoutDashboard size={18} strokeWidth={2} />
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className={linkClass} end onClick={onClose}>
            <ClipboardList size={18} strokeWidth={2} />
            My Tasks
          </NavLink>
          {isAdmin && (
            <>
              <NavLink to="/assigned-tasks" className={linkClass} end onClick={onClose}>
                <UserCheck size={18} strokeWidth={2} />
                Assigned Tasks
              </NavLink>
              <NavLink to="/tasks/new" className={linkClass} end onClick={onClose}>
                <PlusSquare size={18} strokeWidth={2} />
                Create Task
              </NavLink>
              <NavLink to="/users" className={linkClass} end onClick={onClose}>
                <Users size={18} strokeWidth={2} />
                Team
              </NavLink>
            </>
          )}
        </nav>

        {/* Admin secret key section */}
        {isAdmin && user?.team?.secretKey && (
          <div className="sidebar-secret-key">
            <p className="secret-key-label">Team Key</p>
            <div className="secret-key-row">
              <code className="secret-key-value">{user.team.secretKey}</code>
              <button
                className="btn-copy-key"
                onClick={copySecretKey}
                title="Copy secret key"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}

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