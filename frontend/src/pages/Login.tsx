import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 min-h-screen pt-48 px-8 flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-black mb-12 tracking-tighter">Login<span className="text-indigo-600">.</span></h1>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3">Email Address</label>
            <input type="email" placeholder="name@example.com" className="w-full h-14 px-6 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-3">Password</label>
            <input type="password" placeholder="••••••••" className="w-full h-14 px-6 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
          </div>
          <button type="submit" className="w-full h-14 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-indigo-600 transition-all duration-500 shadow-xl shadow-gray-200 mt-4">
            Enter System
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400 font-medium">
          Don't have an account? <button onClick={() => navigate('/signup')} className="text-indigo-600 font-bold hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
