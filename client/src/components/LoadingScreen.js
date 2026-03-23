// src/components/LoadingScreen.js
import { useEffect, useRef } from 'react';

/**
 * Premium animated loading screen.
 * - Animated logo initials "SN" with gradient stroke
 * - Orbital ring that spins around the logo
 * - Pulsing dots progress indicator
 * - Floating particle dots
 * - Subtle scanline overlay for depth
 * Pure CSS — no extra dependencies
 */
export default function LoadingScreen() {
    const canvasRef = useRef(null);

    // Floating particle dots
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 55 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.5 + 0.1,
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div style={styles.root}>
            {/* Particle layer */}
            <canvas ref={canvasRef} style={styles.canvas} />

            {/* Gradient background orbs */}
            <div style={{ ...styles.orb, top: '15%', left: '10%', background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)', width: 420, height: 420 }} />
            <div style={{ ...styles.orb, bottom: '10%', right: '8%', background: 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 70%)', width: 340, height: 340 }} />

            {/* Center content */}
            <div style={styles.center}>

                {/* Outer orbital ring */}
                <div style={styles.orbitWrapper}>
                    <div style={styles.orbit} />
                    {/* Orbiting dot */}
                    <div style={styles.orbitDot} />
                </div>

                {/* Logo circle */}
                <div style={styles.logoRing}>
                    <div style={styles.logoInner}>
                        {/* Gradient "SN" */}
                        <svg width="64" height="42" viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="lg" x1="0" y1="0" x2="64" y2="42" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="50%" stopColor="#a855f7" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                            <text x="2" y="34" fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
                                fontWeight="800" fontSize="36" fill="url(#lg)" letterSpacing="-1">SN</text>
                        </svg>
                    </div>
                </div>

                {/* Name + tagline */}
                <div style={styles.nameBlock}>
                    <p style={styles.name}>Sandesh Nepal</p>
                    <p style={styles.tagline}>Crafting digital experiences…</p>
                </div>

                {/* Animated pulsing dots */}
                <div style={styles.dots}>
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            style={{
                                ...styles.dot,
                                animationDelay: `${i * 0.18}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Inject keyframes */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;800&display=swap');

        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-dot {
          from { transform: rotate(0deg) translateX(68px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(68px) rotate(-360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(0.6); opacity: 0.3; }
          50%       { transform: scale(1.2); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

// ─── Inline styles (no Tailwind needed for the loader) ──────────────────────
const styles = {
    root: {
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #0f0620 50%, #06080f 100%)',
        overflow: 'hidden',
    },
    canvas: { position: 'absolute', inset: 0, pointerEvents: 'none' },
    orb: { position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' },

    center: {
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '20px',
        animation: 'fade-in-up 0.6s ease both',
    },

    // Spinning orbit ring
    orbitWrapper: {
        position: 'absolute', width: 160, height: 160,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
    },
    orbit: {
        position: 'absolute', inset: 0,
        borderRadius: '50%',
        border: '1.5px solid transparent',
        borderTopColor: 'rgba(168,85,247,0.6)',
        borderRightColor: 'rgba(6,182,212,0.3)',
        animation: 'spin-ring 2.2s linear infinite',
    },
    orbitDot: {
        position: 'absolute', top: '50%', left: '50%',
        width: 8, height: 8, borderRadius: '50%',
        background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
        boxShadow: '0 0 12px rgba(168,85,247,0.8)',
        animation: 'orbit-dot 2.2s linear infinite',
        transformOrigin: 'center center',
        marginTop: -4, marginLeft: -4,
    },

    // Logo circle
    logoRing: {
        position: 'relative', zIndex: 1,
        width: 110, height: 110, borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(168,85,247,0.25)',
        boxShadow: '0 0 40px rgba(168,85,247,0.2), inset 0 0 30px rgba(6,182,212,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
    },
    logoInner: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '100%', height: '100%',
    },

    // Text
    nameBlock: { textAlign: 'center', lineHeight: 1.3 },
    name: {
        margin: 0,
        color: '#fff', fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontWeight: 700, fontSize: 18, letterSpacing: '0.04em',
    },
    tagline: {
        margin: '4px 0 0', color: 'rgba(167,139,250,0.7)',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: 12, letterSpacing: '0.1em', fontWeight: 500,
    },

    // Dot progress
    dots: { display: 'flex', gap: 8, alignItems: 'center' },
    dot: {
        width: 7, height: 7, borderRadius: '50%',
        background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
        animation: 'pulse-dot 1.1s ease-in-out infinite',
    },
};
