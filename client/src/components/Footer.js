import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: FaGithub, href: 'https://github.com/sandeshnepal106', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sandeshnepal106', label: 'LinkedIn' },
    { icon: HiOutlineMail, href: 'mailto:sandeshnepal106@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="w-full mt-20 border-t border-white/8">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-xl font-bold text-white font-jakarta">Sandesh Nepal.</p>
            <p className="text-gray-500 text-sm mt-1">Full Stack Developer · NIT Sikkim</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map(link => (
              <a key={link.label} href={link.href}
                className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400
                  hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© {year} Sandesh Nepal. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <FaHeart className="text-pink-500" size={11} /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;