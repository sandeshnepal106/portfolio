// src/pages/Contact.js

import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaEnvelopeOpenText } from 'react-icons/fa';

import ContactForm from '../components/ContactForm';
import AdminContacts from '../components/AdminContacts';

function Contact() {
  const { backendUrl, isLoggedin } = useContext(AppContext);
  
  // State for Admin Section
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getContacts = useCallback(async (page = 1) => {
    if (!isLoggedin) return;
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/admin/contacts?page=${page}&limit=5`, { withCredentials: true });
      if (res.data.success) {
        setContacts(res.data.contacts || []);
        setTotalPages(res.data.totalPages || 1);
        setCurrentPage(page);
      }
    } catch (error) {
      toast.error("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, isLoggedin]);

  useEffect(() => {
    if (isLoggedin) {
      getContacts(currentPage);
    }
  }, [isLoggedin, currentPage, getContacts]);

  return (
    <div className='w-full max-w-6xl mx-auto py-16 px-4'>
      <div className='text-center'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider font-sigmar'>Get In Touch</h1>
        <p className="text-lg text-white/70 mt-2">Have a question or want to work together? Drop me a line!</p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-black/40 rounded-xl p-8'>
        {/* Left Side: Contact Info */}
        <div className="text-white space-y-8">
            <h2 className="text-3xl font-bold">Contact Information</h2>
            <p className="text-white/80">
                Fill up the form and I will get back to you within 24 hours. Or if you prefer, you can reach out via email.
            </p>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <FaEnvelopeOpenText className="text-purple-400 text-2xl" />
                    <a href="mailto:sandeshnepal106@gmail.com" className="hover:text-purple-300 transition-colors">sandeshnepal106@gmail.com</a>
                </div>
                <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-purple-400 text-2xl" />
                    <span>NIT Sikkim</span>
                </div>
            </div>
        </div>

        {/* Right Side: Contact Form */}
        <div>
          <ContactForm />
        </div>
      </div>

      {/* Conditional Admin Section */}
      {isLoggedin && (
        <AdminContacts
          contacts={contacts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={getContacts}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Contact;