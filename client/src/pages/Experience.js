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
    <div ref={containerRef} className="section-clip relative w-full max-w-5xl mx-auto py-24 px-5 sm:px-8">
      {/* Ambient */}
      <div className="orb orb-violet w-64 h-64 left-0 top-1/3 opacity-[0.08] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-20">
        <span className="section-tag">My Journey</span>
        <h2 className="section-heading">
          <span className="gradient-text-accent">Career Timeline</span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm">Where I've worked and what I've built</p>
      </div>

      {/* ── MOBILE: Signal feed ─────────────────────────────── */}
      <div className="md:hidden relative pl-8">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-300/60 via-teal-300/30 to-transparent" />
        <div className="flex flex-col gap-8">
          {experienceData.map((exp, index) => (
            <div key={exp.id} className="exp-item relative">
              <div className="absolute -left-[31px] top-5 flex h-6 w-6 items-center justify-center rounded-full
                border border-amber-300/60 bg-[#0d1117] text-[10px] font-bold text-amber-200 shadow-[0_0_18px_rgba(244,201,93,0.25)]">
                0{index + 1}
              </div>
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: Alternating signal timeline ───────────── */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-amber-300/70 via-teal-300/30 to-transparent" />
        <div className="flex flex-col gap-20">
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={exp.id} className="exp-item relative grid grid-cols-[1fr_96px_1fr] items-center">
                <div className={isLeft ? 'pr-8' : 'invisible'}>
                  {isLeft && <ExperienceCard experience={exp} side="left" />}
                </div>

                <div className="relative z-10 flex h-full min-h-[180px] flex-col items-center justify-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-amber-200/70">0{index + 1}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/70 bg-[#0d1117] shadow-[0_0_28px_rgba(244,201,93,0.2)]">
                    <div className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(244,201,93,0.8)]" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500">{new Date(exp.startDate).getFullYear()}</span>
                </div>

                <div className={!isLeft ? 'pl-8' : 'invisible'}>
                  {!isLeft && <ExperienceCard experience={exp} side="right" />}
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