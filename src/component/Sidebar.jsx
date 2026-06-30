import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Calendar, ClipboardList, Map, Settings, HelpCircle, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
      isActive 
        ? 'bg-[#1e3a5f] text-white' 
        : 'text-gray-600 hover:bg-slate-100 hover:text-[#0b2240]'
    }`;

  return (
    <aside className="w-[260px] h-[calc(100vh-70px)] bg-slate-50 border-r border-gray-200 p-6 flex flex-col justify-between select-none shrink-0">
      {/* User Profile Card */}
      <NavLink to="/profile" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 mb-8 hover:shadow-sm transition-all cursor-pointer">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" 
            alt="Alex Rivera Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-[#0b2240] leading-tight whitespace-nowrap">Alex Rivera</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">Student Services</p>
        </div>
      </NavLink>

      {/* Navigation Links */}
      <nav className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1">
          <NavLink to="/bookings" className={getLinkClass}>
            <Home size={20} className="shrink-0" />
            <span>Home</span>
          </NavLink>
          <NavLink to="/rooms" className={getLinkClass}>
            <Calendar size={20} className="shrink-0" />
            <span>Find Room</span>
          </NavLink>
          <NavLink to="/requests" className={getLinkClass}>
            <ClipboardList size={20} className="shrink-0" />
            <span>My Requests</span>
          </NavLink>
          <NavLink to="/map" className={getLinkClass}>
            <Map size={20} className="shrink-0" />
            <span>Campus Map</span>
          </NavLink>
          <NavLink to="/settings" className={getLinkClass}>
            <Settings size={20} className="shrink-0" />
            <span>Settings</span>
          </NavLink>
        </div>

        <div className="mt-auto">
          <div className="h-px bg-slate-200 my-4 mx-2"></div>
          <div className="flex flex-col gap-1">
            <NavLink to="/help" className={getLinkClass}>
              <HelpCircle size={20} className="shrink-0" />
              <span>Help</span>
            </NavLink>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all whitespace-nowrap text-left w-full"
            >
              <LogOut size={20} className="shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;


