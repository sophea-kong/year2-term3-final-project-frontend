import { X, CheckCircle2 } from 'lucide-react';
import { useState,useEffect } from "react";
import Login from './Login';
import bookingApi from '../api/bookingApi';

function Bookings(){
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [showAlert, setShowAlert] = useState(true);
    const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      room: 'Room 302 - Science North (Fallback)',
      time: 'Oct 24, 2024 • 10:00 AM - 11:30 AM',
      eventTitle: 'Student Study Group',
      status: 'Pending Approval'
    },
    {
      id: 2,
      room: 'Innovation Lab A - Engineering Wing (Fallback)',
      time: 'Oct 25, 2024 • 2:00 PM - 4:00 PM',
      eventTitle: '3D Printing Workshop',
      status: 'Pending Approval'
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Sync token with local storage and fetch data if logged in
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const fetchPendingRequests = async () => {
        try {
          setLoading(true);
          const data = await bookingApi.getPendingBookings();
          if (data) {
            data.forEach((e)=>{
                let temp = e.startTime.replace("T"," ").slice(0,16);
                e.startTime = temp;
            })
            setPendingRequests(data);
          }
        } catch (error) {
          console.error("Failed to fetch pending requests via Axios:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPendingRequests();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleCancelRequest = async (id) => {
    try {
      await bookingApi.cancelBooking(id);
      setPendingRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      setPendingRequests(prev => prev.filter(req => req.id !== id));
    }
  };

  if (!token) {
    return <Login />;
  }
    return (
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0b2240] tracking-tight">Room Availability Dashboard</h2>
              <p className="text-sm text-slate-500 mt-1.5">Manage your reservations and explore available campus spaces.</p>
            </div>
            
            <div className="flex bg-slate-200 p-1 rounded-lg">
              <button className="bg-white text-slate-900 shadow-sm px-4 py-1.5 text-xs font-semibold rounded-md">Today</button>
              <button className="text-slate-600 hover:text-slate-900 px-4 py-1.5 text-xs font-semibold rounded-md transition-all">Week</button>
              <button className="text-slate-600 hover:text-slate-900 px-4 py-1.5 text-xs font-semibold rounded-md transition-all">Month</button>
            </div>
          </div>

          {showAlert && (
            <div className="flex justify-between items-center bg-[#0b2240] text-white px-5 py-3.5 rounded-lg shadow-md mb-8">
              <div className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="text-sky-400" size={20} />
                <span>Booking request submitted successfully and is awaiting approval.</span>
              </div>
              <button className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-all" onClick={() => setShowAlert(false)}>
                <X size={16} />
              </button>
            </div>
          )}

          <section className="mt-4">
            <h3 className="text-lg font-bold text-[#0b2240] mb-5">Your Pending Requests</h3>
            
            {loading ? (
              <p className="text-slate-500 text-sm">Loading requests...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                {pendingRequests.map((req) => (
                  <div key={req.bookingId} className="bg-white border border-slate-200 border-l-8 border-l-[#ffb95f] rounded-xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-[#0b2240]">{req.Room?.roomName}</h4>
                        <p className="text-xs text-slate-500 mt-1">{req.startTime}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{req.status}</span>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider">EVENT TITLE</span>
                      <h5 className="text-sm font-bold text-[#0b2240] mt-1.5">{req.title}</h5>
                    </div>
                    
                    <div className="flex gap-4 mt-auto">
                      <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-md transition-all">View Details</button>
                      <button 
                        onClick={() => handleCancelRequest(req.id)}
                        className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-md transition-all"
                      >
                        Cancel Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
    )
}

export default Bookings;