import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundParticles from "../components/BackgroundParticles";
import { lazy, Suspense } from 'react';
import aboutImg from '../assets/about.jpg';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowDown } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { IoPlanetOutline, IoRocketOutline, IoMoonOutline, IoStarOutline } from 'react-icons/io5';
import { GiSatelliteCommunication, GiUfo } from 'react-icons/gi';
import { FaMeteor, FaUserAstronaut } from 'react-icons/fa';
import resumePDF from '../assets/cv.pdf';

const About = lazy(() => import('./About'));
const Experience = lazy(() => import('./Experience'));
const Projects = lazy(() => import('./Projects'));
const Gallery = lazy(() => import('./Gallery'));
const Contact = lazy(() => import('./Contact'));

const SectionLoader = () => (
  <div className="w-full flex justify-center py-20">
    <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
  </div>
);

function Home() {
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroSocialRef = useRef(null);

  useEffect(() => {
    // Entrance animation only — FloatingAvatar handles scroll tracking
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(heroTextRef.current, { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' })
      .fromTo(heroImgRef.current, { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.55')
      .fromTo(heroSocialRef.current, { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
    return () => tl.kill();
  }, []);

  return (
    <div className='flex flex-col items-center w-full'>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        id="home"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-5 sm:px-8"
      >
        <BackgroundParticles />


        {/* Glow orbs */}
        <div className="orb orb-purple w-[500px] h-[500px] -top-32 -left-32 opacity-15 pointer-events-none" />
        <div className="orb orb-cyan   w-[350px] h-[350px] bottom-0 right-0   opacity-8  pointer-events-none" />

        {/* Hero content wrapper */}
        <div className="relative w-full max-w-5xl flex flex-col-reverse lg:flex-row
          items-center justify-center gap-12 lg:gap-20 pt-20 pb-28 lg:py-0">

          {/* ── Left: Text ───────────────────────────── */}
          <div
            ref={heroTextRef}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Availability badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-purple-500/10 border border-purple-500/30 text-purple-300
              text-xs font-semibold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Available for work
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
              Hi, I'm <br className="hidden sm:block" />
              <strong className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-lg font-extrabold">
                Sandesh Nepal.
              </strong>
            </h1>

            {/* Typewriter */}
            <div className="text-xl sm:text-2xl font-semibold text-gray-400 mb-4 h-8 overflow-hidden">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer', 2000,
                  'Creative Problem Solver', 2000,
                  'UI / UX Enthusiast', 2000,
                  'Open Source Contributor', 2000,
                ]}
                speed={55}
                className="text-purple-300"
                repeat={Infinity}
              />
            </div>

            <h2 className="text-[15px] sm:text-base text-gray-400/85 max-w-md leading-relaxed mb-8 font-light">
              I craft beautiful, performant <strong className="text-white font-medium">web experiences</strong> — blending engineering
              precision with creative design to build <strong className="text-purple-300 font-medium">products</strong> people love.
            </h2>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              <a href="#projects" className="btn-primary">
                <span>View Work</span>
              </a>
              <a href={resumePDF} download="Sandesh_Nepal_Resume.pdf" className="btn-secondary">
                Download CV
              </a>
            </div>

            {/* Socials */}
            <div ref={heroSocialRef} className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: 'https://github.com/sandeshnepal106', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sandeshnepal106', label: 'LinkedIn' },
                { icon: HiOutlineMail, href: 'mailto:sandeshnepal106@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400
                    hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
              <span className="text-white/20 text-xs ml-1 font-mono">@sandeshnepal106</span>
            </div>
          </div>

          {/* ── Right: Avatar ─────────────────────────── */}
          <div ref={heroImgRef} className="relative z-50 shrink-0 flex items-center justify-center">
            {/* Outer decorative rings */}
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full
              border border-dashed border-purple-500/25 ring-rotate pointer-events-none flex items-center justify-center">
              {/* Planet at top */}
              <div className="absolute -top-4 text-purple-400 opacity-70 icon-counter-rotate">
                <IoPlanetOutline size={30} />
              </div>
              {/* UFO at bottom */}
              <div className="absolute -bottom-4 text-purple-300 opacity-70 icon-counter-rotate">
                <GiUfo size={34} />
              </div>
              {/* Moon on left */}
              <div className="absolute -left-4 text-purple-300 opacity-60 icon-counter-rotate">
                <IoMoonOutline size={26} />
              </div>
              {/* Star on right */}
              <div className="absolute -right-4 text-pink-300 opacity-60 icon-counter-rotate">
                <IoStarOutline size={22} />
              </div>
            </div>

            <div className="absolute w-[320px] h-[320px] sm:w-[412px] sm:h-[412px] rounded-full
              border border-dashed border-cyan-500/15 ring-rotate-reverse pointer-events-none flex items-center justify-center">
              {/* Rocket on left */}
              <div className="absolute -left-4 text-cyan-400 opacity-70 icon-counter-rotate-reverse">
                <IoRocketOutline size={28} />
              </div>
              {/* Satellite on right */}
              <div className="absolute -right-4 text-cyan-300 opacity-80 icon-counter-rotate-reverse">
                <GiSatelliteCommunication size={30} />
              </div>
              {/* Meteor on top */}
              <div className="absolute -top-5 text-pink-400 opacity-50 icon-counter-rotate-reverse">
                <FaMeteor size={24} />
              </div>
              {/* Astronaut on bottom */}
              <div className="absolute -bottom-4 text-cyan-200 opacity-60 icon-counter-rotate-reverse">
                <FaUserAstronaut size={22} />
              </div>
            </div>

            {/* Purple blur glow */}
            <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full
              bg-purple-600/25 blur-3xl" />

            {/* MOBILE/TABLET: Real visible avatar (shown below lg breakpoint) */}
            <div className="lg:hidden relative w-48 h-48 sm:w-64 sm:h-64
              rounded-full overflow-hidden ring-2 ring-white/10
              shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <img src={aboutImg} alt="Sandesh Nepal" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
            </div>

            {/* DESKTOP: Native image so it renders immediately; About.js will float its clone over this. */}
            <div
              id="avatar-anchor-hero"
              className="hidden lg:block relative w-72 h-72 rounded-full overflow-hidden ring-2 ring-white/10 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
            >
              <img src={aboutImg} alt="Sandesh Nepal" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
            </div>

            {/* Floating badge — repositioned to not overlap on mobile */}
            <div className="absolute -bottom-4 right-0 sm:-bottom-2 sm:-right-6
              glass rounded-2xl px-4 py-2.5 border border-white/10 shadow-card z-[60]">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Experience</p>
              <p className="text-white font-bold text-base leading-tight">2+ Years</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator — positioned below padding gap */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
            text-gray-500 hover:text-gray-300 transition-colors animate-bounce z-10"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">Scroll</span>
          <FiArrowDown size={14} />
        </button>
      </section>

      {/* ── CONTENT ──────────────────────────────────── */}
      <main className="w-full flex flex-col items-center">
        <Suspense fallback={<SectionLoader />}>
          <section id="about" className="w-full"><About /></section>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <section id="experience" className="w-full"><Experience /></section>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <section id="projects" className="w-full"><Projects /></section>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <section id="gallery" className="w-full"><Gallery /></section>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <section id="contact" className="w-full"><Contact /></section>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default Home;