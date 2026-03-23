import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/logo.png';
import resumePDF from '../assets/cv.pdf';
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
];

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 80) {
                setIsNavbarVisible(true);
            } else {
                if (currentScrollY > lastScrollY) {
                    setIsNavbarVisible(false); // scrolling down
                } else {
                    setIsNavbarVisible(true); // scrolling up
                }
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );
        const sections = document.querySelectorAll('section');
        sections.forEach((sec) => observer.observe(sec));
        return () => sections.forEach((sec) => observer.unobserve(sec));
    }, []);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsNavOpen(false);
        }
    };

    return (
        <>
            {/* ── Floating Navbar ───────────────────────────────── */}
            <nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100]
          w-[calc(100%-2rem)] max-w-5xl
          flex items-center
          px-4 sm:px-6 py-3
          rounded-2xl
          bg-black/50 backdrop-blur-2xl
          border border-purple-500/30
          shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
          transition-all duration-300 ease-in-out
          ${isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0 pointer-events-none'}`}
            >
                {/* Desktop */}
                <div className="hidden lg:flex items-center gap-6 w-full">
                    <button
                        onClick={() => scrollToSection('home')}
                        className="flex items-center gap-3 shrink-0 group"
                    >
                        <img loading="lazy" src={logo} className="rounded-full h-9 w-9 ring-1 ring-white/20 group-hover:ring-purple-400 transition-all" alt="Logo" />
                        <span className="text-lg font-bold text-white font-jakarta">Sandesh Nepal.</span>
                    </button>

                    <ul className="flex flex-1 justify-center items-center gap-1 font-medium text-sm">
                        {links.map((link) => (
                            <li key={link.id}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${activeSection === link.id
                                            ? 'text-white bg-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                    {activeSection === link.id && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={resumePDF}
                        download="Sandesh_Nepal_Resume.pdf"
                        className="shrink-0 btn-primary text-sm py-2 px-5"
                    >
                        <span>Resume</span>
                    </a>
                </div>

                {/* Mobile */}
                <div className="flex lg:hidden items-center justify-between w-full">
                    <button onClick={() => setIsNavOpen(true)} className="text-white p-1">
                        <GiHamburgerMenu size={22} />
                    </button>
                    <button onClick={() => scrollToSection('home')}>
                        <img loading="lazy" src={logo} className="rounded-full h-9 w-9 ring-1 ring-white/20" alt="Logo" />
                    </button>
                    <a href={resumePDF} download="Sandesh_Nepal_Resume.pdf"
                        className="text-sm font-semibold text-purple-300 bg-purple-900/40 border border-purple-700/50 rounded-full px-4 py-1.5 hover:bg-purple-800/50 transition">
                        Resume
                    </a>
                </div>
            </nav>

            {/* ── Mobile Drawer ─────────────────────────────────── */}
            <div
                onClick={() => setIsNavOpen(false)}
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div className={`fixed top-0 left-0 w-72 h-full z-50 lg:hidden transition-transform duration-400 ease-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-[#07030f] border-r border-white/8`}
            >
                <div className="flex justify-between items-center p-5 border-b border-white/8">
                    <span className="text-lg font-bold text-white font-jakarta">Sandesh Nepal.</span>
                    <button onClick={() => setIsNavOpen(false)} className="text-white p-1"><MdClose size={24} /></button>
                </div>
                <ul className="p-4 space-y-1 mt-2">
                    {links.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all
                  ${activeSection === link.id
                                        ? 'bg-purple-500/15 text-white border border-purple-500/30'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Navbar;