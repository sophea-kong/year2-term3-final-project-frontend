import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const token = localStorage.getItem('token');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      <div className="flex flex-1 overflow-hidden w-full relative bg-slate-100">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

