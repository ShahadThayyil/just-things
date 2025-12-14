import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Tag } from "lucide-react";

// --- DATA ---
const allProjects = [
  { id: 1, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", title: "Vogue Edit", category: "Fashion", desc: "A high-contrast editorial exploring the duality of modern fashion. Shot on 35mm film for texture." },
  { id: 2, src: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=800", title: "Raw Nature", category: "Nature", desc: "Capturing the untouched silence of the northern forests. No filters, just raw light." },
  { id: 3, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800", title: "Concrete Dreams", category: "Architecture", desc: "A study of brutalist architecture and how light interacts with concrete surfaces." },
  { id: 4, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", title: "Silent Noise", category: "Fashion", desc: "Minimalist fashion shoot focusing on fabric movement and emotion." },
  { id: 5, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800", title: "Street Life", category: "Urban", desc: "The chaotic beauty of downtown Tokyo at midnight." },
  { id: 6, src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800", title: "The Gaze", category: "Portrait", desc: "Intimate studio portraits that look into the soul of the subject." },
  { id: 7, src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800", title: "High Contrast", category: "Fashion", desc: "Black and white editorial focusing on silhouette and form." },
  { id: 8, src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800", title: "Structure", category: "Architecture", desc: "Lines, angles, and the geometry of modern skylines." },
  { id: 9, src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800", title: "Deep Forest", category: "Nature", desc: "A misty morning in the evergreen woods." },
];

const categories = ["All", "Fashion", "Nature", "Architecture", "Urban", "Portrait"];

const FilterableGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(item => item.category === activeCategory);

  return (
    // Applied global font-sans (Inter)
    <section className="bg-[#2F3E2F] min-h-screen py-20 px-4 md:px-12 w-full text-[#E8E6E0] font-sans">
      
      {/* --- HEADER & FILTERS --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
         <div>
            {/* Label - Nav Style */}
            <span className="text-[#A3B18A] font-sans font-medium uppercase tracking-[0.25em] text-xs block mb-4">Archive</span>
            {/* H2 - Playfair Medium */}
            <h2 className="text-4xl md:text-7xl font-serif font-medium leading-[0.9]">
               Curated <br/> <span className="italic text-[#A3B18A]">Works</span>
            </h2>
         </div>

         <div className="flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((cat) => (
               <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative group pb-1"
               >
                  {/* Filter Buttons - Nav Style (Inter, 0.25em tracking) */}
                  <span className={`text-xs md:text-xs font-sans font-medium tracking-[0.25em] uppercase transition-colors duration-300 ${activeCategory === cat ? 'text-[#A3B18A]' : 'text-[#E8E6E0]/50 hover:text-[#E8E6E0]'}`}>
                     {cat}
                  </span>
                  {activeCategory === cat && (
                     <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A3B18A]" />
                  )}
               </button>
            ))}
         </div>
      </div>

      {/* --- GALLERY GRID --- */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence>
            {filteredProjects.map((project) => (
               <GalleryCard 
                  key={project.id} 
                  data={project} 
                  onClick={() => setSelectedProject(project)} 
               />
            ))}
         </AnimatePresence>
      </motion.div>

      {/* --- EXPANDED MODAL POPUP --- */}
      <AnimatePresence>
        {selectedProject && (
           <ProjectModal 
              data={selectedProject} 
              onClose={() => setSelectedProject(null)} 
           />
        )}
      </AnimatePresence>

    </section>
  );
};

// --- GRID CARD ---
const GalleryCard = ({ data, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${data.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
       {/* Image */}
       <div className="relative overflow-hidden rounded-[4px] mb-4 bg-[#1a241a] aspect-[4/5]">
          <motion.img 
             layoutId={`img-${data.id}`} 
             src={data.src} 
             alt={data.title} 
             className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 grayscale-0 md:grayscale md:group-hover:grayscale-0"
          />
          {/* Overlay only on desktop */}
          <div className="hidden md:block absolute inset-0 bg-[#2F3E2F]/20 group-hover:bg-transparent transition-colors duration-500"></div>
          
          {/* Hover Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#E8E6E0]/10 backdrop-blur-md border border-[#E8E6E0]/30 flex items-center justify-center">
                <ArrowUpRight className="text-[#E8E6E0]" size={20} />
             </div>
          </div>
       </div>

       {/* Text */}
       <div className="flex justify-between items-start border-t border-[#E8E6E0]/10 pt-4">
          <div>
             {/* Title - Playfair Medium */}
             <motion.h3 layoutId={`title-${data.id}`} className="text-xl md:text-2xl font-serif font-medium text-[#E8E6E0] mb-1">{data.title}</motion.h3>
             {/* Category - Nav Style Small */}
             <motion.span layoutId={`cat-${data.id}`} className="text-[#A3B18A] text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em]">{data.category}</motion.span>
          </div>
          <span className="text-[#E8E6E0]/30 text-[10px] md:text-xs font-sans font-medium tracking-[0.1em]">2024</span>
       </div>
    </motion.div>
  );
};

// --- MODAL COMPONENT ---
const ProjectModal = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
       
       {/* 1. Backdrop */}
       <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1a241a]/95 backdrop-blur-md cursor-pointer"
       />

       {/* 2. The Card Expanded */}
       <motion.div 
          layoutId={`card-${data.id}`} 
          className="
            relative w-full max-w-5xl 
            bg-transparent md:bg-[#2F3E2F] 
            rounded-[4px] md:rounded-[4px] 
            overflow-hidden 
            shadow-none md:shadow-2xl 
            flex flex-col md:flex-row 
            max-h-[85vh]
          "
          onClick={(e) => e.stopPropagation()} 
       >
          
          {/* Close Button */}
          <button 
             onClick={onClose} 
             className="absolute top-2 right-0 md:top-4 md:right-4 z-50 p-2 rounded-full bg-black/40 backdrop-blur-md border border-[#E8E6E0]/20 text-[#E8E6E0] transition-colors"
          >
             <X size={20} />
          </button>

          {/* --- IMAGE SECTION --- */}
          <div className="w-full md:w-1/2 h-auto max-h-[80vh] md:max-h-full md:h-auto relative shrink-0 flex items-center justify-center">
             <motion.img 
                layoutId={`img-${data.id}`} 
                src={data.src} 
                className="w-auto h-auto max-w-full max-h-[80vh] md:h-full md:w-full md:object-cover rounded-[4px] md:rounded-none shadow-2xl md:shadow-none"
             />
          </div>

          {/* --- CONTENT SECTION --- */}
          <div className="hidden md:flex w-full md:w-1/2 p-6 md:p-16 flex-col justify-center relative bg-[#2F3E2F]">
             
             {/* Header */}
             <div className="mb-4 md:mb-8">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="p-1.5 bg-[#A3B18A]/10 rounded-full text-[#A3B18A]">
                      <Tag size={14} />
                   </div>
                   {/* Category - Nav Style */}
                   <motion.span layoutId={`cat-${data.id}`} className="text-[#A3B18A] text-xs font-sans font-medium uppercase tracking-[0.25em]">
                      {data.category} Project
                   </motion.span>
                </div>
                {/* Title - Playfair Medium */}
                <motion.h2 layoutId={`title-${data.id}`} className="text-3xl md:text-6xl font-serif font-medium text-[#E8E6E0] leading-none mb-4">
                   {data.title}
                </motion.h2>
                <div className="w-16 h-[1px] bg-[#E8E6E0]/20"></div>
             </div>

             {/* Body - Inter Normal */}
             <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#E8E6E0]/70 text-sm md:text-lg font-sans font-normal leading-relaxed mb-6 md:mb-8"
             >
                {data.desc}
             </motion.p>

             {/* Footer Details - Nav Style */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 border-t border-[#E8E6E0]/10 pt-6 mt-auto md:mt-0"
             >
                <div>
                   <span className="text-[#E8E6E0]/40 text-[10px] font-sans font-medium uppercase tracking-[0.2em] block mb-1">Date</span>
                   <span className="text-[#E8E6E0] font-sans font-medium text-xs md:text-sm tracking-wide">Oct 2024</span>
                </div>
                <div>
                   <span className="text-[#E8E6E0]/40 text-[10px] font-sans font-medium uppercase tracking-[0.2em] block mb-1">Camera</span>
                   <span className="text-[#E8E6E0] font-sans font-medium text-xs md:text-sm tracking-wide">Sony A7SIII</span>
                </div>
             </motion.div>

          </div>

       </motion.div>
    </div>
  );
};

export default FilterableGallery;