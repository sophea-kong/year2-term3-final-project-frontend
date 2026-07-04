import React, { useEffect, useState } from 'react';
import { Search, MapPin, Users, Calendar, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import roomApi from '../api/roomApi';

const getRoomFallbackImage = (type) => {
  const types = {
    'Lecture Hall': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
    'Lecture Room': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
    'Lab': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    'Seminar Room': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    'Conference Room': 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=600&q=80',
  };
  return types[type] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80';
};

export default function AllRooms() {
  const navigate = useNavigate();
  const [rooms,setRoom] = useState([
    { id: 1, name: 'Room 302', building: 'Science North', capacity: 30, type: 'Lecture Hall', status: 'Available' },
    { id: 2, name: 'Innovation Lab A', building: 'Engineering Wing', capacity: 15, type: 'Lab', status: 'Reserved' },
    { id: 3, name: 'Seminar Room 101', building: 'Arts & Humanities', capacity: 20, type: 'Seminar Room', status: 'Available' },
    { id: 4, name: 'Conference Room B', building: 'Administration', capacity: 10, type: 'Conference Room', status: 'Available' },
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
        {rooms.map((room) => {
          const roomId = room.roomId || room.id;
          const roomName = room.roomName || room.name;
          const roomType = room.roomType || room.type;
          const imageUrl = room.images?.[0]?.imageUrl || room.imageUrl || getRoomFallbackImage(roomType);
          const isAvailable = room.status?.toLowerCase() === 'available';

          return (
            <div key={roomId} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col gap-4 shadow-sm hover:shadow-md transition-all">
              {/* Room Image */}
              <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                <img 
                  src={imageUrl} 
                  alt={roomName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className={`absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm capitalize ${
                  isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {room.status}
                </span>
              </div>

              {/* Room Details */}
              <div className="p-6 pt-0 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0b2240]">{roomName}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <MapPin size={14} />
                    <span>{room.building}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 border-y border-slate-100 py-3 my-1">
                  <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                    <Users size={16} className="text-slate-400" />
                    <span>Cap: {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-xs font-semibold">
                    <ShieldCheck size={16} className="text-slate-400" />
                    <span>{roomType}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/book?roomId=${roomId}`)}
                  className="w-full py-2.5 bg-[#006c4a] hover:bg-[#00855d] text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
                >
                  Book Room
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}