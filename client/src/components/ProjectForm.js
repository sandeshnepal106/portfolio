// src/components/ProjectForm.js

import React, { useState, useEffect } from 'react';

function ProjectForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    githubUrl: '',
    imageUrl: '',
    techInput: '',
  });

  useEffect(() => {
    // If we have initialData (i.e., we are editing), populate the form
    if (initialData) {
      setFormData({ ...initialData, techInput: '' });
    } else {
      // Otherwise, ensure the form is cleared (for adding)
      setFormData({
        title: '', description: '', techStack: [], githubUrl: '', imageUrl: '', techInput: '',
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
    // We don't need the techInput in the final submission data
    const { techInput, ...submissionData } = formData;
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black" />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-indigo-500 text-black" />
      </div>

      {/* Tech Stack */}
      <div>
        <label htmlFor="techInput" className="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
        <div className="flex gap-3">
          <input id="techInput" name="techInput" value={formData.techInput} onChange={handleChange} className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black" placeholder="React, Node.js..." />
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
      
      {/* GitHub URL & Image URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-700 mb-2">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black" />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
          <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105">Save Changes</button>
        <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition">Cancel</button>
      </div>
    </form>
  );
}

export default ProjectForm;