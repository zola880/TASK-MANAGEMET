import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get('/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div>
      <PageHeader title="Team" subtitle="All registered members" />

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No team members yet</h3>
          <p>Registered members will appear here.</p>
        </div>
      ) : (
        <div className="user-list-container">
          {users.map(u => (
            <Link
              to={`/users/${u._id}`}
              key={u._id}
              className="user-list-item"
            >
              <div className="user-list-avatar">
                {getInitials(u.name)}
              </div>

              <div className="user-list-info">
                <span className="user-list-name">{u.name}</span>
                <span className="user-list-email">{u.email}</span>
              </div>

              <span className={`badge user-list-role ${u.role === 'admin' ? 'priority-high' : 'status-completed'}`}>
                {u.role}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;