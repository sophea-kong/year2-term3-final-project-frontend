import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './component/Layout';
import AllRooms from './pages/AllRooms';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MyRequest from './pages/MyRequest';
import Header from './component/header';

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
          <Route path="*" element={<Navigate to="/myrequests" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

