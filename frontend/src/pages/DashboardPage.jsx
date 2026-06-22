import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import StatusSummaryCards from '../components/StatusSummaryCards';
import RecentTasks from '../components/RecentTasks';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.name}`}
        subtitle="Here's your task overview"
      />
      <StatusSummaryCards tasks={tasks} />
      <RecentTasks tasks={tasks} />
    </>
  );
};

export default DashboardPage;