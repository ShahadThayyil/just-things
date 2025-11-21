import React, { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Star, Quote } from "lucide-react";
import * as THREE from "three";

// --- 1. DATA ---
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Marketing Director @ Nike",
    quote: "The cinematic approach completely transformed our product launch. It wasn't just a video; it was an immersive experience.",
  },
  {
    id: 2,
    name: "David Miller",
    role: "CEO @ TechFlow",
    quote: "Minimalist, fast, and absolutely stunning. The 3D web components increased our user engagement metrics by over 40%.",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Founder @ Archizaid",
    quote: "Captured the essence of our architecture perfectly. The parallax effects are smooth as butter. Highly recommended.",
  },
  {
    id: 4,
    name: "Marcus Reid",
    role: "Creative Lead @ Spotify",
    quote: "A visual treat. The attention to detail in the animations and color grading is world-class. Feels like a movie.",
  },
  {
    id: 5,
    name: "Rinshad T",
    role: "Event Planner",
    quote: "Professionalism at its peak. The campaign materials were top-notch and delivered exactly on time.",
  }
];

// --- 2. THREE.JS BACKGROUND (FIXED) ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const objects = [];
    const particlesCount = 25; 

    // Geometries
    const frameGeo = new THREE.PlaneGeometry(2, 1.5);
    const apertureGeo = new THREE.RingGeometry(0.6, 0.8, 6); 
    
    // Materials
    const materialFrame = new THREE.MeshBasicMaterial({ 
        color: 0x555555, wireframe: true, transparent: true, opacity: 0.15 
    });
    const materialAperture = new THREE.MeshBasicMaterial({ 
        color: 0x00ff99, wireframe: true, transparent: true, opacity: 0.1 
    });

    for (let i = 0; i < particlesCount; i++) {
        const isAperture = i % 2 === 0;
        const mesh = new THREE.Mesh(isAperture ? apertureGeo : frameGeo, isAperture ? materialAperture : materialFrame);
        
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 15;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        const scale = Math.random() * 0.5 + 0.5;
        mesh.scale.set(scale, scale, scale);

        scene.add(mesh);
        objects.push({
            mesh,
            speedX: (Math.random() - 0.5) * 0.005,
            speedY: (Math.random() - 0.5) * 0.005,
            rotSpeed: (Math.random() - 0.5) * 0.005
        });
    }

    const animate = () => {
        requestAnimationFrame(animate);
        objects.forEach((obj) => {
            obj.mesh.position.x += obj.speedX;
            obj.mesh.position.y += obj.speedY;
            obj.mesh.rotation.x += obj.rotSpeed;
            obj.mesh.rotation.y += obj.rotSpeed;

            if (Math.abs(obj.mesh.position.y) > 12) obj.mesh.position.y *= -1;
            if (Math.abs(obj.mesh.position.x) > 12) obj.mesh.position.x *= -1;
        });
        camera.position.y = Math.sin(Date.now() * 0.0002) * 0.5;
        renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP (FIXED) ---
    return () => {
        window.removeEventListener("resize", handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        // Removed 'geometry.dispose()' which caused the error
        frameGeo.dispose();
        apertureGeo.dispose();
        materialFrame.dispose();
        materialAperture.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};


// --- 3. CARD COMPONENT ---
const Card = ({ i, description, author, role, progress, range, targetScale }) => {
  
  const smoothProgress = useSpring(progress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  });

  const scale = useTransform(smoothProgress, range, [1, targetScale]);
  const rotateX = useTransform(smoothProgress, range, ["0deg", "5deg"]);
  
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 perspective-1000">
      <motion.div
        style={{
          scale,
          rotateX,
          top: `calc(10vh + ${i * 40}px)`, 
        }}
        className="
            relative flex flex-col justify-between 
            min-h-[350px] h-auto md:h-[450px]
            w-[90vw] md:w-[800px] 
            rounded-[1.5rem] md:rounded-[2rem] 
            border border-white/20 border-t-white/40 border-l-white/30
            bg-[#1c1c1c]/90 
            backdrop-blur-2xl
            p-6 md:p-12 
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] 
            origin-top
            will-change-transform
        "
      >
        <div className="flex flex-col h-full justify-between text-left relative z-10">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
               <Quote className="h-4 w-4 md:h-6 md:w-6 text-gray-300 fill-current" />
            </div>
            <div className="flex gap-1 text-yellow-500">
                 {[...Array(5)].map((_, index) => (
                    <Star key={index} size={14} className="md:w-5 md:h-5" fill="currentColor" strokeWidth={0} />
                 ))}
            </div>
          </div>

          <p className="text-base md:text-3xl font-medium leading-relaxed text-gray-100 font-sans mb-6 md:mb-8 text-shadow-sm">
            "{description}"
          </p>

          <div className="flex flex-row items-center gap-3 md:gap-4 mt-auto border-t border-white/10 pt-4 md:pt-6">
               <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-white/20 to-black/50 border border-white/20 flex items-center justify-center text-white font-bold text-sm md:text-lg backdrop-blur-md">
                  {author.charAt(0)}
               </div>
               <div className="flex flex-col items-start">
                  <h4 className="text-sm md:text-lg font-bold text-white leading-tight">
                    {author}
                  </h4>
                  <span className="text-[10px] md:text-sm text-gray-400 uppercase tracking-wider font-mono mt-0.5 text-left">
                    {role}
                  </span>
               </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]"></div>
      </motion.div>
    </div>
  );
};

// --- 4. MAIN COMPONENT ---
export default function ScrollTestimonials() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-[#0a0a0a] relative w-full pt-20">
        
        {/* --- FIXED BACKGROUND LAYER --- */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ThreeBackground />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10"></div>
            </div>
        </div>

        {/* Header */}
        <div className="px-6 text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 mb-4 bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-300">Trusted By</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                What They <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Say.</span>
            </h2>
        </div>

      {/* The Stacking Container */}
      <div ref={container} className="relative pb-[20vh] z-10">
        {testimonials.map((project, i) => {
          const targetScale = 1 - (testimonials.length - i) * 0.05;
          
          return (
            <Card
              key={i}
              i={i}
              description={project.quote}
              author={project.name}
              role={project.role}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      
    </section>
  );
}