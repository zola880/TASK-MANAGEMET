import { Link } from 'react-router-dom';
import { Calendar, X } from 'lucide-react';

const TaskCard = ({ task, isAdmin, onDelete }) => {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusClass = `status-${task.status.toLowerCase().replace(' ', '-')}`;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDeleteClick = (e) => {
    e.preventDefault(); // prevent navigating to task
    e.stopPropagation();
    if (onDelete) onDelete(task._id);
  };

  return (
    <Link
      to={`/tasks/${task._id}`}
      className={`task-card task-card-colored ${priorityClass}`}
    >
      {/* Delete button for admins */}
      {isAdmin && (
        <button
          className="task-card-delete"
          onClick={handleDeleteClick}
          title="Delete task"
        >
          <X size={14} />
        </button>
      )}

      <span className="task-card-priority-label">{task.priority}</span>
      <h3 className="task-card-title-centered">{task.title}</h3>

      <div className="task-card-bottom">
        {task.dueDate && (
          <span className="task-card-due">
            <Calendar size={12} strokeWidth={2} />
            {formatDate(task.dueDate)}
          </span>
        )}
        <span className={`status-badge ${statusClass}`}>{task.status}</span>
      </div>
    </Link>
  );
};

export default TaskCard;