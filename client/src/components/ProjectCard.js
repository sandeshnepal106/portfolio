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
      flex flex-col h-full">

      {/* ── Image ─────────────────────────────── */}
      <div className="relative overflow-hidden h-44 shrink-0 bg-gray-900">
        <img
          loading="lazy"
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Bottom-to-top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05000f] via-black/20 to-transparent" />

        {/* GitHub hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-black/60 backdrop-blur-md border border-white/20 text-white text-sm font-medium
                hover:bg-black/80 transition"
            >
              <FaGithub size={15} />
              View Code
            </a>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────── */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        <h3 className="text-base font-bold text-white leading-snug line-clamp-1
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

        {/* GitHub button */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
              bg-white/5 border border-white/10 text-gray-300 text-sm font-medium
              hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
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