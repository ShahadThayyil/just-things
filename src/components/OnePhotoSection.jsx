import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three"; // Importing only native Three.js

gsap.registerPlugin(ScrollTrigger);

const ExpandableSection = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);
  
  // Ref for the Rain Canvas Container
  const rainContainerRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(false);

  // --- 1. THREE.JS RAIN LOGIC (No Fiber/Drei) ---
  useEffect(() => {
    if (!rainContainerRef.current) return;

    // A. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Fog for depth (Optional, makes rain fade in distance)
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const width = rainContainerRef.current.clientWidth;
    const height = rainContainerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10; // Position camera back so we can see the rain

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Append Canvas to the container
    rainContainerRef.current.appendChild(renderer.domElement);

    // B. Create Rain Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500; // Number of drops

    const posArray = new Float32Array(particlesCount * 3); // x, y, z

    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles randomly
        posArray[i] = (Math.random() - 0.5) * 30; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Rain Material (Simple lines/dots)
    const material = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // C. Animation Loop
    let animationId;
    const animate = () => {
        animationId = requestAnimationFrame(animate);

        const positions = particlesGeometry.attributes.position.array;

        for(let i = 1; i < particlesCount * 3; i+=3) {
            // Move Y position down (Gravity)
            positions[i] -= 0.2;

            // If drop goes below screen (-15), reset to top (15)
            if (positions[i] < -15) {
                positions[i] = 15;
            }
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    };

    animate();

    // D. Handle Resize
    const handleResize = () => {
        if (!rainContainerRef.current) return;
        const newWidth = rainContainerRef.current.clientWidth;
        const newHeight = rainContainerRef.current.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // E. Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        // Check if child exists before removing to prevent React StrictMode errors
        if (rainContainerRef.current && rainContainerRef.current.contains(renderer.domElement)) {
            rainContainerRef.current.removeChild(renderer.domElement);
        }
        // Dispose Three.js resources to prevent memory leaks
        particlesGeometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, []);


  // --- 2. GSAP SCROLL LOGIC ---
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const imageContainer = imageContainerRef.current;
    const text = textRef.current;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      }, (context) => {
        let { isDesktop } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=150%",
            pin: container,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        // Text Fades Out
        tl.to(text, {
          opacity: 0,
          x: isDesktop ? -100 : 0, 
          y: isDesktop ? 0 : -50,
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);

        // Image Expands
        tl.to(imageContainer, {
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          ease: "none"
        }, 0);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">
      
      {/* WRAPPER */}
      <div ref={wrapperRef} className="relative h-[250vh] bg-[#0a0a0a]">
        
        {/* PINNED CONTAINER */}
        <div ref={containerRef} className="h-[100dvh] w-full overflow-hidden relative flex flex-col md:flex-row bg-[#0a0a0a]">
          
          {/* LEFT/TOP SIDE: Content */}
          <div 
            ref={textRef} 
            className="w-full  md:w-1/2 h-[8000px] md:h-full flex flex-col justify-center px-6 md:pl-20 md:pr-10 z-10 relative overflow-hidden"
          >
             {/* --- THREE.JS RAIN CONTAINER --- */}
             {/* This div will hold the canvas injected by the useEffect */}
             <div ref={rainContainerRef} className="absolute inset-0 z-0 pointer-events-none opacity-50"></div>
             {/* Overlay gradient to ensure text readability over rain */}
             <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>


            {/* TEXT CONTENT (z-10 to sit above rain) */}
            <div className="relative z-10">
                {/* Small Logo */}
                <div className="mb-4 md:mb-8">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white opacity-80 animate-pulse">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>

                {/* BIG BOLD TEXT */}
                <h1 className="text-4xl md:text-7xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tighter mb-4 md:mb-8 text-left drop-shadow-xl">
                OOPS, I JUST <br />
                WANT TO SHOW <br />
                ONE MORE <br />
                STUNNING <br />
                PICTURE
                </h1>
                
                {/* Body Text */}
                <p className="text-gray-300 text-xs md:text-base leading-relaxed max-w-md text-left font-medium drop-shadow-md">
                For me, every photo is truly special... It captures a moment that eyes cannot freeze. When a photo touches me, I want it to touch you too.
                </p>
            </div>
          </div>

          {/* RIGHT/BOTTOM SIDE: Image Container */}
          <div 
            ref={imageContainerRef}
            className="absolute bg-gray-800 z-20 overflow-hidden border-l-0 md:border-l-4 border-t-4 md:border-t-0 border-[#0a0a0a]"
            style={{
              width: isMobile ? '100%' : '50%', 
              height: isMobile ? '50%' : '100%',
              right: 0,
              bottom: 0,
              top: isMobile ? 'auto' : 0 
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
              alt="Concert Crowd"
              className="w-full h-full object-cover"
            />
            
            {/* FENCE OVERLAY */}
            <div 
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  background: `
                    repeating-linear-gradient(45deg, #0a0a0a, #0a0a0a 8px, transparent 8px, transparent 120px),
                    repeating-linear-gradient(-45deg, #0a0a0a, #0a0a0a 8px, transparent 8px, transparent 120px)
                  `
                }}
            ></div>
             <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-30"></div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ExpandableSection;