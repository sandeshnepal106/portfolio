// src/pages/About.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImg from '../assets/about.jpg';
import { FaCode, FaBullseye } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  'React.js', 'Node.js', 'Next.js', 'TypeScript', 'MongoDB',
  'Express.js', 'Tailwind CSS', 'JavaScript', 'Python', 'Git', 'MySQL', 'PHP',
];

const currentFocus = [
  'Building scalable full-stack projects',
  'Mastering DSA with C & Web Dev tools',
  'Exploring AI/ML and smart tech solutions',
  'Blending creativity with clean UI/UX',
];

function About() {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    // ── Content & pills animations ───────────────────────────────────
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-content-col',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%' },
        }
      );
      gsap.fromTo('.tech-pill',
        { opacity: 0, scale: 0.75, y: 10 },
        {
          opacity: 1, scale: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.tech-grid', start: 'top 88%' },
        }
      );
    }, containerRef);

    // ── Avatar scroll journey (desktop lg+ only) ─────────────────────
    // On mobile/tablet the avatar is shown normally in both hero and About.
    // On desktop (≥ 1024px) we animate it from the invisible hero anchor
    // to its natural About position on scroll.
    let st;
    let resizeTimeout;

    const LG = 1024; // tailwind lg breakpoint

    const setupAnimation = () => {
      // Kill any running animation first
      st?.kill();
      st = undefined;

      const el = avatarRef.current;
      if (!el) return;

      // Always reset transforms so nothing leaks across breakpoints
      gsap.set(el, { x: 0, y: 0, scale: 1, zIndex: 'auto', clearProps: 'zIndex' });

      // Only animate on desktop
      if (window.innerWidth < LG) return;

      const heroAnchor = document.getElementById('avatar-anchor-hero');
      if (!heroAnchor) return;

      // Measure both elements in their current layout
      const heroRect = heroAnchor.getBoundingClientRect();
      const aboutRect = el.getBoundingClientRect();

      // Shift amount so about-avatar sits exactly on the hero anchor
      const dx = (heroRect.left + heroRect.width / 2) - (aboutRect.left + aboutRect.width / 2);
      const dy = (heroRect.top + heroRect.height / 2) - (aboutRect.top + aboutRect.height / 2);
      const scaleRatio = heroRect.width / aboutRect.width;

      // Immediately place at hero position (no flicker before first paint)
      gsap.set(el, { x: dx, y: dy, scale: scaleRatio, zIndex: 40, transformOrigin: 'center center' });

      // Scrub back to natural About position as user scrolls in
      st = gsap.to(el, {
        x: 0, y: 0, scale: 1, zIndex: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'top 30%',
          scrub: true,
          onRefresh: (self) => {
            // Recalculate on any ScrollTrigger refresh (font load, image load, etc.)
            const hR = heroAnchor.getBoundingClientRect();
            const aR = el.getBoundingClientRect();
            if (self.progress === 0) {
              gsap.set(el, {
                x: (hR.left + hR.width / 2) - (aR.left + aR.width / 2),
                y: (hR.top + hR.height / 2) - (aR.top + aR.height / 2),
                scale: hR.width / aR.width,
              });
            }
          },
        },
      });
    };

    // Debounced resize — recompute everything for new viewport
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        setupAnimation();
      }, 250);
    };

    // Initial setup after layout settles
    const initTimer = setTimeout(setupAnimation, 300);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      st?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-24 px-5 sm:px-8">
      <div className="orb orb-purple w-96 h-96 right-0 top-0 opacity-[0.08] pointer-events-none" />

      {/* Section header */}
      <div className="text-center mb-16">
        <span className="section-tag">Who I Am</span>
        <h2 className="section-heading">
          <span className="gradient-text">About Me</span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm">The mind behind the code</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">

        {/* ── Image Column ───────────────────────────── */}
        <div className="flex flex-col items-center gap-6">
          {/* Avatar — the single real image; travels from hero on scroll */}
          <div className="relative">
            {/* Decorative glow behind the avatar */}
            <div className="absolute -inset-4 rounded-full
              bg-gradient-to-br from-purple-600/30 to-cyan-600/15 blur-2xl" />
            <div className="absolute -inset-px rounded-full
              bg-gradient-to-br from-purple-500/40 to-cyan-500/20 p-px" />
            {/* The actual image — animated via ref */}
            <img
              ref={avatarRef}
              src={aboutImg}
              alt="Sandesh Nepal"
              loading="eager"
              className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-44 md:h-44
                rounded-full object-cover ring-2 ring-white/10
                shadow-[0_0_40px_rgba(168,85,247,0.4)]"
              style={{ willChange: 'transform' }}
            />
          </div>

          {/* Stat cards */}
          <div className="flex flex-row md:flex-col gap-3 w-full">
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Experience', value: '2+ Yrs' },
            ].map(s => (
              <div key={s.label}
                className="flex-1 glass rounded-xl p-3 border border-white/8 text-center">
                <p className="text-white font-bold text-lg">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content Column ─────────────────────────── */}
        <div className="about-content-col space-y-8">
          <p className="text-base sm:text-lg leading-relaxed text-gray-300">
            I'm <strong className="text-purple-300 font-semibold">Sandesh Nepal</strong>, a passionate{' '}
            <strong className="text-white font-semibold">full-stack web developer</strong>{' '}
            and software engineer blending creativity and code to craft meaningful digital experiences. With a
            foundation in Electrical &amp; Electronics Engineering and a sharp eye for modern
            web design, I build responsive, dynamic applications that reflect both{' '}
            <strong className="text-purple-300 font-medium">function and aesthetics</strong>.
          </p>

          <div>
            <h3 className="flex items-center gap-2.5 text-base font-bold text-white mb-4">
              <FaCode className="text-cyan-400 flex-shrink-0" />
              My Tech Stack
            </h3>
            <div className="tech-grid flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span key={i} className="tech-pill tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2.5 text-base font-bold text-white mb-4">
              <FaBullseye className="text-pink-400 flex-shrink-0" />
              Current Focus
            </h3>
            <ul className="space-y-2.5">
              {currentFocus.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-gray-300">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-purple-400/60 text-sm font-mono border-t border-white/5 pt-4">
            ⚡ Driven by curiosity. Focused on solutions. Always learning.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;