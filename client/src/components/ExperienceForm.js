// src/components/ExperienceForm.js

import React, { useState, useEffect } from 'react';

function ExperienceForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    techStack: [],
    techInput: '',
    logoUrl: '',
  });

  useEffect(() => {
    if (initialData) {
      // Format dates correctly for the date input field
      const formattedData = {
        ...initialData,
        startDate: initialData.startDate ? initialData.startDate.substring(0, 10) : '',
        endDate: initialData.endDate ? initialData.endDate.substring(0, 10) : '',
        techInput: '',
      };
      setFormData(formattedData);
    } else {
      // Clear form for adding new experience
      setFormData({
        company: '', role: '', startDate: '', endDate: '', location: '',
        description: '', techStack: [], techInput: '', logoUrl: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTech = () => {
    const tech = formData.techInput.trim();
    if (tech && !formData.techStack.includes(tech)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, tech],
        techInput: '',
      }));
    }
  };

  const removeTech = (techToRemove) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((tech) => tech !== techToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { techInput, ...submissionData } = formData;
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      {/* Company & Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
          <input id="company" name="company" value={formData.company} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
          <input id="role" name="role" value={formData.role} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      
      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
          <input id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">End Date (optional)</label>
          <input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Location & Logo URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input id="location" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label htmlFor="logoUrl" className="block text-sm font-semibold text-gray-700 mb-2">Logo URL</label>
          <input id="logoUrl" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-indigo-500" />
      </div>

      {/* Tech Stack */}
      <div>
        <label htmlFor="techInput" className="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
        <div className="flex gap-3">
          <input id="techInput" name="techInput" value={formData.techInput} onChange={handleChange} className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="React, Node.js..." />
          <button type="button" onClick={handleTech} className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">Add</button>
        </div>
        {formData.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.techStack.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full flex items-center gap-2 text-sm">
                {tech}
                <button type="button" onClick={() => removeTech(tech)} className="text-indigo-600 hover:text-indigo-900 font-bold text-lg">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">Save Experience</button>
        <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition">Cancel</button>
      </div>
    </form>
  );
}

export default ExperienceForm;