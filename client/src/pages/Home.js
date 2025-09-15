import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundParticles from "../components/BackgroundParticles";
import aboutImg from '../assets/about.jpg';
import { TypeAnimation } from 'react-type-animation';

// Lazy load heavy sections
const About = lazy(() => import('./About'));
const Experience = lazy(() => import('./Experience'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));

// --- NEW: A simple skeleton loader for sections ---
const SectionLoader = () => (
  <div className="w-full max-w-6xl mx-auto p-4 animate-pulse">
    <div className="h-10 bg-gray-700/50 rounded-md w-1/3 mx-auto mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 h-64 bg-gray-700/50 rounded-full mx-auto w-64"></div>
      <div className="md:col-span-2 space-y-4">
        <div className="h-6 bg-gray-700/50 rounded w-full"></div>
        <div className="h-6 bg-gray-700/50 rounded w-5/6"></div>
        <div className="h-24 bg-gray-700/50 rounded w-full mt-8"></div>
      </div>
    </div>
  </div>
);

function Home() {
  return (
    <div className='flex flex-col items-center w-full'>
      <Navbar />

      {/* --- HERO SECTION (No changes needed) --- */}
      <section id="home" className="relative w-full h-screen flex items-center justify-center">
        <BackgroundParticles />
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900/60 z-10"></div>
        <div className="relative z-20 flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-4">
          <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
            <h1 className='text-4xl sm:text-6xl font-bold text-white'>
              Hi, I'm Sandesh Nepal
            </h1>
            <TypeAnimation
              sequence={[
                'A Full Stack Developer', 1500,
                'A Creative Coder', 1500,
                'A Problem Solver', 1500,
              ]}
              wrapper="span"
              speed={50}
              className="block text-2xl sm:text-4xl text-pink-400 mt-2 font-semibold"
              repeat={Infinity}
            />
            <p className="text-lg text-gray-300 max-w-xl mt-4">
              I build and design dynamic web applications. Explore my projects and experiences.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#projects" className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:scale-105 transition-transform duration-300">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-3 font-semibold text-white bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700/80 transition-colors duration-300">
                Get In Touch
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
            <img 
              loading="lazy" 
              src={aboutImg} 
              className='relative rounded-full w-48 h-48 sm:w-64 sm:h-64 object-cover border-4 border-slate-800' 
              alt="Profile" 
            />
          </div>
        </div>
      </section>

      {/* --- Main Content Sections --- */}
      <main className="w-full flex flex-col items-center gap-20 sm:gap-28 md:gap-36 px-4 mt-20">
        {/* --- MODIFIED: Using the SectionLoader in Suspense fallback --- */}
        <Suspense fallback={<SectionLoader />}>
          <section id="about" className="w-full max-w-6xl"><About /></section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="experience" className="w-full max-w-6xl"><Experience /></section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="projects" className="w-full max-w-6xl"><Projects /></section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="contact" className="w-full max-w-6xl"><Contact /></section>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default Home;