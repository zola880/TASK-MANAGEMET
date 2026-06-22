import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const TaskCard = ({ task }) => {
  // Use priority as the card's background color
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusClass = `status-${task.status.toLowerCase().replace(' ', '-')}`;

  // Format due date
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Link
      to={`/tasks/${task._id}`}
      className={`task-card task-card-colored ${priorityClass}`}
    >
      {/* Small priority label at top */}
      <span className="task-card-priority-label">{task.priority}</span>

      {/* Task title – centered, large */}
      <h3 className="task-card-title-centered">{task.title}</h3>

      {/* Bottom row: due date and status */}
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