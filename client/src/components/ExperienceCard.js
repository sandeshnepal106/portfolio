// src/components/ExperienceCard.js
import React, { useState } from 'react';
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi';

function ExperienceCard({ experience, side }) {
  const { company, role, startDate, endDate, location, description, techStack, logoUrl } = experience;
  const [logoFailed, setLogoFailed] = useState(false);

  const formatDate = (ds) => {
    if (!ds) return 'Present';
    return new Date(ds).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const initials = company?.slice(0, 2).toUpperCase() || '??';

  return (
    <div className={`group glass gradient-border relative overflow-hidden rounded-2xl p-5 sm:p-6 shadow-card transition-all duration-500
      hover:-translate-y-1 hover:shadow-card-hover w-full ${side === 'right' ? 'border-l-amber-300/30' : ''}`}>

      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-teal-300/15 transition-transform duration-500 group-hover:scale-125" />
      <div className="pointer-events-none absolute right-4 top-4 h-2 w-2 rounded-full bg-teal-300/70 shadow-[0_0_14px_rgba(103,232,212,0.7)]" />

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {logoUrl && !logoFailed ? (
          <img
            src={logoUrl}
            alt={`${company} logo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setLogoFailed(true)}
            className="w-12 h-12 rounded-xl object-cover border border-white/10 bg-white/5 shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-amber-300/10 border border-amber-300/30
            flex items-center justify-center shrink-0">
            <span className="text-amber-200 text-sm font-bold">{initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-teal-200/70">{side === 'right' ? 'Field experience' : 'Professional experience'}</p>
          <h3 className="text-base font-bold text-white leading-snug">{role}</h3>
          <p className="text-amber-200 font-semibold text-sm mt-0.5">{company}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
        <span className="flex items-center gap-1.5 text-gray-400 text-xs">
          <HiOutlineCalendar className="text-amber-300 shrink-0" />
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