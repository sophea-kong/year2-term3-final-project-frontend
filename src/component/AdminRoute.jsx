import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authApi from '../api/authApi';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const currentUser = await authApi.me();
        setUser(currentUser);
      } catch (err) {
        console.error("Failed to fetch user role", err);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 min-h-screen">
        <div className="text-slate-500 font-medium">Checking authorization...</div>
      </div>
    );
  }

  // Check if user has the admin role
  if (!user || user.role !== 'admin') {
    return <Navigate to="/myrequests" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
