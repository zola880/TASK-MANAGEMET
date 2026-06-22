import { useState, useEffect } from 'react';
import api from '../services/api';

const StatusSummaryCards = ({ tasks: externalTasks }) => {
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    // If tasks are provided via props, use them; otherwise fetch independently
    const computeStats = (tasks) => {
      const total = tasks.length;
      const todo = tasks.filter(t => t.status === 'To Do').length;
      const inProgress = tasks.filter(t => t.status === 'In Progress').length;
      const completed = tasks.filter(t => t.status === 'Completed').length;
      setStats({ total, todo, inProgress, completed });
    };

    if (externalTasks && externalTasks.length !== undefined) {
      computeStats(externalTasks);
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        computeStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [externalTasks]);

  return (
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
  );
};

export default StatusSummaryCards;