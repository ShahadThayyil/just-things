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

// --- 2. THREE.JS BACKGROUND (MODERN 2025 VERSION) ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.035); 

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const objects = [];
    const particlesCount = 40; 

    const geometries = [
        new THREE.PlaneGeometry(1.5, 1.5),
        new THREE.RingGeometry(0.5, 0.7, 4),
        new THREE.IcosahedronGeometry(0.7, 0),
        new THREE.TorusGeometry(0.6, 0.2, 8, 16)
    ];
    
    const materialWire = new THREE.MeshBasicMaterial({ 
        color: 0x444444, wireframe: true, transparent: true, opacity: 0.1 
    });
    const materialAccent = new THREE.MeshBasicMaterial({ 
        color: 0x00ff99, wireframe: true, transparent: true, opacity: 0.08 
    });

    for (let i = 0; i < particlesCount; i++) {
        const randomGeoIndex = Math.floor(Math.random() * geometries.length);
        const geometry = geometries[randomGeoIndex];
        const material = Math.random() > 0.75 ? materialAccent : materialWire;

        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 25;
        mesh.position.y = (Math.random() - 0.5) * 25;
        mesh.position.z = (Math.random() - 0.5) * 20;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        const scale = Math.random() * 0.5 + 0.5;
        mesh.scale.set(scale, scale, scale);

        scene.add(mesh);
        objects.push({
            mesh,
            speedX: (Math.random() - 0.5) * 0.008,
            speedY: (Math.random() - 0.5) * 0.008,
            rotSpeed: (Math.random() - 0.5) * 0.006
        });
    }

    const animate = () => {
        requestAnimationFrame(animate);
        objects.forEach((obj) => {
            obj.mesh.position.x += obj.speedX;
            obj.mesh.position.y += obj.speedY;
            obj.mesh.rotation.x += obj.rotSpeed;
            obj.mesh.rotation.y += obj.rotSpeed;

            if (Math.abs(obj.mesh.position.y) > 15) obj.mesh.position.y *= -1;
            if (Math.abs(obj.mesh.position.x) > 15) obj.mesh.position.x *= -1;
        });
        
        camera.position.y = Math.sin(Date.now() * 0.0001) * 0.2;
        camera.rotation.z = Math.cos(Date.now() * 0.0001) * 0.02;
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

    return () => {
        window.removeEventListener("resize", handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometries.forEach(g => g.dispose());
        materialWire.dispose();
        materialAccent.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full absolute top-0 left-0 z-0" />;
};


// --- 3. CARD COMPONENT (RESTORED STACKING LOGIC) ---
const Card = ({ i, description, author, role, progress, range, targetScale }) => {
  
  const smoothProgress = useSpring(progress, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  });

  const scale = useTransform(smoothProgress, range, [1, targetScale]);
  const rotateX = useTransform(smoothProgress, range, ["0deg", "5deg"]);
  
  return (
    // IMPORTANT: This container MUST be 'sticky top-0' and 'h-screen' for the stacking to work
    <div className="h-screen flex items-center justify-center sticky top-0 perspective-1000">
      <motion.div
        style={{
          scale,
          rotateX,
          // This top calculation ensures each subsequent card sits slightly lower, creating the "stack" look
          top: `calc(10vh + ${i * 40}px)`, 
        }}
        className="
            relative flex flex-col justify-between 
            min-h-[350px] h-auto md:h-[450px]
            w-[90vw] md:w-[800px] 
            rounded-[1.5rem] md:rounded-[2rem] 
            
            /* Glassmorphism Styles */
            bg-gradient-to-br from-white/10 via-white/5 to-transparent
            backdrop-blur-xl
            border border-white/20 border-t-white/30 border-l-white/20
            shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(255,255,255,0.02)]
            
            p-6 md:p-10
            origin-top
            will-change-transform
            overflow-hidden
        "
      >
        {/* Glossy Reflection Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0"></div>

        <div className="flex flex-col h-full justify-between text-left relative z-10">
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm group">
               <Quote className="h-4 w-4 md:h-6 md:w-6 text-gray-300 fill-current group-hover:text-[#00ff99] transition-colors" />
            </div>
            <div className="flex gap-1 text-yellow-500/90">
                 {[...Array(5)].map((_, index) => (
                    <Star key={index} size={14} className="md:w-5 md:h-5 drop-shadow-lg" fill="currentColor" strokeWidth={0} />
                 ))}
            </div>
          </div>

          <p className="text-base md:text-2xl lg:text-3xl font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 font-sans mb-6">
            "{description}"
          </p>

          <div className="flex flex-row items-center gap-3 md:gap-4 mt-auto border-t border-white/10 pt-4">
               <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-white/20 to-black/50 border border-white/20 flex items-center justify-center text-white font-bold text-sm md:text-lg backdrop-blur-md shadow-inner">
                  {author.charAt(0)}
               </div>
               <div className="flex flex-col items-start">
                  <h4 className="text-sm md:text-lg font-bold text-white leading-tight">
                    {author}
                  </h4>
                  <span className="text-[10px] md:text-xs text-[#00ff99] uppercase tracking-wider font-mono mt-0.5 text-left">
                    {role}
                  </span>
               </div>
          </div>
        </div>
        
        {/* Decorative Blur Blob inside card */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#00ff99]/10 blur-[80px] rounded-full pointer-events-none"></div>
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
    <section className="bg-[#050505] relative w-full pt-20">
        
        {/* --- BACKGROUND LAYERS (Z-index 0) --- */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* The sticky wrapper for background makes sure it stays while we scroll the cards */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px]"></div>
                
                <ThreeBackground />

                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10"></div>
                
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
            </div>
        </div>

        {/* Header - (Z-index 10) */}
        <div className="px-6 text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <span className="w-2 h-2 rounded-full bg-[#00ff99] animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-300">Trusted By Industry Leaders</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
               Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff99] to-emerald-600">Stories</span>
            </h2>
        </div>

      {/* The Stacking Container - (Z-index 10) */}
      {/* IMPORTANT: ref={container} tracks the scroll for the stacking effect */}
      <div ref={container} className="relative z-10">
        {testimonials.map((project, i) => {
          // Logic to make previous cards scale down slightly as new ones arrive
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
      
      {/* Extra space at bottom to ensure full scroll */}
      <div className="h-[10vh]"></div> 
    </section>
  );
}