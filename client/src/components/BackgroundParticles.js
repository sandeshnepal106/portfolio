import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim"; // loads the slim engine

function BackgroundParticles() {
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // You can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // This loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // Starting from v2 you can add only the features you need reducing the bundle size
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  const options = {
    background: {
      color: {
        value: "#0d0d21", // A deeper, cosmic blue
      },
    },
    fpsLimit: 120, // Increased for smoother animations
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ["push", "remove"], // Clicking now adds AND removes particles, creating a disruption effect
        },
        onHover: {
          enable: true,
          mode: ["grab", "bubble"], // On hover, lines will grab towards the cursor and particles will bubble up
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
        grab: {
          distance: 200,
          links: {
            opacity: 0.8,
          },
        },
        bubble: {
          distance: 250,
          size: 8,
          duration: 2,
          opacity: 1,
        },
      },
    },
    particles: {
      color: {
        value: ["#ff00ff", "#00ffff", "#ffffff", "#9933ff"], // A vibrant, multi-color palette
      },
      links: {
        color: "random", // Links will take on the color of one of the connected particles
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out", // Particles will drift off-screen instead of bouncing
        },
        random: true,
        speed: 0.5, // Slower, more majestic movement
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100, // Slightly more particles for a denser feel
      },
      opacity: {
        value: { min: 0.1, max: 0.7 }, // Particles will have random opacities
        animation: {
          enable: true, // Opacity will fade in and out, creating a twinkling effect
          speed: 1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.5, max: 2.5 }, // Particles will have random sizes
        animation: {
          enable: true, // Size will pulsate, making the background feel alive
          speed: 2,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
}

export default BackgroundParticles;