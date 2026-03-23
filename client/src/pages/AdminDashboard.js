import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLogOut, FiMail, FiCalendar } from 'react-icons/fi';

export default function AdminDashboard() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const { data } = await axios.get(
                process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/admin/contacts` : '/api/admin/contacts',
                { withCredentials: true }
            );

            if (data.success) {
                setMessages(data.contacts);
            } else {
                toast.error(data.message || 'Failed to fetch messages');
                if (data.message === 'Not Authorized Login Again') navigate('/admin-login');
            }
        } catch (error) {
            toast.error('Authentication error or server unreachable');
            navigate('/admin-login');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Authenticate check essentially happens via the contacts fetch due to adminAuth middleware
        fetchContacts();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(
                process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/admin/logout` : '/api/admin/logout',
                {},
                { withCredentials: true }
            );
            toast.success("Logged out");
            navigate('/admin-login');
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>

                    <div className="flex gap-4">
                        <button onClick={() => navigate('/')} className="btn-secondary text-sm">
                            View Site
                        </button>
                        <button onClick={handleLogout} className="btn-primary text-sm flex items-center gap-2">
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>

                <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 shadow-card">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                        <FiMail className="text-purple-400" />
                        Contact Form Messages ({messages.length})
                    </h2>

                    {messages.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-xl">
                            No messages received yet.
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {messages.map((msg) => (
                                <div key={msg._id} className="bg-white/5 border border-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 border-b border-white/10 pb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">{msg.name}</h3>
                                            <a href={`mailto:${msg.email}`} className="text-cyan-400 text-sm hover:underline">
                                                {msg.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <FiCalendar />
                                            <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {msg.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
