import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPen } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/visitor/contact` : '/api/visitor/contact',
        formData
      );

      if (data.success) {
        toast.success("✅ Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
        <input type="text" name="name" placeholder="Your Name"
          value={formData.name} onChange={handleChange} required
          className="form-input" />
      </div>

      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
        <input type="email" name="email" placeholder="Your Email"
          value={formData.email} onChange={handleChange} required
          className="form-input" />
      </div>

      {/* Message */}
      <div className="relative">
        <FaPen className="absolute left-4 top-4 text-gray-500 text-sm" />
        <textarea name="message" placeholder="Your Message"
          value={formData.message} onChange={handleChange} required rows={5}
          className="form-input resize-none" style={{ paddingTop: '1rem' }} />
      </div>

      <button type="submit" disabled={isSubmitting}
        className="btn-primary justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
        <span className="flex items-center gap-2">
          <FiSend size={15} />
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </span>
      </button>
    </form>
  );
}

export default ContactForm;