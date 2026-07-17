import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QrCode, ArrowLeft, Clock, Calendar, Info } from 'lucide-react';
import ticketApi from '../api/ticketApi';
import bookingApi from '../api/bookingApi';

const DigitalTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // In a real scenario, uncomment the API call:
    // ticketApi.getTicket(id).then(res => setTicket(res.data)).catch(err => console.error(err));
    const fetchticket = async (id) =>{
      try{
        const res = await ticketApi.getTicketByBooking(id);
        if(res){
          setTicket(res);
          setLoading(false);
          return;
        }
      } catch (err){
        console.error("Failed to fetch ticket, using mock fallback:", err);
      }
      
      // Fallback mock data if API fails or ticket not found
      setTicket({
        id: id || 'TKT-98234-XYZ',
        room: 'Study Room A (402)',
        date: 'Oct 24, 2026',
        time: '10:00 AM - 12:00 PM',
        status: 'Valid',
        user: 'Alex Rivera'
      });
      setLoading(false);
    }

    const getTicketInfo = async (id) => {
      try{
        const booking = await bookingApi.getBookingByid(id);
        if(booking){
          setBooking(booking);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getTicketInfo(id);
    fetchticket(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 min-h-[calc(100vh-80px)] gap-4">
        <div className="animate-spin text-emerald-600"><QrCode size={48} /></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading pass...</p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 md:p-8 bg-slate-50 min-h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="max-w-sm w-full">
        <Link to="/myrequests" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-700 mb-6 transition-colors font-medium">
          <ArrowLeft size={18} /> Back to Requests
        </Link>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative group">
          {/* Header */}
          <div className="bg-emerald-700 p-8 text-white text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white to-transparent"></div>
             <h2 className="text-xs uppercase tracking-[0.2em] font-bold opacity-80 mb-3">Academic Pass</h2>
             <h1 className="text-3xl font-serif font-bold relative z-10 leading-tight">{booking.roomName}</h1>
          </div>
          
          {/* Ticket Body / QR Code */}
          <div className="p-8 flex flex-col items-center border-b-[3px] border-dashed border-slate-200 relative bg-white">
             {/* Cutouts for the ticket effect */}
             <div className="absolute -left-5 -bottom-5 w-10 h-10 bg-slate-50 rounded-full shadow-inner"></div>
             <div className="absolute -right-5 -bottom-5 w-10 h-10 bg-slate-50 rounded-full shadow-inner"></div>
             
             <div className="w-56 h-56 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-200 mb-6 relative overflow-hidden transition-colors group-hover:border-emerald-300">
                <QrCode size={140} className="text-slate-800 group-hover:scale-105 transition-transform duration-300" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
             
             <div className="text-center">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Ticket ID</p>
               <p className="text-sm font-mono text-slate-700 tracking-widest font-semibold bg-slate-100 px-3 py-1 rounded-md">{ticket.ticketCode}</p>
             </div>
          </div>
          
          {/* Details */}
          <div className="p-8 bg-slate-50/50">
            <div className="space-y-5">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                    <p className="font-semibold text-slate-800">{ticket.generatedAt.slice(0,10)}</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Time</p>
                    <p className="font-semibold text-slate-800">{booking.startTime.slice(11,16)}</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Info size={18} />
                  </div>
                  <div>
                     <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
                     <div className="mt-0.5">
                       <span className="inline-block px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md shadow-sm">
                         {ticket.status}
                       </span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DigitalTicket;
