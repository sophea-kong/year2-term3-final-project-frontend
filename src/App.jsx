import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/header";
import Navbar from "./component/Navbar";
import DashBoard from "./pages/DashBoard";

// test page
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
      {/* <Navbar /> */}


      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/buildings" element={<Buildings />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
}