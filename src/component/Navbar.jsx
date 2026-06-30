import { Link, NavLink } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

const Navbar = ({ onProfileClick }) => {
  const getLinkClass = ({ isActive }) =>
    `text-sm font-semibold px-3 py-2 rounded-md transition-all whitespace-nowrap ${
      isActive 
        ? 'text-blue-800 border border-dashed border-blue-500 bg-blue-50' 
        : 'text-gray-600 hover:text-[#0b2240] hover:bg-gray-100'
    }`;

  return (
    <header className="flex items-center justify-between h-[70px] px-8 bg-white border-b border-gray-200 w-full select-none">
      <div className="flex items-center gap-10">
        <Link to="/" className="text-2xl font-extrabold text-[#0b2240] tracking-tight whitespace-nowrap">CampusReserve</Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/bookings" className={getLinkClass}>My Bookings</NavLink>
          <NavLink to="/rooms" className={getLinkClass}>Rooms</NavLink>
          <NavLink to="/schedule" className={getLinkClass}>Schedule</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400 pointer-events-none" size={18} />
          <input 
            type="text" 
            placeholder="Search rooms..." 
            className="w-60 pl-10 pr-3 py-2 rounded-full border border-gray-200 bg-gray-100 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        
        <button className="relative p-2 text-gray-600 hover:text-[#0b2240] hover:bg-gray-100 rounded-full transition-all" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        <button 
          onClick={onProfileClick} 
          className="flex items-center justify-center w-[34px] h-[34px] border border-gray-600 hover:border-[#0b2240] hover:bg-gray-100 rounded-full text-gray-600 hover:text-[#0b2240] transition-all" 
          aria-label="User Profile"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;


