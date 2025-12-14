import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scan, 
  BatteryMedium, 
  Wifi, 
  Camera,
  Car,
  Utensils,
  Clapperboard
} from "lucide-react";

// --- DATA (URLs Unchanged) ---
const services = [
  { 
    id: "wedding", 
    label: "Wedding Stories", 
    iso: "ISO 800", 
    shutter: "1/200", 
    aperture: "f/1.8",
    icon: <Camera />,
    img: "/bg.jpg",
    desc: "Capturing the raw emotions and grand celebrations."
  },
  { 
    id: "auto", 
    label: "Automotive", 
    iso: "ISO 100", 
    shutter: "1/1000", 
    aperture: "f/4.0",
    icon: <Car />,
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
    desc: "High-octane visuals for machines in motion."
  },
  { 
    id: "food", 
    label: "Culinary Arts", 
    iso: "ISO 400", 
    shutter: "1/160", 
    aperture: "f/2.8",
    icon: <Utensils />,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    desc: "Taste the details. Macro shots that evoke hunger."
  },
  { 
    id: "prod", 
    label: "Commercial", 
    iso: "ISO 200", 
    shutter: "1/500", 
    aperture: "f/8.0",
    icon: <Clapperboard />,
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
    desc: "Precision product cinematography for luxury brands."
  },
];

const ViewfinderSection = () => {
  const [activeService, setActiveService] = useState(services[0]);

  // --- 🚀 PERFORMANCE FIX: Preload Images ---
  useEffect(() => {
    services.forEach((service) => {
      const img = new Image();
      img.src = service.img;
    });
  }, []);

  return (
    // Applied global font-sans (Inter)
    <section className="bg-[#2F3E2F] min-h-screen py-10 md:py-20 px-4 md:px-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 overflow-hidden font-sans">
      
      {/* --- LEFT: SERVICE MENU (Controls) --- */}
      <div className="w-full md:w-1/3 flex flex-col gap-2 z-20">
         <div className="mb-4 md:mb-8">
            <div className="flex items-center gap-2 mb-2 text-[#A3B18A]">
               <Scan size={18} />
               {/* Label - Nav Style */}
               <span className="text-xs font-sans font-medium uppercase tracking-[0.25em]">Select Mode</span>
            </div>
            {/* Heading - Playfair Medium */}
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#E8E6E0]">Expertise</h2>
         </div>

         <div className="flex flex-col border-l border-[#E8E6E0]/10">
            {services.map((item) => (
               <button
                  key={item.id}
                  // Desktop: Hover / Mobile: Click
                  onMouseEnter={() => window.innerWidth > 768 && setActiveService(item)}
                  onClick={() => setActiveService(item)}
                  className={`
                     group relative pl-6 md:pl-8 py-4 md:py-6 text-left transition-all duration-300
                     ${activeService.id === item.id ? 'bg-[#E8E6E0]/5' : 'hover:bg-[#E8E6E0]/5'}
                  `}
               >
                  {/* Active Indicator Bar */}
                  {activeService.id === item.id && (
                     <motion.div 
                        layoutId="active-bar"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#A3B18A]"
                     />
                  )}

                  {/* Label - Playfair Medium */}
                  <span className={`text-lg md:text-xl font-serif font-medium transition-colors duration-300 ${activeService.id === item.id ? 'text-[#E8E6E0]' : 'text-[#E8E6E0]/40'}`}>
                     {item.label}
                  </span>
                  
                  {/* Mobile Description - Inter Normal */}
                  <div className={`md:hidden overflow-hidden transition-all duration-300 ${activeService.id === item.id ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                     <p className="text-[#E8E6E0]/60 text-xs font-sans font-normal leading-relaxed">{item.desc}</p>
                  </div>
               </button>
            ))}
         </div>
      </div>


      {/* --- RIGHT: THE VIEWFINDER (Screen) --- */}
      <div className="w-full md:w-2/3 h-[35vh] md:h-[70vh] relative shrink-0">
         
         {/* Camera Housing */}
         <div className="relative w-full h-full border border-[#E8E6E0]/20 rounded-[4px] p-1.5 md:p-2 bg-[#1a241a] shadow-2xl">
            
            {/* The "Screen" */}
            <div className="relative w-full h-full overflow-hidden bg-black rounded-[2px]">
               
               {/* 1. DYNAMIC IMAGE LAYER */}
               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeService.id}
                     initial={{ opacity: 0, scale: 1.05 }} 
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.4, ease: "easeOut" }} 
                     className="absolute inset-0 w-full h-full"
                  >
                     <img 
                        src={activeService.img} 
                        alt={activeService.label} 
                        className="w-full h-full object-cover opacity-80"
                        loading="eager" 
                        fetchPriority="high" 
                     />
                  </motion.div>
               </AnimatePresence>

               {/* 2. CAMERA UI OVERLAY (Responsive HUD) */}
               {/* Updated fonts to Inter Uppercase Tracking 0.25em */}
               <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none z-10">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start text-[#E8E6E0] text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.25em]">
                     <div className="flex gap-2 md:gap-4">
                        <span className="bg-[#A3B18A] text-[#2F3E2F] px-1 rounded-sm font-bold">AF-C</span>
                        <span className="hidden md:inline">RAW</span>
                        <span>[ 3240 MIN ]</span>
                     </div>
                     <div className="flex gap-2 md:gap-4 items-center">
                        <Wifi size={14} className="animate-pulse" />
                        <BatteryMedium size={14} />
                     </div>
                  </div>

                  {/* Focus Brackets */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 border border-[#E8E6E0]/30 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#A3B18A] rounded-full animate-pulse"></div>
                     {/* Corner Marks */}
                     <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E8E6E0]"></div>
                     <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E8E6E0]"></div>
                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E8E6E0]"></div>
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E8E6E0]"></div>
                  </div>

                  {/* Bottom Bar (Settings) */}
                  <div className="flex justify-between items-end text-[#E8E6E0]">
                     
                     {/* Dynamic Parameters */}
                     <div className="flex gap-3 md:gap-8 font-sans font-medium uppercase tracking-[0.25em] text-[9px] md:text-xs">
                        <div className="flex flex-col">
                           <span className="text-[#E8E6E0]/50 text-[6px] md:text-[8px] uppercase">Shutter</span>
                           <span>{activeService.shutter}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[#E8E6E0]/50 text-[6px] md:text-[8px] uppercase">Aperture</span>
                           <span>{activeService.aperture}</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[#E8E6E0]/50 text-[6px] md:text-[8px] uppercase">ISO</span>
                           <span>{activeService.iso}</span>
                        </div>
                     </div>

                     {/* Audio Meters */}
                     <div className="flex gap-1 h-6 md:h-8 items-end">
                        <div className="w-1 h-full bg-[#E8E6E0]/20 relative">
                           <motion.div 
                              animate={{ height: ["40%", "80%", "30%"] }} 
                              transition={{ repeat: Infinity, duration: 0.5 }}
                              className="absolute bottom-0 w-full bg-[#A3B18A]" 
                           />
                        </div>
                        <div className="w-1 h-full bg-[#E8E6E0]/20 relative">
                           <motion.div 
                              animate={{ height: ["60%", "20%", "90%"] }} 
                              transition={{ repeat: Infinity, duration: 0.4 }}
                              className="absolute bottom-0 w-full bg-[#A3B18A]" 
                           />
                        </div>
                     </div>

                  </div>

               </div>
            </div>

            {/* REC DOT */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-20">
               <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
               {/* Label - Nav Style */}
               <span className="text-red-500 font-sans font-medium text-[10px] md:text-xs uppercase tracking-[0.25em]">REC</span>
            </div>

         </div>
         
         {/* Desktop Description Overlay */}
         <div className="absolute -bottom-6 -left-6 bg-[#E8E6E0] p-6 max-w-xs shadow-xl hidden md:block">
            {/* Heading - Playfair Medium */}
            <h4 className="text-[#2F3E2F] font-serif font-medium text-xl mb-2">{activeService.label}</h4>
            {/* Body - Inter Normal */}
            <p className="text-[#2F3E2F]/70 text-xs font-sans font-normal leading-relaxed">
               {activeService.desc}
            </p>
         </div>

      </div>

    </section>
  );
};

export default ViewfinderSection;