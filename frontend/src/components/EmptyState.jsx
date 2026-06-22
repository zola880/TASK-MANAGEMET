import { useNavigate } from 'react-router-dom';

const EmptyState = ({ title, description, actionLabel, actionLink, adminOnly = false, isAdmin = false }) => {
  const navigate = useNavigate();
  const showAction = actionLabel && actionLink && (!adminOnly || isAdmin);

  return (
    <div className="empty-state">
      <div className="empty-icon">📝</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {showAction && (
        <button className="btn btn-primary" onClick={() => navigate(actionLink)}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;