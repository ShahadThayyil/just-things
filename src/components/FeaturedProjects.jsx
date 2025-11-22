import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Neon Nights",
    category: "Event",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Vogue Editorial",
    category: "Fashion",
    image: "https://plus.unsplash.com/premium_photo-1664112065821-274ec259c6c2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Royal Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Urban Architecture",
    category: "Design",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Sonic Waves",
    category: "Concert",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedProjects() {
  // --- MOBILE SCROLL LOGIC ---
  const mobileTargetRef = useRef(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: mobileTargetRef,
  });

  // 0% scroll = 0 (Start)
  // 100% scroll = -340vw (Move left enough to show the last card)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-360vw"]);

  return (
    <div className="w-full bg-[#0A0A0A]">
      
      {/* ============================================
          DESKTOP LAYOUT (Unchanged)
         ============================================ */}
      <div className="hidden md:block py-20">
        <div className="container mx-auto px-12 mb-12 flex flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#00D2BE]"></div>
              <span className="text-[#00D2BE] font-mono text-sm tracking-widest uppercase">
                Selected Works
              </span>
            </div>
            <h2 className="text-6xl font-bold text-white leading-tight">
              Featured <br /> Projects
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-base leading-relaxed">
            A visual collection of our most recent works.
          </p>
        </div>

        <div className="w-full px-8">
          <div className="flex flex-row gap-2 h-[600px] w-full max-w-[1600px] mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="relative group overflow-hidden cursor-pointer rounded-2xl flex-1 hover:flex-[4] transition-all duration-700 ease-out">
                <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" src={project.image} alt={project.title} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-between items-end">
                  <div>
                    <p className="text-[#00D2BE] text-xs font-bold tracking-widest uppercase mb-1">{project.category}</p>
                    <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                  </div>
                  <div className="bg-white/10 p-3 rounded-full backdrop-blur-md text-white hover:bg-[#00D2BE] hover:text-black transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center mt-16">
            <button className="px-8 py-3 text-white border border-white/20 rounded-full uppercase text-sm hover:border-[#00D2BE]">View All Projects</button>
        </div>
      </div>


      {/* ============================================
          MOBILE LAYOUT (Sticky Horizontal Scroll)
         ============================================ */}
      <div className="md:hidden">
        
        {/* IMPORTANT: h-[400vh] 
            Ithu karanam, user 4 screen height scroll cheythal mathrame 
            ee section theerukayullu. Athuvare ithu 'Sticky' aayi nilkkum.
        */}
        <div ref={mobileTargetRef} className="relative h-[400vh]">
          
          {/* Sticky Container: Holds the viewport in place */}
          <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-[#0A0A0A]">
            
            {/* 1. Header (Fixed Position inside Sticky) */}
            <div className="pt-8 px-6 flex-shrink-0 z-10 bg-[#0A0A0A]">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-px w-8 bg-[#00D2BE]"></div>
                    <span className="text-[#00D2BE] font-mono text-xs tracking-widest uppercase">
                    Selected Works
                    </span>
                </div>
                <h2 className="text-4xl font-bold text-white leading-tight">
                    Featured <br /> Projects
                </h2>
            </div>

            {/* 2. Horizontal Moving Track */}
            <div className="flex items-center flex-1 w-full relative">
                {/* Motion Div moves Left based on vertical scroll */}
                <motion.div style={{ x }} className="flex gap-4 px-6 w-max">
                    {projects.map((project) => (
                    <div
                        key={project.id}
                        className="relative overflow-hidden rounded-xl border border-white/10 shadow-xl
                                   w-[85vw] h-[50vh] flex-shrink-0"
                    >
                        <img
                        className="h-full w-full object-cover"
                        src={project.image}
                        alt={project.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-5">
                            <p className="text-[#00D2BE] text-xs font-bold uppercase mb-1">{project.category}</p>
                            <div className="flex justify-between items-end">
                                <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                                <div className="bg-white/10 p-2 rounded-full backdrop-blur-md text-white">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                    {/* Optional: Add extra space at the end so the last card isn't cut off immediately */}
                    <div className="w-[5vw]"></div>
                </motion.div>
            </div>

            {/* Button REMOVED here */}

          </div>
        </div>
      </div>
    </div>
  );
}