import React, { useEffect } from 'react';
import Navbar from './components/NavbarSection.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Portfolio from './pages/Portfolio.jsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './pages/Services.jsx';
import AboutPage from './pages/About.jsx';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // --- LENIS SMOOTH SCROLL SETUP ---
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // --- CONNECT LENIS TO GSAP ---
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white antialiased">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Portfolio"
            element={<Portfolio />}
          />
          <Route path="/services" element={<Service />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
