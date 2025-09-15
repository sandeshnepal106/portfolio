import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUserShield, FaLock } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

function Login() {
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, setIsLoggedin } = useContext(AppContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { adminName: name, password });
      if (data.success) {
        setIsLoggedin(true);
        toast.success("Login successful!");
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    setIsSubmitting(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/admin/logout`);
      if (data.success) {
        setIsLoggedin(false);
        toast.info("You have been logged out.");
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center bg-slate-900 px-4'>
      {/* Conditionally render based on login status */}
      {isLoggedin ? (
        // --- LOGGED-IN VIEW ---
        <div className='w-full max-w-md bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg text-white p-8 text-center'>
          <h1 className='text-3xl font-bold mb-4 font-sigmar'>Welcome, Admin</h1>
          <p className='text-green-400 mb-6 flex items-center justify-center gap-2'>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            You are currently logged in.
          </p>
          <button
            onClick={logout}
            disabled={isSubmitting}
            className='w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition-all py-3 px-6 rounded-lg font-semibold text-white disabled:opacity-50'
          >
            <FiLogOut />
            {isSubmitting ? 'Logging Out...' : 'Logout'}
          </button>
        </div>
      ) : (
        // --- LOGIN FORM VIEW ---
        <div className='w-full max-w-md bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg text-white p-8'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold mb-2 font-sigmar'>Admin Login</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mt-2 mb-8 rounded-full"></div>
          </div>
          <form onSubmit={onSubmit} className='flex flex-col gap-5'>
            <div className="relative">
              <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                type='text'
                placeholder='Admin Name'
                className='w-full p-3 pl-12 rounded-lg border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all'
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Password'
                className='w-full p-3 pl-12 rounded-lg border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all'
                required
              />
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all py-3 px-6 rounded-lg font-semibold text-white disabled:opacity-50'
            >
              {isSubmitting ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;