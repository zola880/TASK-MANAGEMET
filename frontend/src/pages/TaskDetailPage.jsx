import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Paperclip,
  Download,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
    // Allow re-selection of same file by resetting input
    e.target.value = null;
  };

  const clearFile = () => setFile(null);

  if (!task) return <div className="loading">Loading...</div>;

  const canUpdateStatus = isAdmin || task.assignedTo?._id === user._id;

  // Get status icon
  const StatusIcon = task.status === 'Completed' ? CheckCircle2
    : task.status === 'In Progress' ? Clock
    : AlertCircle;

  return (
    <div className="task-detail-page">
      <div className="detail-container">
        {/* Back button */}
        <button className="btn-back" onClick={() => navigate('/tasks')}>
          <ArrowLeft size={18} strokeWidth={2} style={{ marginRight: '4px' }} />
          Back to Tasks
        </button>

        {/* Main card */}
        <div className="detail-card">
          <div className="detail-header">
            <h2 className="task-title">{task.title}</h2>
            <div className="badge-group">
              <span className={`badge priority-${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                <StatusIcon size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {task.status}
              </span>
            </div>
          </div>

          {/* Meta information */}
          <div className="detail-meta">
            <div className="meta-item">
              <User size={16} strokeWidth={2} style={{ color: 'var(--muted)', marginRight: '6px' }} />
              <span className="meta-label">Assigned to</span>
              <span className="meta-value">{task.assignedTo?.name || 'Unassigned'}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} strokeWidth={2} style={{ color: 'var(--muted)', marginRight: '6px' }} />
              <span className="meta-label">Due Date</span>
              <span className="meta-value">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="meta-item">
              <Clock size={16} strokeWidth={2} style={{ color: 'var(--muted)', marginRight: '6px' }} />
              <span className="meta-label">Created</span>
              <span className="meta-value">{new Date(task.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Description */}
          <div className="detail-description">
            <h3 className="section-title">Description</h3>
            <p>{task.description || 'No description provided.'}</p>
          </div>
        </div>

        {/* Attachment card */}
        <div className="detail-card">
          <h3 className="section-title">
            <Paperclip size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Attachment
          </h3>
          {task.attachment ? (
            <div className="attachment-current">
              <div className="file-info">
                <Paperclip size={18} style={{ color: 'var(--muted)' }} />
                <span className="file-name">{task.attachment.originalName}</span>
                <span className="file-size">
                  ({(task.attachment.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <a
                href={`/uploads/${task.attachment.filename}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-download"
              >
                <Download size={16} style={{ marginRight: '4px' }} />
                Download
              </a>
            </div>
          ) : (
            <p className="no-file">No file attached yet.</p>
          )}
        </div>

        {/* Status update panel (only if user can update) */}
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

              {/* Minimal file attachment area */}
              <div className="form-group">
                <label>Attach File</label>
                <div className="file-attach-row">
                  <button
                    type="button"
                    className="btn btn-icon"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach file"
                  >
                    <Paperclip size={18} />
                  </button>
                  <span className="selected-file">
                    {file ? file.name : 'No file chosen'}
                  </span>
                  {file && (
                    <button
                      type="button"
                      className="btn btn-icon btn-icon-clear"
                      onClick={clearFile}
                      title="Remove file"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
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

        {/* Admin full edit link */}
        {isAdmin && (
          <div className="admin-actions">
            <button
              className="btn btn-edit"
              onClick={() => navigate(`/tasks/${id}/edit`)}
            >
              <Edit3 size={16} style={{ marginRight: '6px' }} />
              Full Edit (Admin)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage;