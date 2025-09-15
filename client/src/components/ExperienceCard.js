// src/components/ExperienceCard.js

import React from 'react';

function ExperienceCard({ experience, onEdit, onDelete, isLoggedin, index }) {
  const { company, role, startDate, endDate, location, description, techStack, logoUrl } = experience;

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const alignment = index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'; // Starts on the left

  return (
    // The main container is now simpler. The complex flex properties only apply on `md` screens.
    <div className={`w-full max-w-2xl md:max-w-none md:flex md:justify-between md:items-center ${alignment}`}>
      
      {/* DESKTOP-ONLY: Hidden spacer */}
      <div className="hidden md:block w-5/12"></div>

      {/* DESKTOP-ONLY: Timeline Dot and Line */}
      {/* These elements are now completely hidden on mobile screens */}
      <div className="hidden md:flex relative h-full w-6 flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-indigo-400 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-indigo-500 shadow z-10"></div>
      </div>

      {/* Card Content: Takes full width on mobile, and 5/12 on desktop */}
      <div className="bg-white text-black rounded-xl shadow-lg border border-gray-100 p-6 w-full md:w-5/12 transition-all hover:shadow-xl hover:border-indigo-200">
        {/* The rest of the card content remains the same */}
        <div className="flex items-center gap-4 mb-3">
          {logoUrl && <img src={logoUrl} alt={`${company} logo`} className="w-12 h-12 object-contain rounded-full border p-1" />}
          <div>
            <h3 className="text-xl font-bold text-gray-900">{role}</h3>
            <h4 className="text-lg text-indigo-700 font-semibold">{company}</h4>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">
          {formatDate(startDate)} - {formatDate(endDate)}
          {location && <span className="ml-2 text-gray-500">| {location}</span>}
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
        {techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {tech}
              </span>
            ))}
          </div>
        )}
        {isLoggedin && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            <button onClick={() => onEdit(experience)} className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition">Edit</button>
            <button onClick={() => onDelete(experience._id)} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperienceCard;