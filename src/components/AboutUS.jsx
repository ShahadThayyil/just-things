import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const mainImageRef = useRef(null);
  const secondaryImageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mainImg = mainImageRef.current;
    const secImg = secondaryImageRef.current;
    const content = contentRef.current;

    let ctx = gsap.context(() => {
      // 1. Main Image Parallax (Slower movement)
      gsap.to(mainImg, {
        yPercent: 15, // Moves down slightly
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 2. Secondary Image Parallax (Faster movement - Creates Depth)
      gsap.fromTo(
        secImg,
        { yPercent: 50 }, // Starts lower
        {
          yPercent: -20, // Moves up significantly
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // 3. Text Reveal
      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
          },
        }
      );
    }, sectionRef); // Scope context for cleanup

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden py-20 lg:py-0 flex items-center"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Flex Container: Reverses on mobile (Text on top, images below) */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-12 lg:gap-0">
          
          {/* LEFT: Text Content */}
          <div ref={contentRef} className="w-full lg:w-5/12 z-10 order-1 lg:order-1 mb-10 lg:mb-0">
            <h4 className="text-xs md:text-sm font-medium tracking-[0.3em] text-gray-400 uppercase mb-4">
              About Our Vision
            </h4>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6">
              Creating art <br />
              from <span className="italic font-serif text-gray-300">chaos.</span>
            </h2>
            
            <div className="w-12 h-[1px] bg-white/30 my-8"></div>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md mb-8">
              “We capture emotions, moments and stories that last forever.” 
              Photography is more than a click; it's about finding the soul in the silence.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <h3 className="text-2xl font-bold">200+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Projects</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">5+</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Years</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">100%</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Creative</p>
              </div>
            </div>
            
            <button className="mt-10 group flex items-center gap-3 text-sm uppercase tracking-widest hover:text-gray-300 transition-colors">
              Know More
              <span className="block w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300"></span>
            </button>
          </div>

          {/* RIGHT: Image Composition (The "Stunning" Part) */}
          <div className="relative w-full lg:w-6/12 h-[50vh] md:h-[70vh] lg:h-[90vh] flex items-center justify-center order-2 lg:order-2">
            
            {/* 1. Main Background Image (Portrait) */}
            <div className="relative w-[85%] md:w-[70%] h-full overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-out">
              <div ref={mainImageRef} className="w-full h-[120%]">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop"
                  alt="Main Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 2. Secondary Overlapping Image (Detail/Action Shot) */}
            <div className="absolute bottom-[-10%] lg:bottom-[10%] left-0 lg:-left-[10%] w-[50%] md:w-[45%] aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border-4 border-[#0a0a0a]">
              <div ref={secondaryImageRef} className="w-full h-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
                  alt="Detail Shot"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                 {/* Small Overlay text on secondary image */}
                 <div className="absolute bottom-4 left-4 text-xs font-mono text-white/80 mix-blend-difference">
                    EST. 2020
                 </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;