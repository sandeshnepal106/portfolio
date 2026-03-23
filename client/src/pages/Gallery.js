// src/pages/Gallery.js
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import galleryData from '../data/gallery.json';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const TAGS = ['all', 'event', 'behind-the-scenes', 'personal', 'misc'];
const ITEM_WIDTH = 260;
const ITEM_HEIGHT = 340;
const AUTO_SPEED = 3000;

function calcRadius(n, cardW) {
  if (n <= 1) return 0;
  const gap = 28;
  return Math.round(((cardW + gap) * n) / (2 * Math.PI));
}

function Gallery() {
  const [filter, setFilter] = useState('all');
  const [paused, setPaused] = useState(false);

  // continuous angle — NEVER clamped, always grows in one direction
  const totalAngleRef = useRef(0);
  const [displayAngle, setDisplayAngle] = useState(0);
  // logical index (for highlighting the front face)
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const itemsRef = useRef(galleryData);

  const items = filter === 'all' ? galleryData : galleryData.filter(i => i.tag === filter);
  itemsRef.current = items;
  const N = items.length;
  const radius = calcRadius(N, ITEM_WIDTH);
  const theta = N > 0 ? 360 / N : 0;

  // Header reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-header', start: 'top 88%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Reset angle when filter changes
  useEffect(() => {
    totalAngleRef.current = 0;
    currentRef.current = 0;
    setDisplayAngle(0);
    setCurrent(0);
  }, [filter]);

  // ── Continuous navigation ──────────────────────────
  const stepForward = useCallback(() => {
    const n = itemsRef.current.length;
    if (n <= 1) return;
    const t = itemsRef.current.length > 0 ? 360 / n : 0;
    totalAngleRef.current -= t;           // always go the same direction
    setDisplayAngle(totalAngleRef.current);
    currentRef.current = (currentRef.current + 1) % n;
    setCurrent(currentRef.current);
  }, []);

  const stepBackward = useCallback(() => {
    const n = itemsRef.current.length;
    if (n <= 1) return;
    const t = itemsRef.current.length > 0 ? 360 / n : 0;
    totalAngleRef.current += t;           // opposite direction — still no jump
    setDisplayAngle(totalAngleRef.current);
    currentRef.current = (currentRef.current - 1 + n) % n;
    setCurrent(currentRef.current);
  }, []);

  const jumpTo = useCallback((i) => {
    const n = itemsRef.current.length;
    if (n <= 1) return;
    const t = n > 0 ? 360 / n : 0;
    // always go the shortest path in the forward direction
    const diff = ((i - currentRef.current) % n + n) % n;
    totalAngleRef.current -= diff * t;
    setDisplayAngle(totalAngleRef.current);
    currentRef.current = i;
    setCurrent(i);
  }, []);

  // Auto-rotation timer
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (!paused) {
      timerRef.current = setInterval(stepForward, AUTO_SPEED);
    }
  }, [paused, stepForward]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handlePrev = () => { stepBackward(); startTimer(); };
  const handleNext = () => { stepForward(); startTimer(); };
  const handleDot = (i) => { jumpTo(i); startTimer(); };

  if (N === 0) {
    return (
      <div ref={containerRef} className="w-full py-24 px-5 text-center text-gray-600">
        No items in this category.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full py-24 overflow-hidden">
      <div className="orb orb-cyan w-80 h-80 -left-20 top-0 opacity-[0.06] pointer-events-none" />

      {/* Header */}
      <div className="gallery-header text-center mb-10 px-5">
        <span className="section-tag">My Life</span>
        <h2 className="section-heading">
          <span className="gradient-text">Gallery</span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm">Moments captured behind the scenes</p>
      </div>

      {/* Filter tabs */}
      <div className="flex justify-center gap-2 mb-14 flex-wrap px-5">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-300
              ${filter === tag
                ? 'bg-purple-500 text-white border border-purple-400 shadow-glow-sm'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
          >
            {tag.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* ── 3D Prism ──────────────────────────────── */}
      <div
        className="relative flex items-center justify-center select-none"
        style={{ height: ITEM_HEIGHT + 80 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); startTimer(); }}
      >
        {/* Perspective wrapper */}
        <div style={{ perspective: '1100px', width: ITEM_WIDTH, height: ITEM_HEIGHT }}>
          {/* Spinner */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${displayAngle}deg)`,
              transition: 'transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {items.map((item, i) => {
              const faceAngle = i * theta;
              const isFront = i === current;
              return (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    top: 0, left: 0,
                    transform: `rotateY(${faceAngle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
                  }}
                  className={`rounded-2xl overflow-hidden border cursor-pointer transition-all duration-400
                    ${isFront
                      ? 'border-purple-500/60 shadow-[0_0_32px_rgba(168,85,247,0.55)]'
                      : 'border-white/10 shadow-lg'
                    }`}
                  onClick={() => { handleDot(i); }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.tag}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize
                      backdrop-blur-md border
                      ${item.tag === 'event' ? 'bg-purple-500/60 border-purple-400/40 text-white'
                        : item.tag === 'behind-the-scenes' ? 'bg-cyan-500/60 border-cyan-400/40 text-white'
                          : item.tag === 'personal' ? 'bg-pink-500/60 border-pink-400/40 text-white'
                            : 'bg-gray-500/60 border-gray-400/40 text-white'
                      }`}>
                      {item.tag.replace(/-/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        {N > 1 && (
          <>
            <button onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full glass border border-white/10
                text-gray-400 hover:text-white hover:bg-white/10 transition z-20"
              aria-label="Previous">
              <FiChevronLeft size={20} />
            </button>
            <button onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full glass border border-white/10
                text-gray-400 hover:text-white hover:bg-white/10 transition z-20"
              aria-label="Next">
              <FiChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {N > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className={`rounded-full transition-all duration-300
                ${i === current ? 'w-6 h-2 bg-purple-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;