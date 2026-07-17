import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Calendar, ClipboardList, Map, Settings, HelpCircle, LogOut, Shield, Wrench } from 'lucide-react';
import authApi from '../api/authApi';

const Sidebar = ({ isOpen: controlledIsOpen, onClose: controlledOnClose }) => {
  const navigate = useNavigate();
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
  const onClose = controlledOnClose !== undefined ? controlledOnClose : () => setUncontrolledIsOpen(false);
  const [user,setUser] = useState({
  fullName: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  role: 'Student / Resource Coordinator',
  });
  useEffect(()=>{
    const fetchProfile = async ()=>{
        try{
            const u = await authApi.me();
            setUser(u);
        } catch (err){
            console.log(err);
        }
    }
    fetchProfile();
  }, [])

  useEffect(() => {
    if (controlledIsOpen !== undefined) return;

    const handleToggle = () => setUncontrolledIsOpen(prev => !prev);
    const handleClose = () => setUncontrolledIsOpen(false);

    window.addEventListener('toggle-sidebar', handleToggle);
    window.addEventListener('close-sidebar', handleClose);

    return () => {
      window.removeEventListener('toggle-sidebar', handleToggle);
      window.removeEventListener('close-sidebar', handleClose);
    };
  }, [controlledIsOpen]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    onClose();
    navigate('/login');
  };

  const handleLinkClick = () => {
    onClose();
  };

  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
      isActive 
        ? 'bg-[#1e3a5f] text-white' 
        : 'text-gray-600 hover:bg-slate-100 hover:text-[#0b2240]'
    }`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside 
        className={`w-[260px] bg-slate-50 border-r border-gray-200 p-6 flex flex-col justify-between select-none shrink-0 overflow-y-auto
          fixed top-0 bottom-0 left-0 z-50 h-full shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none md:pointer-events-auto'}
          md:static md:translate-x-0 md:h-[calc(100vh-5rem)] md:sticky md:top-20 md:shadow-none md:z-auto md:flex
        `}
      >
        {/* User Profile Card */}
        <NavLink 
          to="/profile" 
          onClick={handleLinkClick}
          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 mb-8 hover:shadow-sm transition-all cursor-pointer animate-none"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/960px-Windows_10_Default_Profile_Picture.svg.png" 
              alt="Alex Rivera Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#0b2240] leading-tight whitespace-nowrap">{user.fullName}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 whitespace-nowrap">{user.role}</p>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-1">
            <NavLink to="/myrequests" onClick={handleLinkClick} className={getLinkClass}>
              <Home size={20} className="shrink-0" />
              <span>My Requests</span>
            </NavLink>
            <NavLink to="/rooms" onClick={handleLinkClick} className={getLinkClass}>
              <Calendar size={20} className="shrink-0" />
              <span>Find Room</span>
            </NavLink>
            <NavLink to="/maintenance" onClick={handleLinkClick} className={getLinkClass}>
              <Wrench size={20} className="shrink-0" />
              <span>Maintenance</span>
            </NavLink>
            
            {user && user.role === 'admin' && (
              <NavLink to="/admin" onClick={handleLinkClick} className={getLinkClass}>
                <Shield size={20} className="shrink-0" />
                <span>Admin Panel</span>
              </NavLink>
            )}

            <NavLink to="/settings" onClick={handleLinkClick} className={getLinkClass}>
              <Settings size={20} className="shrink-0" />
              <span>Settings</span>
            </NavLink>
          </div>

          <div className="mt-auto">
            <div className="h-px bg-slate-200 my-4 mx-2"></div>
            <div className="flex flex-col gap-1">
              <NavLink to="/help" onClick={handleLinkClick} className={getLinkClass}>
                <HelpCircle size={20} className="shrink-0" />
                <span>Help</span>
              </NavLink>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all whitespace-nowrap text-left w-full cursor-pointer"
              >
                <LogOut size={20} className="shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
