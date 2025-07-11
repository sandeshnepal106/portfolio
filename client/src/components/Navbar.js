import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'; // Make sure logo is at this path
import resumePDF from '../assets/cv.pdf'; // Place your resume PDF in the 'assets' folder
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
    // State for controlling the mobile menu's open/close status. `false` = closed.
    const [isNavOpen, setIsNavOpen] = useState(false);

    // State for tracking the active section for styling the links
    const [activeSection, setActiveSection] = useState('home');

    // State to control the visibility of the floating navbar based on scroll position (Your Original Logic)
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    // --- HOOKS AND HANDLERS ---

    // Original handler for showing the navbar after a scroll threshold
    const handleScroll = () => {
        const scrollThreshold = 100; // Appears after scrolling 100px
        if (window.scrollY > scrollThreshold) {
            setIsNavbarVisible(true);
        } else {
            setIsNavbarVisible(false);
        }
    };

    // Original effect for scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Initial check in case the page loads already scrolled down
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // Effect for observing which section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );
        const sections = document.querySelectorAll('section');
        sections.forEach((sec) => observer.observe(sec));
        return () => sections.forEach((sec) => observer.unobserve(sec));
    }, []);

    // Toggles the mobile navigation menu
    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Scrolls to a section and closes the mobile menu
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if (isNavOpen) {
                setIsNavOpen(false);
            }
        }
    };

    // --- STYLING & COMPONENTS ---

    const desktopLinkStyle = (id) =>
        `relative cursor-pointer transition-colors duration-300 ${
            activeSection === id ? 'text-cyan-300' : 'text-gray-300 hover:text-white'
        }`;

    const mobileLinkStyle = (id) =>
        `block w-full text-left p-4 text-lg transition-all duration-300 rounded-lg ${
            activeSection === id
                ? 'bg-gray-700 text-cyan-300 shadow-lg'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`;

    const ResumeButton = () => (
        <a
            href={resumePDF}
            download="Sandesh_Nepal_Resume.pdf"
            className="
                flex-shrink-0 px-4 py-2 text-sm font-semibold text-cyan-300 bg-cyan-900/50 
                border border-cyan-700 rounded-full
                hover:bg-cyan-800/70 hover:text-white transition-all duration-300
            "
        >
            Resume
        </a>
    );

    const links = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <>
            {/* ====== Main Floating Navbar ====== */}
            <nav
                className={`
                    fixed top-4 left-1/2 z-50 flex items-center
                    w-[calc(100%-2rem)] max-w-6xl rounded-full px-4 sm:px-6 py-3 
                    bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg
                    transition-all duration-500 ease-in-out
                    ${isNavbarVisible
                        ? 'transform -translate-x-1/2 translate-y-0 opacity-100'
                        : 'transform -translate-x-1/2 -translate-y-24 opacity-0 pointer-events-none'
                    }
                `}
            >
                {/* --- DESKTOP & TABLET VIEW --- */}
                <div className="hidden lg:flex items-center gap-6 w-full">
                    <div onClick={() => scrollToSection('home')} className="flex items-center gap-3 cursor-pointer">
                        <img src={logo} className='rounded-full h-10 w-10 border-2 border-white/20' alt="Logo"/>
                        <h1 className="text-xl font-bold text-white">Sandesh Nepal.</h1>
                    </div>
                    <ul className="flex flex-1 justify-center items-center gap-8 font-medium text-sm">
                        {links.map((link) => (
                            <li key={link.id}>
                                <button className={desktopLinkStyle(link.id)} onClick={() => scrollToSection(link.id)}>
                                    {link.label}
                                    {activeSection === link.id && (
                                        <span className="absolute -bottom-1.5 left-1/2 w-2 h-1 bg-cyan-300 rounded-full transform -translate-x-1/2"></span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ResumeButton />
                </div>

                {/* --- MOBILE VIEW --- */}
                <div className="flex lg:hidden items-center justify-between w-full">
                    <div onClick={handleNavToggle} className="cursor-pointer text-white p-2">
                        <GiHamburgerMenu size={24} />
                    </div>
                    <div onClick={() => scrollToSection('home')} className="cursor-pointer">
                        <img src={logo} className='rounded-full h-10 w-10 border-2 border-white/20' alt="Logo"/>
                    </div>
                    <ResumeButton />
                </div>
            </nav>

            {/* ====== Mobile Slide-in Menu ====== */}
            <div
                onClick={handleNavToggle}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 lg:hidden ${
                    isNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            />
            <div
                className={`
                    fixed top-0 left-0 w-[75%] max-w-sm h-full bg-[#101110] z-50
                    transition-transform duration-500 ease-in-out lg:hidden
                    ${isNavOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}
                `}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h1 className="text-xl text-white">Sandesh Nepal.</h1>
                    <div onClick={handleNavToggle} className="cursor-pointer p-2 text-white">
                        <MdClose size={28} />
                    </div>
                </div>
                <ul className="p-4 space-y-2">
                    {links.map((link) => (
                        <li key={link.id}>
                            <button className={mobileLinkStyle(link.id)} onClick={() => scrollToSection(link.id)}>
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