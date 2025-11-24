import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Camera,
  Car,
  Utensils,
  Clapperboard,
  Calendar,
  X
} from "lucide-react";

// --- IMAGE ---
import lensImg from "/cam_img.png";
// Fallback if local image is missing
const fallbackImg = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const SERVICES_DATA = [
  // INNER RING (2 Items)
  {
    id: "wedding",
    title: "Weddings",
    ring: "inner",
    icon: <Camera size={24} />,
    color: "#ec4899", // Pink
    items: ["Photography", "Videography", "Candid", "Highlights", "Pre-wedding"]
  },
  {
    id: "monthly",
    title: "Monthly Pkg",
    ring: "inner",
    icon: <Calendar size={24} />,
    color: "#06b6d4", // Cyan
    items: ["Content Reels", "Posters", "Social Media", "Page Handling"]
  },
  // OUTER RING (3 Items)
  {
    id: "food",
    title: "Food Vlogs",
    ring: "outer",
    icon: <Utensils size={24} />,
    color: "#f59e0b", // Amber
    items: ["Food Photos", "Reels", "Creative Videos", "Transitions"]
  },
  {
    id: "automotive",
    title: "Automotive",
    ring: "outer",
    icon: <Car size={24} />,
    color: "#ef4444", // Red
    items: ["Revealing", "On-road", "Off-roading", "Cinematic"]
  },
  {
    id: "production",
    title: "Production",
    ring: "outer",
    icon: <Clapperboard size={24} />,
    color: "#8b5cf6", // Violet
    items: ["Perfumes", "Cosmetics", "Jewelry", "Commercials"]
  }
];

// --- POPUP CARD ---
const ServicePopup = ({ activeService, onClose }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!activeService) return;

    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    )
      .fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
        "-=0.3"
      );

  }, { dependencies: [activeService] });

  if (!activeService) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        ref={containerRef}
        className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: `0 0 40px ${activeService.color}20` }}
      >
        {/* Decorative Glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-40 pointer-events-none"
          style={{ backgroundColor: activeService.color }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-40 pointer-events-none"
          style={{ backgroundColor: activeService.color }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div ref={contentRef} className="flex flex-col items-center text-center relative z-10">
          <div
            className="p-5 rounded-2xl mb-6 text-white shadow-lg transform transition-transform hover:scale-105"
            style={{
              backgroundColor: activeService.color,
              boxShadow: `0 10px 30px -10px ${activeService.color}`
            }}
          >
            {React.cloneElement(activeService.icon, { size: 32 })}
          </div>

          <h3 className="text-3xl font-bold text-white mb-2">
            {activeService.title}
          </h3>

          <div className="w-12 h-1 rounded-full mb-6 opacity-50" style={{ backgroundColor: activeService.color }} />

          <div className="flex flex-wrap justify-center gap-2 w-full">
            {activeService.items.map((item, idx) => (
              <span
                key={idx}
                className="text-sm px-4 py-2 rounded-lg text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ORBIT RING ---
const OrbitRing = ({ items, radius, duration, reverse, onSelect }) => {
  return (
    <div
      className="orbit-ring-container absolute rounded-full border border-dashed border-white/10 flex items-center justify-center pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        "--duration": `${duration}s`,
        "--direction": reverse ? 'reverse' : 'normal',
        "--counter-direction": reverse ? 'normal' : 'reverse'
      }}
    >
      {items.map((item, index) => {
        const angle = (index / items.length) * 360;
        // Initial position on the ring
        const transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;

        return (
          <div
            key={item.id}
            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
            style={{ transform: transform }}
          >
            {/* Counter-rotating container */}
            <div
              className="orbit-item flex flex-col items-center justify-center cursor-pointer group pointer-events-auto"
              onClick={() => onSelect(item)}
            >
              {/* Icon Circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--color)]"
                style={{
                  '--color': item.color,
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                <div className="text-white/70 group-hover:text-[var(--color)] transition-colors duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Label */}
              <span
                className="mt-3 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5 transition-all duration-300 group-hover:text-white group-hover:bg-[var(--color)] group-hover:border-[var(--color)]"
                style={{ '--color': item.color }}
              >
                {item.title}
              </span>

              {/* Hover Glow Effect via CSS */}
              <style jsx>{`
                .group:hover .w-16 {
                  box-shadow: 0 0 30px var(--color);
                }
              `}</style>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
const Service = () => {
  const wrapperRef = useRef(null);
  const cameraRef = useRef(null);
  const bgTextRef = useRef(null);
  const orbitContainerRef = useRef(null);

  const [activeService, setActiveService] = useState(null);

  const innerItems = SERVICES_DATA.filter(i => i.ring === "inner");
  const outerItems = SERVICES_DATA.filter(i => i.ring === "outer");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // 1. Zoom Camera & Fade Text
    tl.to(cameraRef.current, {
      scale: 50,
      rotation: 180,
      duration: 2,
      ease: "power2.inOut",
      transformOrigin: "center center",
    })
      .to(bgTextRef.current, {
        opacity: 0,
        scale: 1.5,
        duration: 1
      }, "<")

      // 2. Hide Camera & Reveal Orbit System
      .to(cameraRef.current, {
        autoAlpha: 0,
        duration: 0.1
      }, ">-0.5")
      .fromTo(orbitContainerRef.current,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out" }
      );

  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center font-['Inter',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

        /* --- ROTATION ANIMATIONS --- */
        @keyframes rotate-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .orbit-ring-container {
          animation: rotate-ring var(--duration) linear infinite var(--direction);
        }
        
        /* Counter-rotate items so they stand still vertically */
        .orbit-item {
          animation: rotate-ring var(--duration) linear infinite var(--counter-direction);
        }

        /* --- HOVER PAUSE LOGIC --- */
        .orbit-ring-container:hover,
        .orbit-item:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* BACKGROUND TEXT */}
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[15vw] font-black text-white/5 uppercase tracking-tighter leading-[0.8] text-center">
          VYNX<br />WEBWORKS
        </h1>
      </div>

      {/* CAMERA LENS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <img
          ref={cameraRef}
          src={lensImg || fallbackImg}
          alt="Camera Lens"
          className="w-[600px] h-[600px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* ORBIT SYSTEM */}
      <div
        ref={orbitContainerRef}
        className="orbit-system relative w-full h-full flex items-center justify-center opacity-0 z-20"
      >
        {/* Modal */}
        <ServicePopup
          activeService={activeService}
          onClose={() => setActiveService(null)}
        />

        {/* Rings Container - Fades out when modal is active */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${activeService ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          {/* Center Branding */}
          <div className="absolute z-0 text-center opacity-20 pointer-events-none">
            <h2 className="text-5xl font-black text-white tracking-tighter">VYNX</h2>
          </div>

          {/* INNER RING - Clockwise */}
          <OrbitRing
            items={innerItems}
            radius={140}
            duration={25}
            reverse={false}
            onSelect={setActiveService}
          />

          {/* OUTER RING - Counter-Clockwise */}
          <OrbitRing
            items={outerItems}
            radius={250}
            duration={40}
            reverse={true}
            onSelect={setActiveService}
          />
        </div>
      </div>
    </section>
  );
};

export default Service;
