// src/pages/Contact.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaMapMarkerAlt, FaEnvelopeOpenText, FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: FaEnvelopeOpenText,
    label: 'Email',
    value: 'sandeshnepal106@gmail.com',
    href: 'mailto:sandeshnepal106@gmail.com',
    iconClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10 border-purple-500/25',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'NIT Sikkim, India',
    href: null,
    iconClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10 border-cyan-500/25',
  },
];

const socials = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/sandeshnepal106' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sandeshnepal106' },
];

function Contact() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%' }
        }
      );
      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 82%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-24 px-5 sm:px-8">
      {/* Ambient */}
      <div className="orb orb-purple w-96 h-96 left-1/2 top-0 -translate-x-1/2 opacity-[0.08]
        pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="section-tag">Let's Talk</span>
        <h2 className="section-heading">
          <span className="gradient-text">Get In Touch</span>
        </h2>
        <p className="text-gray-500 mt-3 text-sm">
          Open to opportunities, collaborations, and conversations
        </p>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">

        {/* ── Left: Info panel ──────────────────── */}
        <div ref={leftRef} className="flex flex-col gap-5">

          {/* Contact details */}
          <div className="glass rounded-2xl p-6 border border-white/8 space-y-1">
            <h3 className="text-lg font-bold text-white mb-5">Contact Information</h3>

            {contactDetails.map(({ icon: Icon, label, value, href, iconClass, bgClass }) => {
              const inner = (
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition group">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${bgClass}`}>
                    <Icon className={`text-sm ${iconClass}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-white text-sm font-medium group-hover:text-purple-300 transition truncate">
                      {value}
                    </p>
                  </div>
                </div>
              );
              return href
                ? <a key={label} href={href}>{inner}</a>
                : <div key={label}>{inner}</div>;
            })}

            {/* Divider */}
            <div className="pt-4 mt-2 border-t border-white/8">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Socials</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                      bg-white/5 border border-white/10 text-gray-400 text-sm font-medium
                      hover:text-white hover:bg-white/10 hover:border-white/20 transition"
                  >
                    <Icon size={14} />{label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Availability badge */}
          <div className="glass rounded-2xl p-5 border border-white/8 flex items-center gap-4">
            <div className="relative shrink-0">
              <span className="block w-3 h-3 rounded-full bg-emerald-400" />
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Available for work</p>
              <p className="text-gray-500 text-xs mt-0.5">Open to full-time &amp; freelance roles</p>
            </div>
          </div>
        </div>

        {/* ── Right: Form ───────────────────────── */}
        <div ref={rightRef}>
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/8">
            <h3 className="text-lg font-bold text-white mb-2">Send me a message</h3>
            <p className="text-gray-500 text-sm mb-6">
              I'll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;