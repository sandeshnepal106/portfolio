import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/60 text-white py-10 px-6 mt-20">
      {/* The key change is here:
        - flex-col for mobile (default)
        - md:flex-row for medium screens and up
        - md:justify-between to spread items out on larger screens
      */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Copyright - Stays on the left */}
        <div className="text-lg font-semibold tracking-wide">
          &copy; {currentYear} Sandesh Nepal
        </div>

        {/* Navigation - Moves to the center */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="#projects" className="hover:text-pink-400 transition">Projects</a>
          <a href="#about" className="hover:text-pink-400 transition">About</a>
          <a href="#contact" className="hover:text-pink-400 transition">Contact</a>
        </div>

        {/* Socials - Move to the right */}
        <div className="flex gap-4 text-sm">
          <a href="https://github.com/sandeshnepal106" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/sandeshnepal106" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
            LinkedIn
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;