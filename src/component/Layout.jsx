import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
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

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      <Navbar onProfileClick={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden w-full relative">
        {isSidebarOpen && <Sidebar />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

