import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/Layout';
import Bookings from './pages/Bookings';
import AllRooms from './pages/AllRooms';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/bookings" replace />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/profile" element={<Profile />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/bookings" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

