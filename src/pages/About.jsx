import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Instagram, Twitter, Linkedin, Mail, ArrowUpRight, Hexagon, Lock, Unlock, Aperture } from 'lucide-react';

const AboutPage = () => {
  // --- 1. Custom Cursor Logic ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const cursorVariants = {
    default: { x: mousePosition.x - 12, y: mousePosition.y - 12, scale: 1 },
    hover: { x: mousePosition.x - 32, y: mousePosition.y - 32, height: 64, width: 64, mixBlendMode: "difference", backgroundColor: "white" }
  };

  // --- 2. Scroll Animations (The Timeline) ---
  // We track the progress of the HERO container specifically
  const heroRef = useRef(null); 
  const { scrollYProgress } = useScroll({ 
    target: heroRef,
    offset: ["start start", "end start"] // 0% is start of page, 100% is end of hero
  });

  // --- TIMELINE CONFIGURATION ---
  // 0%   -> 60% : Loading (Text Fixed, Lock Fills)
  // 60%  -> 70% : Unlocked (Green Color, Lock Icon Changes)
  // 70%  -> 80% : VIBRATION (Chaos)
  // 80%  -> 100%: SPLIT (Text flies apart, Lock vanishes)

  // 1. LOCK MECHANISM (0 - 60%)
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const ringColor = useTransform(scrollYProgress, [0, 0.6], ["#06b6d4", "#22c55e"]);
  const lockScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]); // Slight shrink on focus
  
  // Icon Switch (Happens precisely at 60%)
  const closedLockOpacity = useTransform(scrollYProgress, [0.59, 0.6], [1, 0]);
  const openLockOpacity = useTransform(scrollYProgress, [0.59, 0.6], [0, 1]);
  
  // Text Status (Focusing -> Unlocked)
  const loadingTextOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const successTextOpacity = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);


  // 2. VIBRATION (70% - 80%)
  // Notice: Input starts at 0.7, so before that, it is 0 (Fixed)
  const shakeX = useTransform(scrollYProgress, 
    [0, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8], 
    ["0px", "0px", "5px", "-5px", "10px", "-10px", "0px"]
  );
  const shakeY = useTransform(scrollYProgress, 
    [0, 0.7, 0.72, 0.74, 0.76, 0.78, 0.8], 
    ["0px", "0px", "-5px", "5px", "-10px", "10px", "0px"]
  );


  // 3. THE SPLIT (80% - 100%)
  // Before 0.8, the value is "0%", so the text is perfectly fixed.
  const splitUp = useTransform(scrollYProgress, [0.8, 1], ["0%", "-150%"]); 
  const splitDown = useTransform(scrollYProgress, [0.8, 1], ["0%", "150%"]);
  
  const splitRotateLeft = useTransform(scrollYProgress, [0.8, 1], [0, -15]);
  const splitRotateRight = useTransform(scrollYProgress, [0.8, 1], [0, 15]);


  // 4. CLEANUP (Removing elements before next section)
  // The Lock must disappear AS the split starts, so it's gone by the time we scroll past
  const lockContainerOpacity = useTransform(scrollYProgress, [0.75, 0.85], [1, 0]);
  
  // The Hero container fades out at the very end to avoid overlap
  const heroContainerOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);


  return (
    <div className="bg-[#050505] text-[#e0e0e0] min-h-screen cursor-none font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden perspective-1000">
      
      {/* Custom Cursor */}
      <motion.div 
        variants={cursorVariants}
        animate={hovered ? "hover" : "default"}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        className="fixed top-0 left-0 w-6 h-6 border border-white rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      >
        {!hovered && <div className="w-1 h-1 bg-white rounded-full" />}
        {hovered && <ArrowUpRight className="text-black w-6 h-6" />}
      </motion.div>

      {/* --- SECTION 1: HERO (Timeline Controller) --- */}
      {/* 400vh height ensures we have enough scroll room to finish animations */}
      <section ref={heroRef} className="relative h-[400vh] border-b border-white/10">
         
         {/* STICKY CONTAINER: This stays on screen while we scroll through the 400vh */}
         <motion.div 
            style={{ opacity: heroContainerOpacity }} // Fades out at the very end
            className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden"
         >
             
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10"></div>
                 <motion.div 
                    animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 5 }}
                    className="w-full h-[150%] absolute -top-[25%] left-0"
                    style={{ 
                        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                        backgroundSize: '100px 100px',
                        transform: 'perspective(500px) rotateX(60deg)'
                    }}
                 />
             </div>

             {/* MAIN CONTENT WRAPPER - This handles the Shake */}
             <motion.div 
                style={{ x: shakeX, y: shakeY }}
                className="relative z-20 flex flex-col items-center justify-center h-full w-full"
             >

                 {/* HEADLINES */}
                 <div className="text-center relative mb-24">
                    
                    {/* Top Text: Fixed until 80%, then splits UP */}
                    <motion.div
                        style={{ y: splitUp, rotate: splitRotateLeft }}
                    >
                        <h1 className="text-[12vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter text-white drop-shadow-2xl">
                            Beyond
                        </h1>
                    </motion.div>

                    {/* Bottom Text: Fixed until 80%, then splits DOWN */}
                    <motion.div
                        style={{ y: splitDown, rotate: splitRotateRight }}
                    >
                        <h1 className="text-[12vw] md:text-[9vw] leading-[0.8] font-black uppercase tracking-tighter text-gray-500">
                            The Frame
                        </h1>
                    </motion.div>

                 </div>

                 {/* --- LOCK MECHANISM --- */}
                 {/* Placed inside the vibrating container, but handled with its own opacity */}
                 <motion.div 
                    style={{ opacity: lockContainerOpacity }}
                    className="absolute bottom-20 left-0 w-full flex flex-col items-center justify-center mix-blend-screen pointer-events-none"
                 >
                    
                    {/* The Lens Container */}
                    <motion.div 
                        style={{ scale: lockScale }}
                        className="relative w-48 h-48 flex items-center justify-center"
                    >
                         {/* SVG Progress Ring */}
                         <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="#222" strokeWidth="1.5" fill="none" strokeDasharray="2 4" />
                            <motion.circle 
                                cx="50" cy="50" r="45" stroke="#06b6d4" strokeWidth="2.5" fill="none" strokeLinecap="round"
                                style={{ pathLength: pathLength, stroke: ringColor }}
                            />
                         </svg>

                         {/* Icons */}
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                            <motion.div style={{ opacity: closedLockOpacity }} className="absolute text-cyan-500 flex items-center justify-center">
                                <Lock size={48} strokeWidth={1.5} />
                            </motion.div>
                            <motion.div style={{ opacity: openLockOpacity }} className="absolute text-green-500 flex items-center justify-center">
                                <Unlock size={56} strokeWidth={1.5} />
                            </motion.div>
                        </div>
                        
                        <div className="absolute inset-2 w-auto h-auto animate-spin-slow opacity-10 border border-dotted border-white rounded-full"></div>
                    </motion.div>

                    {/* Status Text */}
                    <div className="mt-2 font-mono text-xs tracking-[0.3em] font-bold h-6 relative w-full text-center">
                        <motion.div style={{ opacity: loadingTextOpacity }} className="absolute inset-0 text-cyan-500 flex items-center justify-center gap-2">
                            <Aperture size={14} className="animate-spin" />
                            <span>FOCUSING...</span>
                        </motion.div>
                        <motion.div style={{ opacity: successTextOpacity }} className="absolute inset-0 text-green-500 flex items-center justify-center gap-2">
                             <span>UNLOCKED</span>
                        </motion.div>
                    </div>

                 </motion.div>

             </motion.div>
         </motion.div>
      </section>


      {/* --- SECTION 2: THE OPERATOR --- */}
      {/* This section sits naturally below the 400vh hero. It will only appear when Hero is done. */}
      {/* Added z-30 and background to ensure it covers any remnants if they exist */}
      <section className="relative z-30 bg-[#050505] min-h-screen flex items-center"> 
        <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            
            {/* LEFT: 3D TILT CARD */}
            <div className="relative flex justify-center perspective-1000">
                <TiltCard>
                    <div className="relative w-[85vw] md:w-[400px] h-[500px] bg-[#0a0a0a] border border-white/20 group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20 mix-blend-difference text-white">
                            <Hexagon size={20} className="animate-spin-slow" />
                            <span className="font-mono text-xs">ID: RINSHAD_01</span>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&grayscale" 
                            alt="Rinshad"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <h2 className="text-4xl font-black uppercase italic">Rinshad</h2>
                            <p className="font-mono text-cyan-500 text-sm mt-1">/// VISUAL_DIRECTOR</p>
                        </div>
                    </div>
                </TiltCard>
                <div className="absolute -z-10 top-10 -left-10 w-full h-full border border-dashed border-white/10 hidden md:block"></div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="flex flex-col gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-500"></div>
                        <h3 className="font-mono text-sm tracking-widest text-gray-500">THE_NARRATIVE</h3>
                    </div>
                    <p className="text-2xl md:text-4xl font-light leading-tight text-gray-200">
                        "I don't capture moments; I <span className="italic font-serif text-cyan-500">distort</span> them until they tell the truth."
                    </p>
                    <p className="text-gray-400 leading-relaxed max-w-md">
                        Based in <b className="text-white">Kerala</b>. Specializing in high-contrast editorial and automotive visuals. My work exists in the glitch between traditional composition and digital chaos.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                      <SocialButton icon={<Instagram/>} label="IG" />
                      <SocialButton icon={<Twitter/>} label="X" />
                      <SocialButton icon={<Linkedin/>} label="IN" />
                      <SocialButton icon={<Mail/>} label="MAIL" />
                </div>
            </div>
        </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <div className="py-10 border-y border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden relative z-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
          <motion.div 
             className="flex gap-16 whitespace-nowrap text-6xl md:text-8xl font-black text-white/5 uppercase select-none"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          >
              <span>Vision</span> <span>•</span> <span>Chaos</span> <span>•</span> <span>Control</span> <span>•</span> <span>Vision</span> <span>•</span> <span>Chaos</span> <span>•</span> <span>Control</span>
          </motion.div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="p-10 md:p-20 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative z-20">
         <div className="text-sm font-mono text-gray-600">
            <p className="text-white mb-2 font-bold">VNX / WEBWORKS</p>
            <p>Veliancode, Kerala</p>
         </div>
         <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="group p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
            <ArrowDown className="rotate-180 group-hover:-translate-y-1 transition-transform" />
         </button>
      </footer>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const TiltCard = ({ children }) => {
    const x = useSpring(0, { stiffness: 150, damping: 20 });
    const y = useSpring(0, { stiffness: 150, damping: 20 });
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct * 20); y.set(yPct * -20);
    };
    return (
        <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => {x.set(0); y.set(0)}} style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d" }} className="relative cursor-pointer">
            <div style={{ transform: "translateZ(50px)" }}>{children}</div>
        </motion.div>
    );
};

const SocialButton = ({ icon, label }) => (
    <a href="#" className="flex items-center gap-3 p-4 border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span className="font-mono text-sm tracking-widest">{label}</span>
    </a>
);

export default AboutPage;