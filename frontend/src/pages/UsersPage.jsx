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

  return (
    <div>
      <PageHeader title="Team" subtitle="All registered members" />
      {users.length === 0 ? (
        <p className="empty-state">No users found.</p>
      ) : (
        <div className="tasks-grid">
          {users.map(u => (
            <Link
              to={`/users/${u._id}`}          // 👈 this creates a link to the detail page
              key={u._id}
              className="task-card user-card-link"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="task-card-header">
                <h3 className="task-card-title">{u.name}</h3>
                <span className={`badge ${u.role === 'admin' ? 'priority-high' : 'status-completed'}`}>
                  {u.role}
                </span>
              </div>
              <div className="task-card-meta">
                <span className="meta-item">📧 {u.email}</span>
              </div>
              <div className="task-card-footer">
                <span className="btn-view">View Profile →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;