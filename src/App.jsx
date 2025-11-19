import React, { useEffect } from 'react';
import Navbar from './components/NavbarSection.jsx';
import Home from './pages/Home.jsx';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {

  useEffect(() => {
    // --- LENIS SMOOTH SCROLL SETUP ---
    const lenis = new Lenis({
      duration: 2.0, // ⚡ Change this: Higher = Slower/Smoother (Try 1.5 to 2.5)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Keep false for native mobile feel, true for smooth mobile
      touchMultiplier: 2,
    });

    // --- CONNECT LENIS TO GSAP ---
    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    // This ensures GSAP animations and Scroll scrolling are perfectly in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing in GSAP to prevent stutter
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white antialiased">
      <Navbar />
      <Home/>
    </div>
  );
}

export default App;