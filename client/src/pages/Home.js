import React from 'react'
import About from './About'
import Experience from './Experience'
import Projects from './Projects'
import Contact from './Contact'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    
      <div className='flex flex-col items-center justify-center gap-20 w-full'>
        <Navbar/>
        <section id="home">
          <h1 className='text-8xl sm:text-9xl font-bold text-white text-center p-36
           text-shadow-lg text-border-black font-sigmar'>Welcome to My Website.</h1>
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
