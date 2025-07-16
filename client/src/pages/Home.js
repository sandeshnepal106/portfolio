import React, { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutImg from '../assets/about.jpg';

// Lazy load heavy sections
const About = lazy(() => import('./About'));
const Experience = lazy(() => import('./Experience'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));


function Home() {
  return (
    <div className='flex flex-col items-center justify-center gap-20 w-full'>
      <Navbar />

      <section id="home">
        <div className='flex flex-col lg:flex-row bg-[#a6197243] m-10 p-10 border-4 shadow-2xl'>
          <div>
            <img src={aboutImg} className='rounded-full' />
          </div>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl sm:text-7xl md:text-8xl font-bold text-white text-center md:px-24 lg:px-56 py-10 text-shadow-lg text-border-black font-sigmar'>
              Welcome to My Website.
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto text-center">
              Explore my projects, experiences, and ideas brought to life through design & code.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-xl py-4">Loading About...</div>}>
        <section id="about"><About /></section>
      </Suspense>

      <Suspense fallback={<div className="text-xl py-4">Loading Experience...</div>}>
        <section id="experience"><Experience /></section>
      </Suspense>

      <Suspense fallback={<div className="text-xl py-4">Loading Projects...</div>}>
        <section id="projects"><Projects /></section>
      </Suspense>

      <Suspense fallback={<div className="text-xl py-4">Loading Contact...</div>}>
        <section id="contact"><Contact /></section>
      </Suspense>

      <Footer />
    </div>
  );
}

export default Home;
