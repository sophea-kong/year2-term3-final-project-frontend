import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/Layout';
import AdminRoute from './component/AdminRoute';
import AllRooms from './pages/AllRooms';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyRequest from './pages/MyRequest';
import Schedule from './pages/Schedule';
import Header from './component/header';
import BookingForm from './pages/BookingForm';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageUsers from './pages/AdminManageUsers';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/myrequests" replace />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myrequests" element={<MyRequest />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/book" element={<BookingForm />} />
          
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

