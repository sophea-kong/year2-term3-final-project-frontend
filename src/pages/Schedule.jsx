import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scheduleApi from "../api/scheduleApi";
import roomApi from "../api/roomApi";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Info } from 'lucide-react';

export default function Schedule() {
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Date selection states
    const [selectedDate, setSelectedDate] = useState("");
    const [availableDates, setAvailableDates] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    function filterDays(data) {
        const datestring = data.map((e) => {
            const date = new Date(e.startTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        });
        const uniquedates = [...new Set(datestring)];
        return uniquedates.sort();
    }

    // Timeline boundaries: 8:00 AM (480 mins) to 6:00 PM (1080 mins)
    const startHour = 8;
    const endHour = 24;
    const totalHours = endHour - startHour;

    // Helper: convert a date string or Date object into total minutes from midnight
    const getMinutesFromMidnight = (dateValue) => {
        const date = new Date(dateValue);
        return date.getHours() * 60 + date.getMinutes();
    };

    // Helper to calculate left & width styling percentage for schedule slots
    const getPositionStyle = (startTime, endTime) => {
        const startMinutes = getMinutesFromMidnight(startTime);
        const endMinutes = getMinutesFromMidnight(endTime);

        const timelineStartMinutes = startHour * 60; // 480
        const timelineTotalMinutes = totalHours * 60; // 600

        // Calculate layout positioning
        const left = ((startMinutes - timelineStartMinutes) / timelineTotalMinutes) * 100;
        const width = ((endMinutes - startMinutes) / timelineTotalMinutes) * 100;

        return {
            left: `${Math.max(0, Math.min(100, left))}%`,
            width: `${Math.max(2, Math.min(100 - left, width))}%`
        };
    };

    useEffect(() => {
        const fetchTimetableData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch schedules and rooms in parallel
                const [scheduleData, roomData] = await Promise.all([
                    scheduleApi.schedules(),
                    roomApi.getAllRooms()
                ]);

                const fetchedSchedules = Array.isArray(scheduleData) 
                     ? scheduleData 
                     : (scheduleData && Array.isArray(scheduleData.data) ? scheduleData.data : []);
                
                const fetchedRooms = Array.isArray(roomData) ? roomData : [];
                
                setSchedules(fetchedSchedules);
                setRooms(fetchedRooms);
                console.log(schedules);

                // Set up dates
                const dates = filterDays(fetchedSchedules);
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const todayStr = `${year}-${month}-${day}`;

                // Set up dates
                let available = [...dates];
                
                if (available.length > 0) {
                    // If today has events, show today. Otherwise, show the first available date with events so the user isn't staring at a blank screen.
                    if (available.includes(todayStr)) {
                        setSelectedDate(todayStr);
                    } else {
                        setSelectedDate(available[0]);
                    }
                    // Still add today so we can navigate to it
                    if (!available.includes(todayStr)) {
                        available.push(todayStr);
                        available.sort();
                    }
                } else {
                    available = [todayStr];
                    setSelectedDate(todayStr);
                }
                
                setAvailableDates(available);
            } catch (err) {
                console.error("Failed to load timetable data:", err);
                setError("Failed to load schedule planner. Please reload the page.");
            } finally {
                setLoading(false);
            }
        };
        fetchTimetableData();
    }, []);

    // Filter schedules for the selected date
    const daySchedules = schedules.filter(item => {
        const date = new Date(item.startTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        return dateStr === selectedDate;
    });

    // Filter rooms based on search query
    const filteredRooms = rooms.filter(room => {
        const rName = room.roomName || room.name || "";
        return rName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               (room.building || "").toLowerCase().includes(searchQuery.toLowerCase());
    });

    const hoursArray = Array.from({ length: totalHours + 1 }, (_, i) => startHour + i);

    const getBlockColorClass = (type) => {
        switch (type?.toLowerCase()) {
            case 'class':
                return 'bg-blue-500 hover:bg-blue-600 text-white border-l-4 border-blue-700';
            case 'exam':
                return 'bg-rose-500 hover:bg-rose-600 text-white border-l-4 border-rose-700';
            case 'maintenance':
                return 'bg-amber-500 hover:bg-amber-600 text-white border-l-4 border-amber-700';
            default:
                return 'bg-slate-500 hover:bg-slate-600 text-white border-l-4 border-slate-700';
        }
    };

    const handlePrevDate = () => {
        const currentIndex = availableDates.indexOf(selectedDate);
        if (currentIndex > 0) {
            setSelectedDate(availableDates[currentIndex - 1]);
        }
    };

    const handleNextDate = () => {
        const currentIndex = availableDates.indexOf(selectedDate);
        if (currentIndex < availableDates.length - 1) {
            setSelectedDate(availableDates[currentIndex + 1]);
        }
    };

    const handleToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        setSelectedDate(`${year}-${month}-${day}`);
    };

    return (
        <main className="flex-1 px-6 py-4 md:py-6 lg:py-8 bg-slate-50 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-[#0b2240] tracking-tight">Room Timetable</h2>
                    <p className="text-sm text-slate-500 mt-1.5">Visual daily schedules organized by campus rooms and timeslots.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search room or building..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-4 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                        />
                    </div>

                    {/* Today Button */}
                    <button 
                        onClick={handleToday}
                        className="px-4 py-2 text-sm font-bold text-[#0b2240] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm shrink-0"
                    >
                        Today
                    </button>

                    {/* Date Controls */}
                    <div className="flex items-center justify-between gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                        <button 
                            onClick={handlePrevDate} 
                            disabled={availableDates.indexOf(selectedDate) <= 0}
                            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        
                        <div className="flex items-center gap-2 px-2 font-bold text-sm text-[#0b2240]">
                            <Calendar size={16} className="text-slate-400" />
                            <span>
                                {selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                }) : "No Date Selected"}
                            </span>
                        </div>

                        <button 
                            onClick={handleNextDate} 
                            disabled={availableDates.indexOf(selectedDate) >= availableDates.length - 1}
                            className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500 font-medium">
                    <div className="animate-spin inline-block w-6 h-6 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-3" role="status"></div>
                    <p>Loading timetable grid...</p>
                </div>
            ) : error ? (
                <div className="text-center py-8 text-red-500 font-medium bg-red-50 rounded-xl border border-red-100 max-w-2xl mx-auto">
                    {error}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden select-none">
                    <div className="overflow-x-auto min-w-[800px]">
                        
                        {/* Timeline Header Row */}
                        <div className="flex border-b border-slate-100 bg-slate-50/50">
                            <div className="w-[220px] p-4 text-xs font-bold text-slate-400 border-r border-slate-100 uppercase tracking-wider shrink-0">
                                Room Name
                            </div>
                            
                            <div className="flex-1 flex relative h-12">
                                {hoursArray.map((hour, index) => {
                                    const formattedHour = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
                                    const percentagePosition = (index / totalHours) * 100;
                                    return (
                                        <div 
                                            key={hour} 
                                            className="absolute text-[10px] font-bold text-slate-400 -translate-x-1/2 pt-3.5"
                                            style={{ left: `${percentagePosition}%` }}
                                        >
                                            {formattedHour}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Room Rows */}
                        <div className="divide-y divide-slate-100">
                            {filteredRooms.map(room => {
                                const currentRoomId = String(room.roomId || room.id);
                                const roomSchedules = daySchedules.filter(item => 
                                    String(item.roomId) === currentRoomId || 
                                    String(item.Room?.roomId) === currentRoomId || 
                                    String(item.Room?.id) === currentRoomId
                                );

                                return (
                                    <div key={currentRoomId} className="flex min-h-[90px] group hover:bg-slate-50/30 transition-colors">
                                        
                                        {/* Room Label Card */}
                                        <div className="w-[220px] p-4 border-r border-slate-100 shrink-0 flex flex-col justify-center">
                                            <h4 className="text-sm font-bold text-[#0b2240]">{room.roomName || room.name}</h4>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                                                <MapPin size={11} />
                                                <span>{room.building}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-400 mt-0.5">Cap: {room.capacity} • {room.roomType || 'Standard'}</span>
                                            <button 
                                                onClick={() => navigate(`/book?roomId=${room.roomId || room.id}&date=${selectedDate}`)}
                                                className="w-fit mt-2 px-3 py-1 bg-[#006c4a]/10 hover:bg-[#006c4a] text-[#006c4a] hover:text-white text-[10px] font-bold rounded transition-all cursor-pointer"
                                            >
                                                Book Room
                                            </button>
                                        </div>

                                        {/* Row Timeline Grid Track */}
                                        <div className="flex-1 relative h-auto min-h-[90px] py-3">
                                            
                                            {/* Guidelines */}
                                            {hoursArray.map((_, index) => (
                                                <div 
                                                    key={index} 
                                                    className="absolute top-0 bottom-0 border-l border-slate-100 border-dashed pointer-events-none"
                                                    style={{ left: `${(index / totalHours) * 100}%` }}
                                                />
                                            ))}

                                            {/* Booking blocks */}
                                            {roomSchedules.map(schedule => {
                                                const position = getPositionStyle(schedule.startTime, schedule.endTime);
                                                
                                                return (
                                                    <div
                                                        key={schedule.scheduleId}
                                                        onClick={() => setSelectedBlock(schedule)}
                                                        className={`absolute top-4 bottom-4 rounded-lg px-3 py-1 text-xs font-semibold shadow-sm transition-all cursor-pointer z-10 flex flex-col justify-center overflow-hidden leading-tight ${getBlockColorClass(schedule.type)}`}
                                                        style={position}
                                                        title={`${schedule.title} (${schedule.type})`}
                                                    >
                                                        <span className="truncate text-[11px] block font-bold">{schedule.title}</span>
                                                        <span className="text-[9px] opacity-85 block mt-0.5 truncate">
                                                            {new Date(schedule.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                );
                                            })}

                                            {roomSchedules.length === 0 && (
                                                <div className="absolute inset-0 flex items-center justify-center text-[11px] text-slate-300 font-medium italic pointer-events-none">
                                                    No bookings scheduled
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Info Modal */}
            {selectedBlock && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
                        <div className="bg-[#0b2240] p-6 text-white">
                            <span className="text-[9px] font-extrabold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {selectedBlock.type}
                            </span>
                            <h3 className="text-xl font-bold mt-3 leading-tight">{selectedBlock.title}</h3>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Clock size={18} className="text-slate-400 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time slot</span>
                                    <span className="text-sm font-semibold">
                                        {new Date(selectedBlock.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(selectedBlock.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            {selectedBlock.Room && (
                                <div className="flex items-center gap-3 text-slate-600 border-t border-slate-100 pt-4">
                                    <MapPin size={18} className="text-slate-400 shrink-0" />
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
                                        <span className="text-sm font-semibold">
                                            {selectedBlock.Room.roomName} • {selectedBlock.Room.building} (Floor {selectedBlock.Room.floor})
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 text-slate-600 border-t border-slate-100 pt-4">
                                <Info size={18} className="text-slate-400 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Room Capacity</span>
                                    <span className="text-sm font-semibold">
                                        Holds up to {selectedBlock.Room?.capacity || 30} students
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={() => setSelectedBlock(null)}
                                className="w-full mt-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0b2240] text-xs font-bold rounded-xl transition-all"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}