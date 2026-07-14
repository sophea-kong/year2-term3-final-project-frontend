import React, { useEffect, useState } from 'react';
import { User, Mail, Building, Shield, LogOut, Coins, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import axios from 'axios';
import authApi from '../api/authApi';
import creditApi from '../api/creditApi';

export default function Profile() {
  const [user,setUser] = useState({
    fullName: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    role: 'Student / Resource Coordinator',
  });
  const [googleStatus, setGoogleStatus] = useState(null);
  const [creditBalance, setCreditBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    const fetchProfileAndCredits = async ()=>{
        try{
            const u = await authApi.me();
            setUser(u);
            
            // Fetch credits
            const creditData = await creditApi.getMyCredits();
            setCreditBalance(creditData.creditBalance);
            setTransactions(creditData.transactions);
        } catch (err){
            console.log("Error fetching profile or credits:", err);
        }
    }
    fetchProfileAndCredits();

    // Check status parameters from redirect
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status) {
      setGoogleStatus(status);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleLinkGoogleCalendar = () => {
    const token = localStorage.getItem('token');
    window.location.href = `http://localhost:3000/auth/google?token=${token}`;
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-slate-50 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-[#006c4a] to-[#00855d] relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 overflow-hidden flex items-center justify-center shadow-md">
              <img 
                src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 pb-8 px-8">
          {googleStatus === 'success' && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
              Google Calendar linked successfully! Your approved bookings will now sync.
            </div>
          )}
          {googleStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-medium">
              Failed to link Google Calendar. Please try again.
            </div>
          )}

          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0b2240]">{user.fullName}</h2>
              <p className="text-sm text-slate-500 font-medium capitalize">{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-sm font-semibold rounded-lg transition-all"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-100 rounded-xl p-5 flex flex-col gap-4 bg-slate-50/50">
              <div className="flex items-center gap-4 text-slate-700">
                <Mail className="text-slate-400 shrink-0" size={20} />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Email Address</span>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <Shield className="text-slate-400 shrink-0" size={20} />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Access Role</span>
                  <span className="text-sm font-medium capitalize">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-5 bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Coins size={20} />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Credit Balance</span>
              </div>
              <h3 className="text-3xl font-black text-[#0b2240] ml-2">{creditBalance}</h3>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-3">Integrations</span>
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" 
                    alt="Google Calendar Logo" 
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0b2240]">Google Calendar</h4>
                  <p className="text-xs text-slate-500">Sync approved bookings to your calendar</p>
                </div>
              </div>
              <button
                onClick={handleLinkGoogleCalendar}
                className="px-4 py-2 bg-[#006c4a] hover:bg-[#00855d] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
              >
                Link Account
              </button>
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-100 pt-6">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-3">Credit History</span>
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <div className="text-sm text-slate-500 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  No credit transactions found.
                </div>
              ) : (
                transactions.map(tx => (
                  <div key={tx.transactionId} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tx.type === 'addition' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {tx.type === 'addition' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{tx.reason}</p>
                        <p className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${tx.type === 'addition' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.type === 'addition' ? '+' : '-'}{tx.amount}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

