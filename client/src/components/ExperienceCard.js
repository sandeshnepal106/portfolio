// src/components/ExperienceCard.js
import React from 'react';
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi';

function ExperienceCard({ experience, isLeft }) {
  const { company, role, startDate, endDate, location, description, techStack, logoUrl } = experience;

  const formatDate = (ds) => {
    if (!ds) return 'Present';
    return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const initials = company?.slice(0, 2).toUpperCase() || '??';

  return (
    <div className="glass gradient-border rounded-2xl p-6 shadow-card transition-all duration-500
      hover:-translate-y-1 hover:shadow-card-hover w-full">

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {logoUrl ? (
          <img src={logoUrl} alt={company}
            className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-white/5 shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-500/30
            flex items-center justify-center shrink-0">
            <span className="text-purple-300 text-sm font-bold">{initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white leading-snug">{role}</h3>
          <p className="text-purple-300 font-semibold text-sm mt-0.5">{company}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
        <span className="flex items-center gap-1.5 text-gray-400 text-xs">
          <HiOutlineCalendar className="text-purple-400 shrink-0" />
          {formatDate(startDate)} — {formatDate(endDate)}
        </span>
        {location && (
          <span className="flex items-center gap-1.5 text-gray-400 text-xs">
            <HiOutlineLocationMarker className="text-cyan-400 shrink-0" />
            {location}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400/90 text-sm leading-relaxed mb-4">{description}</p>

      {/* Tech tags */}
      {techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech, i) => (
            <span key={i} className="tech-tag text-xs">{tech}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExperienceCard;