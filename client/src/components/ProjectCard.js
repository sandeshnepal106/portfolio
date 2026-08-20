// src/components/ProjectCard.js
import React from 'react';
import { FaGithub } from 'react-icons/fa';

/**
 * Clean glass project card:
 * - Image with zoom hover + gradient overlay
 * - Tech tags (max 4 shown)
 * - GitHub button at bottom
 */
function ProjectCard({ project }) {
  return (
    <article className="group relative glass gradient-border rounded-2xl overflow-hidden
      shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover
      flex flex-col h-full z-0">

      {/* ── Image ─────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[16/9] shrink-0 bg-[#102022] z-10">
        <img
          loading="lazy"
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Bottom-to-top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05000f] via-black/20 to-transparent pointer-events-none" />

        {/* GitHub hover overlay */}
        {project.githubUrl && (
          <div className="absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
            transition-opacity duration-300 z-20">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-black/60 backdrop-blur-md border border-white/20 text-white text-sm font-medium
                hover:bg-black/80 transition relative z-30"
            >
              <FaGithub size={15} />
              View Code
            </a>
          </div>
        )}
      </div>

      {/* ── Content ───────────────────────────── */}
      <div className="flex flex-col flex-grow p-5 gap-3 relative z-10">
        <h3 className="text-base font-bold text-white leading-snug line-clamp-2 min-h-[2.75rem]
          group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="tech-tag text-xs">{tech}</span>
            ))}
            {project.techStack.length > 4 && (
              <span className="tech-tag text-xs opacity-50">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Bottom GitHub button */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
              bg-amber-300/10 border border-amber-300/20 text-amber-100 text-sm font-medium
              hover:bg-amber-300/20 hover:text-white hover:border-amber-300/40 transition-all
              relative z-20 cursor-pointer"
          >
            <FaGithub size={14} />
            View on GitHub
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;