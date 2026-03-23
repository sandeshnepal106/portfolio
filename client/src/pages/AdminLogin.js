import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AdminLogin() {
    const [adminName, setAdminName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/admin/login` : '/api/admin/login',
                { adminName, password },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success('Logged in successfully!');
                navigate('/admin-dashboard');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center min-h-screen px-4 bg-gray-900">
            <div className="max-w-md w-full glass p-8 rounded-2xl shadow-card border border-white/10">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Admin Access
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="text-sm text-gray-400 font-medium mb-1 block">Admin Username</label>
                        <input
                            type="text"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            className="form-input w-full"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 font-medium mb-1 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input w-full"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary justify-center mt-4 w-full disabled:opacity-50"
                    >
                        {isLoading ? 'Authenticating...' : 'Secure Login'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-sm text-gray-500 hover:text-white transition-colors text-center mt-2"
                    >
                        &larr; Return to Home
                    </button>
                </form>
            </div>
        </div>
    );
}
