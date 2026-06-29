import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/header";

// test page
function Dashboard() {
  return <h1>Dashboard</h1>;
}

function Bookings() {
  return <h1>My Bookings</h1>;
}

function Buildings() {
  return <h1>Buildings</h1>;
}

function Schedule() {
  return <h1>Schedule</h1>;
}

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/buildings" element={<Buildings />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
}