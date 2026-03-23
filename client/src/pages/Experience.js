// src/pages/Experience.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experienceData from '../data/experience.json';
import ExperienceCard from '../components/ExperienceCard';

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.exp-item').forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-24 px-5 sm:px-8">
      {/* Ambient */}
      <div className="orb orb-violet w-64 h-64 left-0 top-1/3 opacity-[0.08] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20">
        <span className="section-tag">My Journey</span>
        <h2 className="section-heading">
          <span className="gradient-text-accent">Career Timeline</span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm">Where I've worked and what I've built</p>
      </div>

      {/* ── MOBILE: Stacked cards with left border ─────────── */}
      <div className="md:hidden flex flex-col gap-6 ml-4 border-l-2 border-purple-500/20 pl-6">
        {experienceData.map((exp) => (
          <div key={exp.id} className="exp-item relative">
            <div className="absolute -left-[33px] top-5 w-3.5 h-3.5 rounded-full
              bg-purple-500 ring-4 ring-purple-500/20 shadow-glow-sm" />
            <ExperienceCard experience={exp} />
          </div>
        ))}
      </div>

      {/* ── DESKTOP: Alternating timeline ── */}
      <div className="hidden md:block relative">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2
          bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />

        <div className="flex flex-col gap-16">
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={exp.id} className="exp-item relative flex items-center gap-0">
                {/* Left side — either card or empty spacer */}
                <div className="flex-1 pr-8">
                  {isLeft && <ExperienceCard experience={exp} />}
                </div>

                {/* Center dot (always visible) */}
                <div className="shrink-0 z-10 flex items-center justify-center w-12">
                  <div className="w-4 h-4 rounded-full bg-purple-500 ring-[5px]
                    ring-purple-500/20 shadow-[0_0_16px_rgba(168,85,247,0.6)]" />
                </div>

                {/* Right side — either empty spacer or card */}
                <div className="flex-1 pl-8">
                  {!isLeft && <ExperienceCard experience={exp} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Experience;