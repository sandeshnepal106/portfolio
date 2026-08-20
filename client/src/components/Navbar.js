import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import resumePDF from '../assets/cv.pdf';
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiBriefcase, FiDownload, FiGrid, FiHome, FiImage, FiMail, FiUser } from 'react-icons/fi';

const links = [
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'about', label: 'About', icon: FiUser },
    { id: 'experience', label: 'Experience', icon: FiBriefcase },
    { id: 'projects', label: 'Projects', icon: FiGrid },
    { id: 'gallery', label: 'Gallery', icon: FiImage },
    { id: 'contact', label: 'Contact', icon: FiMail },
];

function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [isPastHero, setIsPastHero] = useState(false);
    const lastScrollYRef = useRef(0);
    const frameRef = useRef(null);

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('section[id]'));

        const updateScrollState = () => {
            frameRef.current = null;
            const currentScrollY = window.scrollY;
            const isAtAbsoluteTop = currentScrollY <= 0;
            const isScrollingUp = currentScrollY < lastScrollYRef.current;
            setIsNavbarVisible(isAtAbsoluteTop || isScrollingUp);
            setIsPastHero(currentScrollY > 16);
            lastScrollYRef.current = currentScrollY;

            const readingLine = currentScrollY + window.innerHeight * 0.3;
            const currentSection = sections.reduce((active, section) => {
                return section.offsetTop <= readingLine ? section : active;
            }, sections[0]);

            if (currentSection) setActiveSection(currentSection.id);
        };

        const handleScroll = () => {
            if (frameRef.current === null) {
                frameRef.current = window.requestAnimationFrame(updateScrollState);
            }
        };

        updateScrollState();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        };
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
            className={`fixed top-7 left-5 right-5 z-[100]
                    w-auto max-w-[calc(100vw-2.5rem)] translate-x-0 sm:left-8 sm:right-8 sm:max-w-[calc(100vw-4rem)] lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-[calc(100%-2rem)] lg:max-w-7xl
          flex items-center
                    transition-[background-color,border-color,box-shadow,backdrop-filter,padding] duration-500 ease-out
                    ${isPastHero
                        ? 'rounded-[22px] px-3 sm:px-5 py-2.5 bg-[#0b0820]/78 backdrop-blur-2xl border border-violet-300/20 shadow-[0_18px_50px_rgba(3,0,20,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]'
                        : 'rounded-none px-0 py-0 bg-transparent border-transparent shadow-none backdrop-blur-0' }
          ${isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0 pointer-events-none'}`}
            >
                {/* Desktop */}
                <div className="hidden lg:flex min-w-0 items-center gap-3 w-full">
                    <button
                        onClick={() => scrollToSection('home')}
                        className={`flex items-center gap-3 shrink-0 text-left transition group ${isPastHero ? 'rounded-2xl px-2 py-1.5 hover:bg-white/5' : 'px-0 py-0'}`}
                    >
                        <span className="relative">
                            <img loading="lazy" src={logo} className="rounded-xl h-9 w-9 ring-1 ring-white/20 group-hover:ring-cyan-300/70 transition-all" alt="Logo" />
                            <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full border-2 border-[#08051a] bg-cyan-300" />
                        </span>
                        <span className="leading-none">
                            <span className="block mt-1 text-sm font-bold text-white font-jakarta tracking-tight">Sandesh Nepal<span className="text-cyan-300">.</span></span>
                        </span>
                    </button>

                    <ul className={`ml-auto min-w-0 max-w-full flex-1 flex items-center justify-end gap-0.5 overflow-x-auto font-medium text-sm transition-all duration-500 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isPastHero ? 'rounded-2xl border border-violet-300/15 bg-black/20 p-1' : 'rounded-none border-transparent bg-transparent p-0'}`}>
                        {links.map((link) => (
                            <li key={link.id}>
                                {(() => {
                                    const Icon = link.icon;
                                    const isActive = activeSection === link.id;
                                    return (
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`group relative flex shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold transition-all duration-300 ${isPastHero ? 'rounded-xl px-3 py-2' : 'rounded-none px-2 py-1'}
                    ${isActive ? 'text-cyan-200' : 'text-white/70 hover:text-white'} ${isPastHero && isActive ? 'bg-violet-400/15 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.2)]' : ''}`}
                                >
                                    <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                                    {link.label}
                                    {isActive && (
                                        <span className={`absolute left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)] ${isPastHero ? '-bottom-1' : '-bottom-2'}`} />
                                    )}
                                </button>
                                    );
                                })()}
                            </li>
                        ))}
                    </ul>

                    <a
                        href={resumePDF}
                        download="Sandesh_Nepal_Resume.pdf"
                        className={`ml-3 flex shrink-0 items-center gap-2 text-xs font-extrabold transition ${isPastHero
                            ? 'rounded-xl border border-cyan-300/40 bg-cyan-300 px-3.5 py-2.5 text-[#08051a] shadow-[0_0_22px_rgba(103,232,249,0.16)] hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_28px_rgba(103,232,249,0.3)]'
                            : 'rounded-none border-0 bg-transparent px-2 py-1 text-cyan-200 hover:text-white'}`}
                    >
                        <FiDownload size={14} />
                        <span>Resume</span>
                    </a>
                </div>

                {/* Mobile */}
                <div className="flex lg:hidden items-center justify-between w-full">
                    <button onClick={() => setIsNavOpen(true)} aria-label="Open navigation" className={`flex items-center justify-center text-white transition hover:text-cyan-200 ${isPastHero ? 'h-10 w-10 rounded-xl border border-white/10 bg-white/5' : 'h-8 w-8 rounded-none border-0 bg-transparent'}`}>
                        <GiHamburgerMenu size={20} />
                    </button>
                    <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 text-sm font-bold text-white">
                        <img loading="lazy" src={logo} className={`${isPastHero ? 'inline' : 'hidden'} rounded-xl h-9 w-9 ring-1 ring-white/20`} alt="Logo" />
                        <span>Sandesh<span className="text-cyan-300">.</span></span>
                    </button>
                    <a href={resumePDF} download="Sandesh_Nepal_Resume.pdf"
                        aria-label="Download resume"
                        className={`flex items-center justify-center transition ${isPastHero
                            ? 'h-10 w-10 rounded-xl border border-cyan-300/40 bg-cyan-300 text-[#08051a] hover:bg-cyan-200'
                            : 'h-8 rounded-none border-0 bg-transparent px-1 text-cyan-200 hover:text-white'}`}>
                        {isPastHero ? <FiDownload size={17} /> : <span className="text-xs font-semibold">CV</span>}
                    </a>
                </div>
            </nav>

            {/* ── Mobile Drawer ─────────────────────────────────── */}
            <div
                onClick={() => setIsNavOpen(false)}
                className={`fixed inset-0 bg-[#050019]/80 backdrop-blur-md z-[190] lg:hidden transition-opacity duration-300 ${isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div className={`fixed top-0 left-0 w-72 h-full z-[200] lg:hidden transition-transform duration-400 ease-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-violet-300/15 shadow-[20px_0_60px_rgba(3,0,20,0.55)]`}
                style={{ background: '#0b0820', isolation: 'isolate' }}
            >
                <div className="flex justify-between items-center p-5 border-b border-white/8">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">Navigation</p>
                        <span className="mt-1 block text-lg font-bold text-white font-jakarta">Sandesh Nepal<span className="text-cyan-300">.</span></span>
                    </div>
                    <button onClick={() => setIsNavOpen(false)} aria-label="Close navigation" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/40 hover:text-cyan-200"><MdClose size={22} /></button>
                </div>
                <ul className="p-4 space-y-1 mt-2">
                    {links.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium transition-all
                    ${activeSection === link.id ? 'bg-violet-400/15 text-cyan-200 border border-cyan-300/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <link.icon size={17} />
                                {link.label}
                                {activeSection === link.id && <span className="absolute right-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Navbar;