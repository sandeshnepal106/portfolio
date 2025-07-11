import React from 'react'
import aboutImg from '../assets/about.jpg'

function About() {
  return (
  <div className="min-h-screen  px-6 py-16">
    <div className="max-w-4xl mx-auto text-center  flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl sm:text-5xl font-sigmar mb-6">About Me</h1>
      <img src={aboutImg} className='rounded-full w-1/2 border-4 border-white '/>
      <p className="text-lg sm:text-xl font-outfit leading-relaxed text-white/90">
        I'm a passionate full-stack developer blending creativity and code to craft meaningful digital experiences. With a foundation in Electrical & Electronics Engineering and a sharp eye for modern web design, I build responsive, dynamic applications that reflect both function and aesthetics.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-8 text-left">
        <div>
          <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
          <ul className="mt-2 list-disc list-inside text-white/90 space-y-1">
            <li>React.js, Tailwind CSS, Node.js, MongoDB</li>
            <li>HTML, CSS, JavaScript, C</li>
            <li>Express.js, Git</li>
            <li>PHP, MySQL, Python (AI/ML)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Current Focus</h2>
          <ul className="mt-2 list-disc list-inside text-white/90 space-y-1">
            <li>Building scalable full-stack projects</li>
            <li>Mastering DSA with C & Web Dev tools</li>
            <li>Exploring AI/ML and smart tech solutions</li>
            <li>Blending creativity with clean UI/UX</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-white/80 text-sm">
        ⚡ Driven by curiosity. Focused on solutions. Always learning.
      </div>
    </div>
  </div>
)

}

export default About
