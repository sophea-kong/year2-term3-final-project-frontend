import React, { useState } from 'react';
import { Wrench, CheckCircle2 } from 'lucide-react';

const MaintenanceRequest = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    issueType: 'AC',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ roomNumber: '', issueType: 'AC', description: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <main className="flex-1 p-6 md:p-8 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
            <Wrench size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Maintenance Request</h1>
            <p className="text-slate-500 text-sm mt-1">Report issues with facilities or equipment</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3">
              <CheckCircle2 size={20} />
              <p className="font-medium">Your maintenance request has been submitted successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Room Number</label>
                <input
                  type="text"
                  required
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="e.g. 402"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Type</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({...formData, issueType: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                >
                  <option value="AC">Air Conditioning</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="IT">IT / Equipment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all min-h-[120px] resize-y"
                placeholder="Please describe the issue in detail..."
              ></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-sm"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MaintenanceRequest;
