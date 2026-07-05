import React, { useEffect, useState } from 'react';
import { Shield, Users, DoorOpen, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import bookingApi from '../api/bookingApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 142,
    totalRooms: 36,
    pendingRequests: 8,
    approvedRequests: 114
  });

  const [pendingList, setPendingList] = useState([
    { id: 1, user: 'John Doe', room: 'Conference Room A', time: '10:00 AM - 12:00 PM', date: 'July 6, 2026' },
    { id: 2, user: 'Jane Smith', room: 'Lecture Hall 101', time: '2:00 PM - 5:00 PM', date: 'July 6, 2026' },
    { id: 3, user: 'Dr. Robert', room: 'Seminar Room B', time: '9:00 AM - 11:00 AM', date: 'July 7, 2026' },
  ]);

  useEffect(()=>{
    const fetchBookings = async ()=>{
      try {
        const res = await bookingApi.getAllPendingBookings();
        setPendingList(res);
      } catch (err){
        console.log(err);
      }
    }
    fetchBookings();
  },[]);

  const handleApprove = (id) => {
    setPendingList(prev => prev.filter(item => item.id !== id));
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      approvedRequests: prev.approvedRequests + 1
    }));
  };

  const handleReject = (id) => {
    setPendingList(prev => prev.filter(item => item.id !== id));
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1
    }));
  };

  return (
    <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0b2240] tracking-tight">Admin Portal</h1>
            <p className="text-sm text-slate-500">Manage rooms, approve requests, and monitor campus systems.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Users</span>
              <span className="text-2xl font-extrabold text-[#0b2240] mt-1 block">{stats.totalUsers}</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Active Rooms</span>
              <span className="text-2xl font-extrabold text-[#0b2240] mt-1 block">{stats.totalRooms}</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <DoorOpen size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Pending Approvals</span>
              <span className="text-2xl font-extrabold text-[#0b2240] mt-1 block">{stats.pendingRequests}</span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl animate-pulse">
              <ClipboardList size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Approved Bookings</span>
              <span className="text-2xl font-extrabold text-[#0b2240] mt-1 block">{stats.approvedRequests}</span>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0b2240]">Pending Booking Requests</h2>
            <h2 className="text-lg font-bold text-[#0b2240]">Purpose</h2>
            <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
              {pendingList.length} Action Needed
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingList.length > 0 ? (
              pendingList.map((req) => (
                <div key={req.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-800">{req.user}</h3>
                    <p className="text-lg text-slate-500 mt-0.5">
                      <span className="font-semibold text-indigo-600">{req.roomName}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {req.startTime} • {req.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-slate-500 mt-0.5">{req.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-all"
                    >
                      <CheckCircle size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg transition-all"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-slate-500 font-medium">
                No pending requests. All caught up!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
