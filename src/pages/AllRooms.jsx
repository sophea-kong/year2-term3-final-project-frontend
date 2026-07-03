import React, { useEffect, useState } from 'react';
import { Search, MapPin, Users, Calendar, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import roomApi from '../api/roomApi';

export default function AllRooms() {
  const navigate = useNavigate();
  const [rooms,setRoom] = useState([
    { roomId: 1, name: 'Room 302', building: 'Science North', capacity: 30, type: 'Lecture Hall', status: 'Available' },
    { roomId: 2, name: 'Innovation Lab A', building: 'Engineering Wing', capacity: 15, type: 'Lab', status: 'Reserved' },
    { roomId: 3, name: 'Seminar Room 101', building: 'Arts & Humanities', capacity: 20, type: 'Seminar Room', status: 'Available' },
    { roomId: 4, name: 'Conference Room B', building: 'Administration', capacity: 10, type: 'Conference Room', status: 'Available' },
  ]);
  useEffect(()=>{
    const fetchRooms = async ()=>{
        try{
            const res = await roomApi.getAllRooms();
            setRoom(res);
        } catch (err){  
            console.log(err);
        }
    }
    fetchRooms();
  }, [])


  return (
    <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0b2240] tracking-tight">Campus Rooms</h2>
          <p className="text-sm text-slate-500 mt-1.5">View and reserve available classrooms, labs, and study spaces.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-[#0b2240]">{room.name}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                  <MapPin size={14} />
                  <span>{room.building}</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                room.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {room.status}
              </span>
            </div>

            <div className="flex items-center gap-6 border-y border-slate-100 py-3 my-1">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                <Users size={16} className="text-slate-400" />
                <span>Cap: {room.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>{room.type}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/booking?roomId=${room.roomId}`)}
              className="w-full py-2.5 bg-[#006c4a] hover:bg-[#00855d] text-white text-xs font-bold rounded-lg transition-all shadow-sm"
            >
              Book Room
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}