// src/components/ProjectCard.js

import React from 'react';

function ProjectCard({ project, onEdit, onDelete, isLoggedin }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img loading="lazy" src={project.imageUrl} alt={project.title} className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600">
          {project.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition text-center">
              View on GitHub
            </a>
          )}
          {isLoggedin && (
            <>
              <button onClick={() => onEdit(project)} className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition">
                Edit
              </button>
              <button onClick={() => onDelete(project._id)} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;