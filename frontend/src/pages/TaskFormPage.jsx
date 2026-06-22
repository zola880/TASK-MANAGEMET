import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import FileUpload from '../components/FileUpload';

const TaskFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    assignedTo: '',
    dueDate: ''
  });
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);               // actual File object for a new upload
  const [currentAttachment, setCurrentAttachment] = useState(null); // existing attachment when editing
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();

    if (isEditing) {
      const fetchTask = async () => {
        const res = await api.get(`/tasks/${id}`);
        const t = res.data;
        setFormData({
          title: t.title,
          description: t.description || '',
          priority: t.priority,
          status: t.status,
          assignedTo: t.assignedTo?._id || '',
          dueDate: t.dueDate ? new Date(t.dueDate).toISOString().split('T')[0] : ''
        });
        // Keep existing attachment info to show the user
        if (t.attachment && t.attachment.filename) {
          setCurrentAttachment(t.attachment);
        } else {
          setCurrentAttachment(null);
        }
      };
      fetchTask();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);            // the newly selected file
  };

  const handleRemoveAttachment = () => {
    setCurrentAttachment(null);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      // If a new file is selected, attach it (overwrites any existing)
      if (file) {
        payload.append('attachment', file);
      }
      // If we want to completely remove the existing attachment,
      // you could send a flag like payload.append('removeAttachment', 'true')
      // but the backend doesn't handle that yet. We'll skip that for now.

      if (isEditing) {
        await api.put(`/tasks/${id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page task-form-page">
      <div className="form-container">
        <div className="form-header">
          <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
          <p className="form-subtitle">
            {isEditing
              ? 'Update the task details below'
              : 'Fill in the information to create a new task'}
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title <span className="required">*</span></label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Create Login Page"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the task in detail..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assignedTo">Assigned To <span className="required">*</span></label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
              >
                <option value="">Select a team member</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Attachment</label>
            <FileUpload
              onFileSelect={handleFileSelect}
              currentFile={currentAttachment}        // existing attachment info
              onRemove={handleRemoveAttachment}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? (isEditing ? 'Updating...' : 'Creating...')
                : (isEditing ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;