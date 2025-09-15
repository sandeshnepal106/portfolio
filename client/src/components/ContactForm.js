// src/components/ContactForm.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

function ContactForm() {
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/visitor/contact`, formData);
      if (data.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      {/* Name Input */}
      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type='text'
          placeholder='Your Name'
          value={formData.name}
          name='name'
          onChange={handleChange}
          required
          className='w-full p-3 pl-12 rounded-lg border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all'
        />
      </div>
      
      {/* Email Input */}
      <div className="relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type='email'
          placeholder='Your Email'
          value={formData.email}
          name='email'
          onChange={handleChange}
          required
          className='w-full p-3 pl-12 rounded-lg border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all'
        />
      </div>

      {/* Message Textarea */}
      <div className="relative">
         <FaPen className="absolute left-4 top-5 text-white/50" />
        <textarea
          placeholder='Your Message'
          value={formData.message}
          name='message'
          onChange={handleChange}
          required
          rows={5}
          className='w-full p-3 pl-12 rounded-lg border border-white/20 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none'
        />
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all py-3 px-6 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;