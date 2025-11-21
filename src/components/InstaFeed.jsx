import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { Instagram, ArrowUpRight } from "lucide-react";

// --- DATA ---
const videos = [
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/1/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/2/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/3/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/4/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/5/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/6/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/7/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/8/" },
  { src: "/vid.mp4", link: "https://www.instagram.com/reel/9/" }
];

const ParallaxReelWall = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scrollY = useSpring(scrollYProgress, springConfig);

  // Parallax Speeds (Adjusted for taller cards)
  const y1 = useTransform(scrollY, [0, 1], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1], [0, 100]);
  const y3 = useTransform(scrollY, [0, 1], [0, -100]);

  // Split videos
  const col1 = videos.slice(0, 3);
  const col2 = videos.slice(3, 6);
  const col3 = videos.slice(6, 9);

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] py-24 overflow-hidden min-h-screen relative">
        
      {/* --- HEADER SECTION --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            
            {/* Left Side: Title */}
            <div>
                <div className="flex items-center gap-2 mb-4 text-pink-500">
                    <div className="p-1.5 bg-pink-500/10 rounded-full">
                        <Instagram size={18} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-pink-500">@justt.thiings</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] md:mb-16">
                  Reel <br className="md:hidden"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Life.</span>
                </h2>
            </div>
            
            {/* Right Side: Button */}
            <a 
                href="https://www.instagram.com/justt.thiings/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
                <span className="text-sm font-bold uppercase tracking-widest">Follow Feed</span>
                <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>

      {/* --- PARALLAX VIDEO GRID --- */}
      <div className="flex justify-center gap-4 md:gap-8 px-4 md:px-10 max-w-[1600px] mx-auto">
        
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-4 md:gap-8 flex-1">
            {col1.map((item, i) => <VideoCard key={i} data={item} />)}
        </motion.div>

        {/* Column 2 (Moves Down) */}
        <motion.div style={{ y: y2, marginTop: "-10%" }} className="flex flex-col gap-4 md:gap-8 flex-1">
            {col2.map((item, i) => <VideoCard key={i} data={item} />)}
        </motion.div>

        {/* Column 3 (Hidden on Mobile to save space, visible on Desktop) */}
        <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-4 md:gap-8 flex-1">
            {col3.map((item, i) => <VideoCard key={i} data={item} />)}
        </motion.div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

    </section>
  );
};

// --- CLICKABLE VIDEO CARD ---
const VideoCard = ({ data }) => {
  return (
    <a 
      href={data.link} 
      target="_blank" 
      rel="noreferrer"
      // FIX: aspect-[9/16] ensures VERTICAL REEL format
      className="relative block w-full aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-[#121212] group cursor-pointer"
    >
        <video
            src={data.src}
            // object-cover fills the 9:16 box perfectly (might crop sides of landscape videos)
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            autoPlay
            muted
            loop
            playsInline
        />
        
        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-widest border border-white/20">
                <Instagram size={14} />
                <span>View Reel</span>
            </div>
        </div>
    </a>
  );
};

export default ParallaxReelWall;