import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CinematicCTA = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);

  // Parallax effect for background video
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Video moves slightly slower for depth
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Text reveal animation variants
  const textVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  // --- MAGNETIC BUTTON EFFECT ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3;
    const y = (e.clientY - (top + height / 2)) * 0.3;
    buttonRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    buttonRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#0a0a0a]">
        
      {/* --- 1. CINEMATIC VIDEO BACKGROUND (Parallax) --- */}
      <div className="absolute inset-0 z-0 w-full h-[120%] -top-[10%] overflow-hidden">
         <motion.div style={{ y }} className="w-full h-full">
             <video 
                src="/vid.mp4" // YOUR VIDEO URL
                className="w-full h-full object-cover grayscale brightness-[0.3] scale-105"
                autoPlay muted loop playsInline
             />
         </motion.div>
         {/* Gradient Overlay for seamless blending */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10"></div>
         <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* --- 2. CONTENT --- */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Small Tagline */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3 border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm"
        >
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-300">Open for Bookings</span>
        </motion.div>

        {/* GIANT TEXT (Responsive VW Units) */}
        <h2 className="flex flex-col items-center font-black text-white uppercase tracking-tighter leading-[0.85]">
            {/* Line 1 */}
            <div className="overflow-hidden">
                <motion.span 
                    custom={0} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="block text-[12vw] md:text-[10vw]"
                >
                    Ready to
                </motion.span>
            </div>
            
            {/* Line 2 (Outlined / Gradient Style) */}
            <div className="overflow-hidden">
                <motion.span 
                    custom={1} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="block text-[12vw] md:text-[10vw] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600"
                >
                    Capture
                </motion.span>
            </div>

            {/* Line 3 */}
            <div className="overflow-hidden">
                <motion.span 
                    custom={2} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="block text-[12vw] md:text-[10vw]"
                >
                    The Story?
                </motion.span>
            </div>
        </h2>
        
        {/* MAGNETIC BUTTON */}
        <div 
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mt-12 md:mt-16 transition-transform duration-300 ease-out"
        >
            <a 
                href="/contact" 
                className="group relative flex items-center justify-center gap-4 px-10 py-6 md:px-14 md:py-8 bg-white text-black rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
            >
                {/* Button Hover Fill (Green/Teal like screenshot) */}
                <div className="absolute inset-0 bg-[#00e599] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] z-0"></div>
                
                <span className="relative z-10 text-lg md:text-xl font-bold uppercase tracking-widest group-hover:text-black transition-colors">
                    Book Now
                </span>
                <ArrowUpRight size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
        </div>

      </div>

    </section>
  );
};

export default CinematicCTA;