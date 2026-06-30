import React, { useEffect, useState } from 'react';
import { User, Mail, Building, Shield, LogOut } from 'lucide-react';
import axios from 'axios';
import authApi from '../api/authApi'

export default function Profile() {
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
    fetchProfile(Profile);
  })


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-slate-50 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
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
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0b2240]">{user.fullName}</h2>
              <p className="text-sm text-slate-500 font-medium">{user.role}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-sm font-semibold rounded-lg transition-all"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col gap-5">
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
                <span className="text-sm font-medium">Standard User</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
