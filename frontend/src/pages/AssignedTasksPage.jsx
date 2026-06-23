import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';

const AssignedTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssigned = async () => {
      const res = await api.get('/tasks');
      // Show only tasks assigned to members other than the admin
      const assigned = res.data.filter(t =>
        t.assignedTo && t.assignedTo._id !== user._id
      );
      setTasks(assigned);
    };
    fetchAssigned();
  }, [user]);

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      <PageHeader
        title="Assigned Tasks"
        subtitle="Tasks you have assigned to other team members."
        actionLabel="+ New Task"
        actionLink="/tasks/new"
      />
      {tasks.length === 0 ? (
        <EmptyState
          title="No assigned tasks"
          description="You haven't assigned any tasks yet."
          actionLabel="Create Task"
          actionLink="/tasks/new"
        />
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} isAdmin={true} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
};

export default AssignedTasksPage;