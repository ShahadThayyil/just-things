import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExpandableSection = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);
  
  // Using state to handle initial responsive sizing safely
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial screen size for initial layout
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

        // 1. Text Fades Out
        tl.to(text, {
          opacity: 0,
          // Move left on desktop, move up slightly on mobile
          x: isDesktop ? -100 : 0, 
          y: isDesktop ? 0 : -50,
          duration: 0.5,
          ease: "power2.inOut"
        }, 0);

        // 2. Image Expands
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
      
      {/* 1. WRAPPER */}
      <div ref={wrapperRef} className="relative h-[250vh]">
        
        {/* 2. PINNED CONTAINER */}
        <div ref={containerRef} className="h-screen w-full overflow-hidden relative flex flex-col md:flex-row">
          
          {/* LEFT SIDE: Content (Text styled like Roel) */}
          <div 
            ref={textRef} 
            className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-6 md:pl-20 md:pr-10 z-10 pt-10 md:pt-0"
          >
            {/* Small Logo Placeholder */}
            <div className="mb-8">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white opacity-80 animate-pulse">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                 </svg>
            </div>

            {/* THE BIG BOLD TEXT */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-left">
              OOPS, I JUST <br />
              WANT TO SHOW <br />
              ONE MORE <br />
              STUNNING <br />
              PICTURE
            </h1>
            
            {/* Body Text */}
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md text-left font-medium">
              For me, every photo is truly special... It captures a moment that eyes cannot freeze. When a photo touches me, I want it to touch you too.
            </p>
          </div>

          {/* RIGHT SIDE: Image Container with FENCE OVERLAY */}
          <div 
            ref={imageContainerRef}
            className="absolute bg-gray-800 z-20 overflow-hidden border-l-0 md:border-l-4 border-t-4 md:border-t-0 border-[#0a0a0a]"
            // Initial sizing based on state
            style={{
              width: isMobile ? '100%' : '50%', 
              height: isMobile ? '50%' : '100%',
              right: 0,
              bottom: 0,
              top: isMobile ? 'auto' : 0
            }}
          >
            <img
              // Using the concert image from the reference to match the vibe
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
              alt="Concert Crowd"
              className="w-full h-full object-cover"
            />
            
            {/* --- THE BLACK DIAMOND FENCE OVERLAY --- */}
            <div 
                className="absolute inset-0 z-30 pointer-events-none"
                style={{
                  // CSS Gradients to create thick black cross lines
                  background: `
                    repeating-linear-gradient(45deg, #0a0a0a, #0a0a0a 8px, transparent 8px, transparent 120px),
                    repeating-linear-gradient(-45deg, #0a0a0a, #0a0a0a 8px, transparent 8px, transparent 120px)
                  `
                }}
            ></div>
             {/* A subtle bottom gradient fade for better blending */}
             <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-30"></div>

          </div>

        </div>
      </div>

     

    </div>
  );
};

export default ExpandableSection;