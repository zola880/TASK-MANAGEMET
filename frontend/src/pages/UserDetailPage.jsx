import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';

const UserDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user info
        const usersRes = await api.get('/users');
        const foundUser = usersRes.data.find(u => u._id === userId);
        setUser(foundUser || { name: 'Unknown User', email: '' });

        // Get tasks assigned to this user
        const tasksRes = await api.get(`/tasks/user/${userId}`);
        const userTasks = tasksRes.data;
        setTasks(userTasks);

        const total = userTasks.length;
        const todo = userTasks.filter(t => t.status === 'To Do').length;
        const inProgress = userTasks.filter(t => t.status === 'In Progress').length;
        const completed = userTasks.filter(t => t.status === 'Completed').length;
        setStats({ total, todo, inProgress, completed });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div>
      <button className="btn-back" onClick={() => navigate('/users')}>
        ← Back to Team
      </button>

      <PageHeader
        title={user.name}
        subtitle={`${user.email} • ${user.role === 'admin' ? 'Administrator' : 'Team Member'}`}
      />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{stats.total}</div>
          </div>
        </div>
        <div className="stat-card stat-todo">
          <div className="stat-icon">📌</div>
          <div className="stat-content">
            <div className="stat-label">To Do</div>
            <div className="stat-value">{stats.todo}</div>
          </div>
        </div>
        <div className="stat-card stat-inprogress">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{stats.inProgress}</div>
          </div>
        </div>
        <div className="stat-card stat-completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{stats.completed}</div>
          </div>
        </div>
      </div>

      <h3 className="section-title" style={{ marginTop: '2rem' }}>Assigned Tasks</h3>
      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks assigned"
          description="This user hasn't been assigned any tasks yet."
          actionLabel="Assign Task"
          actionLink="/tasks/new"
        />
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => <TaskCard key={task._id} task={task} />)}
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;