// src/pages/Projects.js
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 3;

function Projects() {
    const [showAll, setShowAll] = useState(false);
    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const moreBtnRef = useRef(null);

    const visible = showAll ? projectsData : projectsData.slice(0, INITIAL_COUNT);
    const hasMore = projectsData.length > INITIAL_COUNT;

    // Animate header on scroll-enter
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.proj-header',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: '.proj-header', start: 'top 88%' },
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animate newly revealed cards whenever `visible` changes
    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll('.proj-card');
        if (!cards) return;
        gsap.fromTo(cards,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
        );
    }, [showAll]);

    const toggle = () => {
        if (showAll) {
            // Collapse — scroll back up to section header
            setShowAll(false);
            setTimeout(() => {
                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        } else {
            setShowAll(true);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-24 px-5 sm:px-8">
            {/* Ambient glow */}
            <div className="orb orb-pink w-80 h-80 right-0 top-0 opacity-[0.07] pointer-events-none" />

            {/* Header */}
            <div className="proj-header text-center mb-14">
                <span className="section-tag">My Work</span>
                <h2 className="section-heading">
                    <span className="gradient-text">Featured Projects</span>
                </h2>
                <p className="text-gray-500 mt-3 text-sm">Things I've built that I'm proud of</p>
            </div>

            {/* 3-column grid */}
            <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {visible.map((project) => (
                    <div key={project.id} className="proj-card">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            {/* Show More / Show Less button */}
            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <button
                        ref={moreBtnRef}
                        onClick={toggle}
                        className="group inline-flex items-center gap-2 px-8 py-3 rounded-full
              border border-purple-500/40 bg-purple-500/10 text-purple-300
              font-semibold text-sm tracking-wide
              hover:bg-purple-500/20 hover:border-purple-400/60 hover:text-white
              transition-all duration-300 shadow-glow-sm"
                    >
                        {showAll ? (
                            <>
                                <FiChevronUp className="transition-transform group-hover:-translate-y-0.5" />
                                Show Less
                            </>
                        ) : (
                            <>
                                View All {projectsData.length} Projects
                                <FiChevronDown className="transition-transform group-hover:translate-y-0.5" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Projects;