import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Search, 
  CalendarDays, 
  ClipboardList, 
  Bot, 
  CheckCircle2, 
  BookOpen,
  Sparkles
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#faf8ff] pb-12 md:pl-[8%]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#006948] to-[#00855d] text-white pt-20 pb-24 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#68dba9] opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-bold mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              Welcome to Academic Vitality
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight font-serif">
              Master Your <br/>
              <span className="text-[#85f8c4]">Study Space.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#eef0ff] mb-8 font-medium">
              Don't leave your focus to chance. Book the perfect room, manage your schedule, and collaborate with ease.
            </p>
            <div className="flex gap-4">
              <Link to="/book" className="flex items-center gap-2 px-6 py-3 bg-[#ffb95f] text-[#2a1700] rounded-lg font-bold hover:bg-[#ffddb8] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                Book Now <Rocket size={20} />
              </Link>
              <Link to="/rooms" className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                Explore Rooms <Search size={20} />
              </Link>
            </div>
          </div>
          
          {/* Fun floating graphic / cards */}
          <div className="md:w-1/2 relative h-64 md:h-96 w-full perspective-1000">
            <div className="absolute top-10 right-10 bg-white text-[#131b2e] p-4 rounded-xl shadow-2xl rotate-3 animate-pulse" style={{ animationDuration: '4s' }}>
              <div className="font-bold text-lg mb-1">Room 402</div>
              <div className="text-sm text-[#006c4a] font-semibold bg-[#eaedff] px-2 py-1 rounded-md inline-block">Available Now</div>
            </div>
            <div className="absolute bottom-10 left-10 bg-white text-[#131b2e] p-5 rounded-xl shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#684000]">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <div className="font-bold">Next Session</div>
                  <div className="text-sm text-[#6d7a72]">Tomorrow, 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Dashboard Section */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link to="/myrequests" className="bg-white p-6 rounded-2xl shadow-lg border border-[#eaedff] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-[#e2e7ff] text-[#316bf3] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#131b2e] mb-2">My Requests</h3>
            <p className="text-[#3d4a42]">Check the status of your bookings and past study sessions.</p>
          </Link>
          
          {/* Card 2 */}
          <Link to="/schedule" className="bg-white p-6 rounded-2xl shadow-lg border border-[#eaedff] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-[#ffdad6] text-[#ba1a1a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CalendarDays size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#131b2e] mb-2">My Schedule</h3>
            <p className="text-[#3d4a42]">View your calendar and plan your week efficiently.</p>
          </Link>

          {/* Card 3 */}
          <Link to="/chat" className="bg-white p-6 rounded-2xl shadow-lg border border-[#eaedff] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-[#dae2fd] text-[#00174b] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#131b2e] mb-2">AI Assistant</h3>
            <p className="text-[#3d4a42]">Got questions? Ask our AI for help finding resources.</p>
          </Link>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="bg-[#f2f3ff] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#e2e7ff]">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-[#131b2e] mb-4 font-serif">Focus on what matters.</h2>
            <p className="text-[#3d4a42] text-lg mb-6">
              We've designed this platform to minimize distractions. Find an empty room, secure it in seconds, and get right to work.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[#131b2e] font-medium">
                <CheckCircle2 size={20} className="text-[#006c4a]" /> Real-time availability
              </li>
              <li className="flex items-center gap-3 text-[#131b2e] font-medium">
                <CheckCircle2 size={20} className="text-[#006c4a]" /> Instant booking confirmations
              </li>
              <li className="flex items-center gap-3 text-[#131b2e] font-medium">
                <CheckCircle2 size={20} className="text-[#006c4a]" /> Seamless schedule integration
              </li>
            </ul>
          </div>
          <div className="md:w-1/3">
             <div className="aspect-square bg-gradient-to-tr from-[#68dba9] to-[#316bf3] rounded-full p-2 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="w-full h-full bg-[#faf8ff] rounded-full flex items-center justify-center text-[#131b2e]">
                  <BookOpen size={64} className="text-[#316bf3]" />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
