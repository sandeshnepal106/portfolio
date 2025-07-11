import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/60 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Logo or Name */}
        <div className="text-xl font-semibold tracking-wide">
          &copy; {currentYear} Sandesh Nepal. All rights reserved.
        </div>

        {/* Center: Navigation links */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="#projects" className="hover:text-pink-400 transition">Projects</a>
          <a href="#about" className="hover:text-pink-400 transition">About</a>
          <a href="#contact" className="hover:text-pink-400 transition">Contact</a>
        </div>

        {/* Right: Socials */}
        <div className="flex gap-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
            GitHub
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
