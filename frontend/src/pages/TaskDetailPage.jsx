import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
        setNewStatus(res.data.status);
      } catch (err) {
        console.error('Failed to fetch task', err);
      }
    };
    fetchTask();
  }, [id]);

  const handleStatusUpdate = async () => {
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('status', newStatus);
      if (file) payload.append('attachment', file);

      const res = await api.put(`/tasks/${id}`, payload);
      setTask(res.data);
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  if (!task) return <div className="loading">Loading...</div>;

  const canUpdateStatus = isAdmin || task.assignedTo?._id === user._id;

  return (
    <div className="task-detail-page">
      <div className="detail-container">
        <button className="btn-back" onClick={() => navigate('/tasks')}>
          ← Back to Tasks
        </button>

        <div className="detail-card">
          <div className="detail-header">
            <h2 className="task-title">{task.title}</h2>
            <div className="badge-group">
              <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
              <span className={`badge status-${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
            </div>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Assigned to</span>
              <span className="meta-value">{task.assignedTo?.name || 'Unassigned'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Due Date</span>
              <span className="meta-value">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Created</span>
              <span className="meta-value">{new Date(task.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="detail-description">
            <h3 className="section-title">Description</h3>
            <p>{task.description || 'No description provided.'}</p>
          </div>
        </div>

        <div className="detail-card">
          <h3 className="section-title">Attachment</h3>
          {task.attachment ? (
            <div className="attachment-current">
              <div className="file-info">
                <span className="file-icon">📎</span>
                <span className="file-name">{task.attachment.originalName}</span>
                <span className="file-size">({(task.attachment.size / 1024).toFixed(1)} KB)</span>
              </div>
              <a
                href={`/uploads/${task.attachment.filename}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-download"
              >
                Download
              </a>
            </div>
          ) : (
            <p className="no-file">No file attached yet.</p>
          )}
        </div>

        {canUpdateStatus && (
          <div className="detail-card update-panel">
            <h3 className="section-title">Update Task</h3>
            <div className="update-form">
              <div className="form-group">
                <label htmlFor="statusSelect">Status</label>
                <select
                  id="statusSelect"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="form-input"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label>New Attachment (optional)</label>
                <FileUpload onFileSelect={handleFileSelect} currentFile={null} />
              </div>

              <button
                className="btn btn-primary btn-update"
                onClick={handleStatusUpdate}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Task'}
              </button>
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="admin-actions">
            <button
              className="btn btn-edit"
              onClick={() => navigate(`/tasks/${id}/edit`)}
            >
              ⚙️ Full Edit (Admin)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage;