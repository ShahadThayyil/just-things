import React, { useEffect } from 'react';
import Navbar from './components/NavbarSection.jsx';
import Home from './pages/Home.jsx';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Portfolio from './pages/Portfolio.jsx';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ScrollExpandMedia from './components/scroll-expand-media.jsx';

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
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Portfolio" element={<ScrollExpandMedia
        mediaType="video"
        // Use a local file path or a public URL
        mediaSrc="vid.mp4"
        posterSrc="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1920&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1920&q=80"
        title="Ocean Depth"
        date="EST 2024"
        scrollToExpand="Scroll to Dive In"
        textBlend={true} // Optional: makes text interact with background colors
      >
        {/* This content appears AFTER the video fully expands and you keep scrolling */}
        <div className="space-y-8 text-gray-300">
          <h3 className="text-3xl font-bold text-white">The Deep Blue</h3>
          <p>
            As you descended, the video expanded to immerse you completely. Now you are 
            in the flow of the content. This section is standard HTML/JSX that lives 
            inside the component's children prop.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia 
            odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
            Nullam ac odio ten.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          <p>
            Keep scrolling to see that the video above stays put (or scrolls away 
            depending on your layout preference) while this content moves up.
          </p>
        </div>
      </ScrollExpandMedia>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;