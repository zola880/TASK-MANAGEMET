import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, subtitle, actionLabel, actionLink }) => {
  const navigate = useNavigate();
  return (
    <div className="page-header">
      <div className="page-header-left">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actionLabel && actionLink && (
        <button className="btn btn-primary" onClick={() => navigate(actionLink)}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default PageHeader;