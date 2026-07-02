import LoginCard from '../component/login-card';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Login_navbar(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 w-full select-none relative z-50">
            <div className="flex items-center justify-between h-[70px] px-6 md:px-8 max-w-7xl mx-auto">
                {/* Logo */}
                <h1 className="text-2xl font-extrabold text-[#0b2240] tracking-tight whitespace-nowrap">
                    CampusReserve
                </h1>

                {/* Desktop Navigation Links */}
                {/* <nav className="hidden md:flex items-center gap-6">
                    <a href="#dashboard" className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-100 px-3 py-2 rounded-md transition-all">Dashboard</a>
                    <a href="#bookings" className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-100 px-3 py-2 rounded-md transition-all whitespace-nowrap">My Bookings</a>
                    <a href="#buildings" className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-100 px-3 py-2 rounded-md transition-all">Buildings</a>
                    <a href="#schedule" className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-100 px-3 py-2 rounded-md transition-all">Schedule</a>
                    <a href="#schedule" className="flex items-center justify-center text-sm font-semibold text-white bg-[#059669] hover:bg-[#006948] px-6 py-2 rounded-md transition-all whitespace-nowrap">Log in</a>
                </nav> */}

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-[70px] left-0 w-full bg-white border-b border-gray-200 shadow-lg px-6 py-4 flex flex-col gap-3">
                    <a href="#dashboard" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-50 px-3 py-2 rounded-md transition-all">Dashboard</a>
                    <a href="#bookings" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-50 px-3 py-2 rounded-md transition-all">My Bookings</a>
                    <a href="#buildings" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-50 px-3 py-2 rounded-md transition-all">Buildings</a>
                    <a href="#schedule" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-gray-600 hover:text-[#0b2240] hover:bg-gray-50 px-3 py-2 rounded-md transition-all">Schedule</a>
                    <a href="#schedule" onClick={() => setIsOpen(false)} className="flex items-center justify-center text-sm font-semibold text-white bg-[#059669] hover:bg-[#006948] py-2.5 rounded-md transition-all w-full">Log in</a>
                </div>
            )}
        </header>
    )
}

function Login(){
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <div className="flex-1 flex items-center justify-center px-4">
                <LoginCard />
            </div>
        </div>
    )
}

export default Login;