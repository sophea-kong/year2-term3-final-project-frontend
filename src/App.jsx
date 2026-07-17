import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/Layout';
import AdminRoute from './component/AdminRoute';
import AllRooms from './pages/AllRooms';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyRequest from './pages/MyRequest';
import Schedule from './pages/Schedule';
import BookingForm from './pages/BookingForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageUsers from './pages/AdminManageUsers';
import ChatAssist from './pages/ChatAssist';
import Home from './pages/Home';
import MaintenanceRequest from './pages/MaintenanceRequest';
import DigitalTicket from './pages/DigitalTicket';

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myrequests" element={<MyRequest />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/chat" element={<ChatAssist />} />
          <Route path="/maintenance" element={<MaintenanceRequest />} />
          <Route path="/ticket/:id" element={<DigitalTicket />} />
          
          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminManageUsers />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/myrequests" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

