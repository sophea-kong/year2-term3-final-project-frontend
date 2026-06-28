import { useState } from 'react';
import authApi from '../api/authApi';

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      const response = await authApi.login({ email, password });
      const tokenReceived = response.token || response.jwt || response;
      if (typeof tokenReceived === 'string') {
        localStorage.setItem('token', tokenReceived);
        setAuthSuccess('Logged in successfully!');
        // Refresh page or trigger app redirect
        window.location.reload();
      } else {
        setAuthError('Invalid response payload from server.');
      }
    } catch (err) {
      setAuthError(err.response?.data?.error || err.message || 'Login failed.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      await authApi.register({ fullName, email, password, department });
      setAuthSuccess('Registration successful! Please log in.');
      setIsRegistering(false);
      setPassword('');
    } catch (err) {
      setAuthError(err.response?.data?.error || err.message || 'Registration failed.');
    }
  };

  return (
    <div className="login-card w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xl mx-auto my-12 transition-all">
      <h2 className="text-2xl font-extrabold text-[#0b2240] text-center mb-6">
        {isRegistering ? 'Create Account' : 'Welcome Back'}
      </h2>
      
      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5 text-center font-medium">
          {authError}
        </div>
      )}
      {authSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm px-4 py-3 rounded-lg mb-5 text-center font-medium">
          {authSuccess}
        </div>
      )}

      {isRegistering ? (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              id="fullName"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="registerEmail" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              id="registerEmail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="registerPassword" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              id="registerPassword"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="department" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Department</label>
            <input 
              type="text" 
              id="department"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#059669] hover:bg-[#006948] text-white font-bold rounded-lg text-sm transition-all shadow-md shadow-emerald-100 mt-2"
          >
            Submit Registration
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{' '}
            <button 
              type="button" 
              onClick={() => { setIsRegistering(false); setAuthError(''); }}
              className="text-[#059669] hover:underline font-semibold"
            >
              Sign In
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="loginEmail" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              id="loginEmail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="loginPassword" className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              id="loginPassword"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100 outline-none text-sm transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#059669] hover:bg-[#006948] text-white font-bold rounded-lg text-sm transition-all shadow-md shadow-emerald-100 mt-2"
          >
            Log In
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => { setIsRegistering(true); setAuthError(''); }}
              className="text-[#059669] hover:underline font-semibold"
            >
              Register
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginCard;