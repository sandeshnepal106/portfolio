import React from 'react';
import aboutImg from '../assets/about.jpg';
import { FaCode, FaBullseye } from 'react-icons/fa'; // Importing icons

function About() {
  // A cleaner way to manage your tech stack for easy updates
  const techStack = [
    'React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Express.js',
    'JavaScript', 'HTML5', 'CSS3', 'Git', 'PHP', 'MySQL', 'Python'
  ];

  const currentFocus = [
    'Building scalable full-stack projects',
    'Mastering DSA with C & Web Dev tools',
    'Exploring AI/ML and smart tech solutions',
    'Blending creativity with clean UI/UX'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider font-sigmar">
          About Me
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Left Column: Image */}
        <div className="md:col-span-1 flex justify-center">
          <div className="relative">
            {/* Animated gradient glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
            {/* The image itself */}
            <img 
              loading="lazy" 
              src={aboutImg} 
              className='relative rounded-full w-52 h-52 sm:w-64 sm:h-64 object-cover border-4 border-slate-800' 
              alt="Profile" 
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="md:col-span-2 text-center md:text-left">
          <p className="text-lg sm:text-xl leading-relaxed text-white/90">
            I'm a passionate full-stack developer blending creativity and code to craft meaningful digital experiences. With a foundation in Electrical & Electronics Engineering and a sharp eye for modern web design, I build responsive, dynamic applications that reflect both function and aesthetics.
          </p>

          <div className="mt-10 space-y-8">
            {/* Tech Stack Section */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                <FaCode className="text-indigo-400" />
                My Tech Stack
              </h2>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                {techStack.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-800 text-white/80 text-sm font-medium rounded-full border border-gray-700 hover:bg-gray-700 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Focus Section */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                <FaBullseye className="text-pink-400" />
                Current Focus
              </h2>
              <ul className="mt-4 list-inside list-disc text-white/90 space-y-2">
                {currentFocus.map((focus, index) => (
                  <li key={index}>{focus}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-indigo-300/80 text-sm font-mono text-center md:text-left">
            ⚡ Driven by curiosity. Focused on solutions. Always learning.
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;