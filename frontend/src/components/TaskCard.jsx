import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusClass = `status-${task.status.toLowerCase().replace(' ', '-')}`;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-card-title">{task.title}</h3>
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
      </div>
      <p className="task-card-desc">{task.description || 'No description'}</p>
      <div className="task-card-meta">
        {task.assignedTo && (
          <span className="meta-item">👤 {task.assignedTo.name}</span>
        )}
        {task.dueDate && (
          <span className="meta-item">📅 {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
        <span className={`badge ${statusClass}`}>{task.status}</span>
      </div>
      <div className="task-card-footer">
        <Link to={`/tasks/${task._id}`} className="btn-view">View Details →</Link>
      </div>
    </div>
  );
};

export default TaskCard;