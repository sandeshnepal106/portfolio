import React from 'react'
import About from './About'
import Experience from './Experience'
import Projects from './Projects'
import Contact from './Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Login from './Login'
import aboutImg from '../assets/about.jpg'

function Home() {
  return (
    
      <div className='flex flex-col items-center justify-center gap-20 w-full'>
        <Navbar/>
        <section id="home">
          {/* #1a072f43 */}
          <div className='flex flex-col lg:flex-row bg-[#a6197243] m-10 p-10 border-4 shadow-2xl'>
            <div>
                  <img src={aboutImg} className='rounded-full'/>
            </div>
            <div  className='flex flex-col items-center'>
              <h1 className='text-4xl sm:text-7xl md:text-8xl font-bold text-white text-center md:px-24 lg:px-56 py-10
              text-shadow-lg text-border-black font-sigmar'>Welcome to My Website.
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto text-center">
                  Explore my projects, experiences, and ideas brought to life through design & code.
              </p>
            
            </div>
           
          </div>
          
        </section>
        <section id="about"><About /></section>
        <section id="experience"><Experience /></section>
        
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
        <Footer/>
      </div>

      
   
  )
}

export default Home
