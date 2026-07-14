import React, { useEffect, useState } from 'react';
import { Shield, Users, DoorOpen, ClipboardList, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import bookingApi from '../api/bookingApi';
import axiosClient from '../api/axiosClient';
import userApi from '../api/userApi';
import roomApi from '../api/roomApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 142,
    totalRooms: 36,
    pendingRequests: 8,
    approvedRequests: 114
  });

  const [totalUsers,setTotalUsers] = useState(0);

  const [pendingList, setPendingList] = useState([
    { id: 1, user: 'John Doe', room: 'Conference Room A', time: '10:00 AM - 12:00 PM', date: 'July 6, 2026' },
    { id: 2, user: 'Jane Smith', room: 'Lecture Hall 101', time: '2:00 PM - 5:00 PM', date: 'July 6, 2026' },
    { id: 3, user: 'Dr. Robert', room: 'Seminar Room B', time: '9:00 AM - 11:00 AM', date: 'July 7, 2026' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('All');

  useEffect(()=>{
    const fetchBookings = async ()=>{
      try {
        const res = await bookingApi.getAllPendingBookings();
        setPendingList(res);
      } catch (err){
        console.log(err);
      }
    }
    const fetchData = async ()=>{
      try{
        const users = await userApi.getAllUsers();
        const rooms = await roomApi.getAllRooms();
        const pendingReq = await bookingApi.getPendingBookings();
        const approveBooking = await bookingApi.getAllApprovedBooking();
        console.log(pendingReq.length);
        setStats({totalUsers : users.length, totalRooms : rooms.length, pendingRequests : pendingReq.length, approvedRequests : approveBooking.length})
      } catch (err){
        console.log(err);
      }
    }
    fetchData();
    fetchBookings();
  },[]);

  const handleApprove = async (id) => {
    try {
      await bookingApi.approveBooking(id);
      setPendingList(prev => prev.filter(item => (item.bookingId || item.id) !== id));
      setStats(prev => ({
        ...prev,
        pendingRequests: Math.max(0, prev.pendingRequests - 1),
        approvedRequests: prev.approvedRequests + 1
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to approve booking request");
    }
  };

  const handleReject = async (id) => {
    try {
      await bookingApi.rejectBooking(id);
      setPendingList(prev => prev.filter(item => (item.bookingId || item.id) !== id));
      setStats(prev => ({
        ...prev,
        pendingRequests: Math.max(0, prev.pendingRequests - 1)
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to reject booking request");
    }
  };

  // Get unique room names for the filter dropdown
  const uniqueRooms = ['All', ...new Set(pendingList.map(req => req.roomName || req.room).filter(Boolean))];

  // Filter requests based on search term and selected room
  const filteredRequests = pendingList.filter(req => {
    const user = (req.user || '').toLowerCase();
    const room = (req.roomName || req.room || '').toLowerCase();
    const purpose = (req.purpose || '').toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchesSearch = user.includes(term) || room.includes(term) || purpose.includes(term);
    const matchesRoom = selectedRoom === 'All' || (req.roomName || req.room) === selectedRoom;

    return matchesSearch && matchesRoom;
  });

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
          <Link to="/admin/users" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider group-hover:text-indigo-500 transition-colors">Total Users</span>
              <span className="text-2xl font-extrabold text-[#0b2240] mt-1 block">{stats.totalUsers}</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
              <Users size={24} />
            </div>
          </Link>

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
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#0b2240]">Pending Booking Requests</h2>
              <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                {filteredRequests.length} Action Needed
              </span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by user, room, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400 hidden sm:inline" />
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
              >
                {uniqueRooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredRequests.length > 0 && (
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
              <div className="col-span-4">User & Room</div>
              <div className="col-span-3">Time & Date</div>
              <div className="col-span-3">Purpose</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          )}

          <div className="divide-y divide-slate-100">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <div key={req.bookingId || req.id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors">
                  {/* User & Room */}
                  <div className="col-span-4">
                    <h3 className="font-bold text-slate-800 text-sm md:text-base">{req.user}</h3>
                    <p className="text-xl text-slate-500 mt-0.5">
                      <span className="font-semibold text-indigo-600">{req.roomName}</span>
                    </p>
                  </div>
                  
                  {/* Time & Date */}
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-slate-700">
                      {req.startTime ? req.startTime.slice(0, 10) : req.date}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {req.startTime ? `${req.startTime.slice(11, 16)} - ${req.endTime?.slice(11, 16)}` : req.time}
                    </p>
                  </div>

                  {/* Purpose */}
                  <div className="col-span-3">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium max-w-full truncate" title={req.purpose}>
                      {req.purpose || 'N/A'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-start md:justify-end gap-2">
                    <button
                      onClick={() => handleApprove(req.bookingId || req.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-all"
                    >
                      <CheckCircle size={14} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.bookingId || req.id)}
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
                {searchTerm || selectedRoom !== 'All' ? 'No requests match your filters.' : 'No pending requests. All caught up!'}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
