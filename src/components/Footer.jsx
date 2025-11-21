import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Twitter, Linkedin, ArrowUpRight, Mail, Phone, MapPin, Globe, Copyright } from "lucide-react";

const ModernFooter = () => {
  const footerRef = useRef(null);
  
  // 1. SCROLL PROGRESS TRACKING
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  // 2. PARALLAX ANIMATIONS
  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVars = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-[#050505] text-white pt-0 overflow-hidden">
      
      {/* --- 1. SCROLL-DRIVEN MARQUEE STRIP --- */}
      <div className="bg-[#00e599] py-4 overflow-hidden flex items-center relative z-10 border-y border-black">
        <motion.div style={{ x }} className="flex whitespace-nowrap">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="flex items-center mx-4 md:mx-8">
                    <span className="text-black font-black uppercase tracking-widest text-sm md:text-lg">Let's Work Together</span>
                    <span className="w-2 h-2 bg-black rounded-full ml-4 md:ml-8"></span>
                </div>
            ))}
        </motion.div>
      </div>

      {/* --- 2. MAIN CONTENT --- */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 md:px-20 pt-16 md:pt-24 pb-10"
      >
        
        {/* TOP SECTION: CTA & Button */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-12 mb-12 md:pb-16 md:mb-16">
            <motion.div variants={itemVars} className="w-full md:w-2/3">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-left">
                    Have an <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Idea?</span>
                </h2>
            </motion.div>
            
            <motion.div variants={itemVars} className="w-full md:w-auto mt-6 md:mt-0 flex justify-start md:justify-end">
                <a href="mailto:hello@vynx.com" className="group relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:scale-110 transition-all duration-500">
                    <span className="relative z-10 text-xs md:text-sm font-bold uppercase tracking-widest group-hover:text-black transition-colors">Email Us</span>
                    <ArrowUpRight className="absolute text-white group-hover:text-black group-hover:translate-x-8 group-hover:-translate-y-8 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </a>
            </motion.div>
        </div>

        {/* MIDDLE SECTION: Grid Layout */}
        {/* Updated: text-left everywhere, items-start everywhere */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16 md:mb-20 text-left">
            
            {/* Column 1: Brand */}
            <motion.div variants={itemVars} className="col-span-1 md:col-span-1 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4 text-[#00e599]">
                    <Globe size={24} />
                    <span className="font-bold tracking-widest uppercase">Vynx</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Crafting digital experiences that blend aesthetics with functionality. Based in Kerala.
                </p>
            </motion.div>

            {/* Column 2: Links */}
            <motion.div variants={itemVars}>
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Sitemap</h4>
                <ul className="space-y-3 md:space-y-4 flex flex-col items-start">
                    {['Home', 'Portfolio', 'Services', 'About'].map((link) => (
                        <li key={link}>
                            <a href="#" className="text-base md:text-lg font-medium hover:text-[#00e599] transition-colors inline-flex items-center gap-2 group">
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Column 3: Socials */}
            <motion.div variants={itemVars}>
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Socials</h4>
                <ul className="space-y-3 md:space-y-4 flex flex-col items-start">
                    {[
                        { name: 'Instagram', icon: <Instagram size={18}/> },
                        { name: 'LinkedIn', icon: <Linkedin size={18}/> },
                        { name: 'Twitter', icon: <Twitter size={18}/> }
                    ].map((item) => (
                        <li key={item.name}>
                            <a href="#" className="text-base md:text-lg font-medium hover:text-[#00e599] transition-colors flex items-center gap-3">
                                {item.icon}
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Column 4: Contact Info */}
            <motion.div variants={itemVars} className="flex flex-col items-start">
                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 md:mb-6">Contact</h4>
                <div className="space-y-4 text-left">
                    <div className="flex flex-col md:flex-row items-start md:items-start gap-2 md:gap-3">
                        <MapPin className="shrink-0 text-gray-500" size={18} />
                        <p className="text-gray-300 text-sm">
                            NH 66, Tirur, Kerala
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-start gap-2 md:gap-3">
                        <Phone className="shrink-0 text-gray-500" size={18} />
                        <p className="text-gray-300 text-sm">+91 98765 43210</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-start gap-2 md:gap-3">
                        <Mail className="shrink-0 text-gray-500" size={18} />
                        <p className="text-gray-300 text-sm">hello@vynx.com</p>
                    </div>
                </div>
            </motion.div>

        </div>

        {/* BOTTOM: Big Typography & Copyright */}
        <motion.div 
            variants={itemVars} 
            className="border-t border-white/10 pt-10 md:pt-10 flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-6 md:gap-0"
        >
            
            {/* Copyright - Left aligned on mobile */}
            <div className="flex flex-col items-start gap-2 text-gray-500 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-2 md:mb-6 justify-center ">
                <div className="flex items-center gap-1 ">
    <Copyright size={12} />
    <span>{new Date().getFullYear()} JUST-THINGS.</span>
</div>
                <span>All Rights Reserved.</span>
            </div>

            {/* Big Brand Name */}
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.75] font-black text-[#1a1a1a] select-none hover:text-[#2a2a2a] transition-colors text-left md:text-right w-full md:w-auto">
                JUST THINGS.
            </h1>
            
        </motion.div>

      </motion.div>
      
      {/* Background Grain Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    </footer>
  );
};

export default ModernFooter;