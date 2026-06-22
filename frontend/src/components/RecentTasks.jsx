import { useNavigate } from 'react-router-dom';
import { FileText, Calendar } from 'lucide-react';

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate();

  // Sort by most recent (createdAt descending) and take latest 5
  const sortedTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statusClass = (status) =>
    `badge status-${status.toLowerCase().replace(' ', '-')}`;

  if (tasks.length === 0) {
    return (
      <div className="recent-tasks-card empty">
        <div className="empty-state">
          <div className="empty-icon">
            <FileText size={48} strokeWidth={1.5} color="var(--muted)" />
          </div>
          <h3>No recent tasks found</h3>
          <p>Create your first task to get started.</p>
          <button className="btn btn-primary" onClick={() => navigate('/tasks')}>
            View My Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-tasks-card">
      <div className="recent-header">
        <div>
          <h3 className="recent-title">Recent Tasks</h3>
          
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/tasks')}>
          View All Tasks →
        </button>
      </div>

      <div className="recent-list">
        {sortedTasks.map(task => (
          <div key={task._id} className="recent-task-item">
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <div className="task-meta-inline">
                <span className={`badge ${statusClass(task.status)}`}>
                  {task.status}
                </span>
                {task.dueDate && (
                  <span className="due-date">
                    <Calendar size={14} strokeWidth={2} style={{ marginRight: '4px' }} />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
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

export default RecentTasks;