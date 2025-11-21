import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clapperboard, Wand2, Plane, Moon, Film, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Cinematic Edits",
    icon: <Clapperboard size={20} />,
    img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000&auto=format&fit=crop",
    desc: "Storytelling",
  },
  {
    title: "Retouching",
    icon: <Wand2 size={20} />,
    img: "https://images.unsplash.com/photo-1620406664202-6e993c550d22?q=80&w=1000&auto=format&fit=crop",
    desc: "High-end Skin",
  },
  {
    title: "Drone Shots",
    icon: <Plane size={20} />,
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop",
    desc: "Sky Visuals",
  },
  {
    title: "Night Mode",
    icon: <Moon size={20} />,
    img: "https://images.unsplash.com/photo-1516893842880-5d8aafa7cc4a?q=80&w=1000&auto=format&fit=crop",
    desc: "Low Light",
  },
  {
    title: "Reels",
    icon: <Film size={20} />,
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    desc: "Viral Format",
  },
  {
    title: "Pro Gear",
    icon: <Settings size={20} />,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    desc: "Sony / RED",
  },
];

const ServicesSection = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const items = gridRef.current.children;
    
    // Animation
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section className="bg-[#0a0a0a] text-white py-16 px-4 md:py-24 md:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 px-2">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight">
            Content <span className="text-gray-500">Stack.</span>
          </h2>
          <p className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-widest mt-2 md:mt-0">
            [ Services ]
          </p>
        </div>

        {/* The Compact Grid */}
        <div 
            ref={gridRef} 
            className="grid grid-cols-2 lg:grid-cols-3 border-l border-t border-white/10"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative border-r border-b border-white/10 h-[160px] md:h-[300px] overflow-hidden cursor-pointer"
            >
              
              {/* Background Image Logic Changed Here: */}
              {/* Mobile: opacity-100 (Always Visible) */}
              {/* Desktop: opacity-0 -> hover:opacity-100 */}
              <div className="absolute inset-0 z-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-out">
                 <img 
                    src={service.img} 
                    alt={service.title} 
                    // Mobile: scale-100 (Normal), Desktop: scale-110 -> 100 on hover
                    className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 scale-100 md:scale-110 md:group-hover:scale-100 transition-transform duration-700"
                 />
                 {/* Darker Overlay on Mobile (bg-black/60) for better text visibility */}
                 <div className="absolute inset-0 bg-black/60 md:bg-black/40"></div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-8 transition-colors duration-300">
                
                {/* Top: Icon & Number */}
                <div className="flex justify-between items-start">
                  <div className="p-2 md:p-3 bg-white/10 backdrop-blur-sm md:bg-white/5 rounded-full text-white md:text-gray-300 md:group-hover:bg-white md:group-hover:text-black transition-all duration-300">
                    {React.cloneElement(service.icon, { className: "w-4 h-4 md:w-6 md:h-6" })} 
                  </div>
                  <span className="font-mono text-[10px] md:text-xs text-gray-400 md:text-gray-600 group-hover:text-white/70">
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom: Text */}
                <div>
                  <h3 className="text-sm md:text-2xl font-semibold tracking-tight mb-1 md:group-hover:translate-x-2 transition-transform duration-300 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[10px] md:text-sm text-gray-400 md:text-gray-500 font-mono md:group-hover:text-gray-300 md:group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    {service.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;