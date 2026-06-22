import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Timer,
  CheckCircle2
} from 'lucide-react';
import api from '../services/api';

const StatusSummaryCards = ({ tasks: externalTasks }) => {
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
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
      {/* Total Tasks */}
      <div className="stat-card">
        <div className="stat-icon">
          <LayoutDashboard size={24} strokeWidth={2} />
        </div>
        <div className="stat-content">
          <div className="stat-label">Total Tasks</div>
          <div className="stat-value">{stats.total}</div>
        </div>
      </div>

      {/* To Do */}
      <div className="stat-card stat-todo">
        <div className="stat-icon">
          <ListTodo size={24} strokeWidth={2} />
        </div>
        <div className="stat-content">
          <div className="stat-label">To Do</div>
          <div className="stat-value">{stats.todo}</div>
        </div>
      </div>

      {/* In Progress */}
      <div className="stat-card stat-inprogress">
        <div className="stat-icon">
          <Timer size={24} strokeWidth={2} />
        </div>
        <div className="stat-content">
          <div className="stat-label">In Progress</div>
          <div className="stat-value">{stats.inProgress}</div>
        </div>
      </div>

      {/* Completed */}
      <div className="stat-card stat-completed">
        <div className="stat-icon">
          <CheckCircle2 size={24} strokeWidth={2} />
        </div>
        <div className="stat-content">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{stats.completed}</div>
        </div>
      </div>
    </div>
  );
};

export default StatusSummaryCards;