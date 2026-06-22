import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await api.get('/tasks');
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  return (
    <>
      <PageHeader
        title="My Tasks"
        subtitle="Manage and track all assigned work."
        actionLabel={isAdmin ? '+ New Task' : null}
        actionLink="/tasks/new"
      />
      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks assigned yet"
          description="Create your first task to get started."
          actionLabel="Create Task"
          actionLink="/tasks/new"
          adminOnly={true}
          isAdmin={isAdmin}
        />
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => <TaskCard key={task._id} task={task} />)}
        </div>
      )}
    </>
  );
};

export default TaskListPage;