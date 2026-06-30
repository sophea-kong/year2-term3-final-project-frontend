import React from 'react';
import { Home, Calendar, ClipboardList, Map, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-[260px] h-[calc(100vh-5rem)] bg-slate-50 border-r border-gray-200 p-6 flex flex-col justify-between select-none shrink-0 sticky top-20 overflow-y-auto self-start">
      {/* User Profile Card */}
      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 mb-8">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Alex Rivera Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-[#0b2240] leading-tight">Alex Rivera</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Student Services</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1">
          <a href="#home" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold bg-[#1e3a5f] text-white transition-all">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#find-room" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-slate-100 hover:text-[#0b2240] transition-all">
            <Calendar size={20} className="text-slate-400" />
            <span>Find Room</span>
          </a>
          <a href="#my-requests" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-slate-100 hover:text-[#0b2240] transition-all">
            <ClipboardList size={20} />
            <span>My Requests</span>
          </a>
          <a href="#map" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-slate-100 hover:text-[#0b2240] transition-all">
            <Map size={20} className="text-slate-400" />
            <span>Campus Map</span>
          </a>
          <a href="#settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-slate-100 hover:text-[#0b2240] transition-all">
            <Settings size={20} className="text-slate-400" />
            <span>Settings</span>
          </a>
        </div>

        <div className="mt-auto">
          <div className="h-px bg-slate-200 my-4 mx-2"></div>
          <div className="flex flex-col gap-1">
            <a href="#help" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-slate-100 hover:text-[#0b2240] transition-all">
              <HelpCircle size={20} className="text-slate-400" />
              <span>Help</span>
            </a>
            <a href="#logout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-slate-100 hover:text-[#0b2240] transition-all">
              <LogOut size={20} className="text-slate-400" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
