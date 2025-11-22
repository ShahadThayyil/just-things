import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- IMAGE (DO NOT CHANGE) ---
import lensImg from "/cam_img.png"; 
const fallbackImg = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop";

gsap.registerPlugin(ScrollTrigger);

// --- ORBIT COMPONENT ---
const OrbitingCircles = ({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}) => {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-white/10 stroke-1" 
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        style={{
          "--duration": duration,
          "--radius": radius,
          "--delay": -delay,
        }}
        className={cn(
          "absolute flex transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]",
          { "[animation-direction:reverse]": reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

// --- UPDATED SERVICES DATA (With Images) ---
const services = [
  // Inner Ring
  { 
    id: 1, 
    title: "Weddings", 
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300" 
  },
  { 
    id: 2, 
    title: "Automotive", 
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=300" 
  },
  { 
    id: 3, 
    title: "Real Estate", 
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=300" 
  },
  // Outer Ring
  { 
    id: 4, 
    title: "Corporate", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300" 
  },
  { 
    id: 5, 
    title: "Fashion", 
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=300" 
  },
  { 
    id: 6, 
    title: "Food Vlogs", 
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300" 
  },
];

const Service = () => {
  const wrapperRef = useRef(null);
  const cameraRef = useRef(null);
  const overlayRef = useRef(null);
  const bgTextRef = useRef(null);
  const orbitContainerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=350%", // Fast zoom
        scrub: 1,
        pin: true,
      },
    });

    tl
    // 1. Zoom
    .to(cameraRef.current, {
      scale: 60,
      rotation: 180,
      duration: 2,
      ease: "power2.inOut",
      transformOrigin: "center center",
    })
    // 2. Background Text
    .to(bgTextRef.current, {
      scale: 5,
      opacity: 0,
      duration: 1.5,
      ease: "power2.in"
    }, "<")
    // 3. Dark Overlay
    .to(overlayRef.current, { opacity: 1, duration: 1.5 }, "<")
    
    // 4. Orbit Reveal
    .to(orbitContainerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=1");

  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} className="service-section-wrapper">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

        .service-section-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #050505;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          z-index: 1; 
        }

        /* ANIMATION */
        @keyframes orbit {
          0% { transform: rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg); }
        }
        .animate-orbit { animation: orbit calc(var(--duration)*1s) linear infinite; }

        /* TYPOGRAPHY */
        .bg-text-container {
          position: absolute; width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center; pointer-events: none;
        }
        .bg-text {
          font-size: 18vw; font-weight: 800; color: rgba(255, 255, 255, 0.05);
          text-transform: uppercase; letter-spacing: -5px; line-height: 0.8; text-align: center;
        }

        /* LENS OVERLAY */
        .lens-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: #000; opacity: 0; z-index: 5; pointer-events: none;
        }
        .camera-container {
          position: relative; width: 100%; height: 100%;
          display: flex; justify-content: center; align-items: center; z-index: 2; 
        }
        .camera-img {
          width: 650px; height: 650px; object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.9));
          will-change: transform;
        }

        /* ORBIT CONTAINER */
        .orbit-system-wrapper {
          position: absolute; width: 100%; height: 100%; top: 0; left: 0;
          display: flex; justify-content: center; align-items: center;
          z-index: 10; opacity: 0; transform: scale(0.8);
        }

        /* --- MODERN ROUND CARD STYLES --- */
        .orbit-card {
            position: relative;
            width: 110px;
            height: 110px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            cursor: pointer;
            transition: transform 0.3s ease, border-color 0.3s;
        }
        .orbit-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        /* Dark gradient overlay so text is visible */
        .orbit-card-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.1));
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding-bottom: 15px;
        }
        .orbit-title {
            font-size: 10px;
            font-weight: 600;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            z-index: 2;
        }

        /* HOVER EFFECTS */
        .orbit-card:hover {
            transform: scale(1.2);
            border-color: #00d2ff;
            z-index: 20;
        }
        .orbit-card:hover img {
            transform: scale(1.1);
        }

        /* CORNER INFO */
        .corner-info {
          position: absolute; color: #666; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; z-index: 4; 
        }
        .top-left { top: 40px; left: 40px; }
        .top-right { top: 40px; right: 40px; text-align: right; }
        .bottom-center { bottom: 40px; animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

        /* MOBILE */
        @media (max-width: 768px) {
          .camera-img { width: 350px; height: 350px; }
          .bg-text { font-size: 25vw; }
          .orbit-card { width: 80px; height: 80px; }
          .orbit-title { font-size: 8px; padding-bottom: 10px; }
        }
      `}</style>

      <div ref={bgTextRef} className="bg-text-container">
         <h1 className="bg-text">OUR<br/>SERVICES</h1>
      </div>

      <div className="corner-info top-left">VYNX WEBWORKS ®</div>
      <div className="corner-info top-right">EST. 2025<br/>KERALA, INDIA</div>
      <div className="corner-info bottom-center">SCROLL TO ZOOM</div>

      <div ref={overlayRef} className="lens-overlay"></div>

      <div className="camera-container">
          <img 
              ref={cameraRef} 
              src={lensImg || fallbackImg} 
              alt="Camera Lens" 
              className="camera-img" 
          />
      </div>

      {/* ORBIT SYSTEM */}
      <div ref={orbitContainerRef} className="orbit-system-wrapper">
          <div className="relative flex h-[600px] w-full flex-col items-center justify-center">
            
            {/* INNER RING (Radius 140) */}
            <OrbitingCircles radius={140} duration={20} delay={0} className="border-none bg-transparent">
                <div className="orbit-card">
                    <img src={services[0].img} alt={services[0].title} />
                    <div className="orbit-card-overlay">
                        <span className="orbit-title">{services[0].title}</span>
                    </div>
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={140} duration={20} delay={6.6} className="border-none bg-transparent">
                <div className="orbit-card">
                    <img src={services[1].img} alt={services[1].title} />
                     <div className="orbit-card-overlay">
                        <span className="orbit-title">{services[1].title}</span>
                    </div>
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={140} duration={20} delay={13.3} className="border-none bg-transparent">
                <div className="orbit-card">
                    <img src={services[2].img} alt={services[2].title} />
                     <div className="orbit-card-overlay">
                        <span className="orbit-title">{services[2].title}</span>
                    </div>
                </div>
            </OrbitingCircles>


            {/* OUTER RING (Radius 260) - Reverse Direction */}
            <OrbitingCircles radius={260} duration={30} delay={0} reverse className="border-none bg-transparent">
                <div className="orbit-card">
                    <img src={services[3].img} alt={services[3].title} />
                     <div className="orbit-card-overlay">
                        <span className="orbit-title">{services[3].title}</span>
                    </div>
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={260} duration={30} delay={10} reverse className="border-none bg-transparent">
                 <div className="orbit-card">
                    <img src={services[4].img} alt={services[4].title} />
                     <div className="orbit-card-overlay">
                        <span className="orbit-title">{services[4].title}</span>
                    </div>
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={260} duration={30} delay={20} reverse className="border-none bg-transparent">
                 <div className="orbit-card">
                    <img src={services[5].img} alt={services[5].title} />
                     <div className="orbit-card-overlay">
                        <span className="orbit-title">{services[5].title}</span>
                    </div>
                </div>
            </OrbitingCircles>

          </div>
      </div>

    </section>
  );
};

export default Service;