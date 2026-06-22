import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar } from 'lucide-react';

const DeadlineApproaching = ({ tasks = [] }) => {   // 👈 default empty array
  const navigate = useNavigate();

  const now = new Date();
  const threeDaysFromNow = new Date(now);
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const urgentTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'Completed') return false;
    const due = new Date(task.dueDate);
    return due >= now && due <= threeDaysFromNow;
  });

  urgentTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const statusClass = (status) =>
    `badge status-${status.toLowerCase().replace(' ', '-')}`;

  if (urgentTasks.length === 0) {
    return (
      <div className="recent-tasks-card deadline-card">
        <div className="empty-state">
          <AlertTriangle size={48} strokeWidth={1.5} color="var(--muted)" />
          <h3>No upcoming deadlines</h3>
          <p>All tasks are on track. Good job!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-tasks-card deadline-card">
      <div className="recent-header">
        <div>
          <h3 className="recent-title">
            <AlertTriangle size={20} strokeWidth={2} style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--warning)' }} />
            Deadline Approaching
          </h3>
          <p className="recent-subtitle">Tasks due within the next 3 days</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/tasks')}>
          View All Tasks →
        </button>
      </div>

      <div className="recent-list">
        {urgentTasks.map(task => (
          <div key={task._id} className="recent-task-item deadline-task-item">
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <div className="task-meta-inline">
                <span className={`badge ${statusClass(task.status)}`}>{task.status}</span>
                <span className="due-date deadline-due">
                  <Calendar size={14} strokeWidth={2} style={{ marginRight: '4px' }} />
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              className="btn btn-view"
              onClick={() => navigate(`/tasks/${task._id}`)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeadlineApproaching;