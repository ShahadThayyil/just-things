import React, { useEffect, useState } from 'react';
import { ArrowRight, Instagram } from 'lucide-react';

const Portfolio = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans selection:bg-[#00D2BE] selection:text-black">
      
      {/* =======================================
          SECTION 1: HERO WITH DIAMOND GRID
      ======================================== */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* 1. Background Image (Warm Festival Vibe) */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://scontent.cdninstagram.com/v/t51.75761-15/501541310_17973236564893574_1332122220465240936_n.jpg?stp=dst-jpg_e35_tt6&_nc_ohc=PvRV-bTBmyUQ7kNvwFl_wAS&_nc_oc=Admm22N3XrrchdxAqpLaTRSv3T875c30RHSXfDga4HRkfW4lLaDr9BD6tzisBOQRaTQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=MM3hV0h3ptxdHDq8dad0CQ&oh=00_AfiKkaw7wUFBkdR6eiHsUbRsh4dcum8waimDxdgRCxbhdQ&oe=6923DBC9" 
             className="w-full h-full object-cover scale-110 animate-slow-zoom" 
             alt="Festival Background" 
           />
           {/* Orange Overlay to match reference */}
           <div className="absolute inset-0 bg-gradient-to-b from-orange-900/40 via-red-900/20 to-black/90 mix-blend-multiply"></div>
        </div>

        {/* 2. THE DIAMOND GRID OVERLAY (Pure CSS) */}
        {/*<div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 120px, #000 120px, #000 135px),
              repeating-linear-gradient(-45deg, transparent, transparent 120px, #000 120px, #000 135px)
            `
          }}
        ></div>
        */}

        {/* 3. Hero Content */}
        <div className={`relative z-20 text-center px-4 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           
           {/* Decorative Line */}
           <div className="w-20 h-1 bg-[#00D2BE] mx-auto mb-6 rounded-full"></div>

           {/* Main Title */}
           <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-4 drop-shadow-2xl leading-none">
             Festival Vibes <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Captured</span>
           </h1>

           {/* Subtitle */}
           <p className="text-lg md:text-xl text-gray-200 font-light tracking-wide mb-10 max-w-2xl mx-auto drop-shadow-md">
             Experience the energy and emotion of festivals through my lens.
           </p>

           {/* CTA Button (Pill Shape with Teal Circle) */}
           <div className="flex items-center justify-center gap-0 cursor-pointer group">
             <div className="bg-[#1a1a1a] text-white px-8 py-4 rounded-l-full border border-r-0 border-white/10 font-medium tracking-wider uppercase text-sm group-hover:bg-white group-hover:text-black transition-all duration-300">
               Get in touch
             </div>
             <div className="bg-[#00D2BE] w-14 h-[54px] rounded-r-full flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300 origin-left">
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
             </div>
           </div>

        </div>

        {/* Fade to Black at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
      </div>


      {/* =======================================
          SECTION 2: "CAPTURING MOMENTS"
      ======================================== */}
      <div className="w-full bg-black py-24 px-6 md:px-12 relative z-20">
         
         {/* Header */}
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
              Capturing <br/> Moments
            </h2>
            <p className="text-gray-500 font-light">Explore my favorite collection of festival photography</p>
         </div>

         {/* Masonry Grid */}
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Image Item 1 */}
            <div className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
               <img src="https://images.unsplash.com/photo-1514525253440-b393452e2729?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Concert" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-[#00D2BE] tracking-widest uppercase text-sm border border-[#00D2BE] px-4 py-2 rounded-full">View Project</span>
               </div>
            </div>

            {/* Image Item 2 (Tall) */}
            <div className="group relative h-[500px] overflow-hidden rounded-lg cursor-pointer lg:-translate-y-12">
               <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Concert" />
               <div className="absolute top-4 right-4 bg-[#00D2BE] text-black text-xs font-bold px-2 py-1 rounded">NEW</div>
            </div>

            {/* Image Item 3 */}
            <div className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
               <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Concert" />
            </div>

            {/* Image Item 4 */}
            <div className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer">
               <img src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Concert" />
            </div>

            {/* Image Item 5 (Tall) */}
            <div className="group relative h-[500px] overflow-hidden rounded-lg cursor-pointer lg:-translate-y-12">
               <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Concert" />
            </div>

             {/* Image Item 6 */}
             <div className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer flex items-center justify-center bg-[#111] border border-white/10 group-hover:border-[#00D2BE] transition-colors">
               <div className="text-center">
                 <p className="text-gray-500 text-sm mb-2 group-hover:text-white">View All Works</p>
                 <ArrowRight className="mx-auto text-[#00D2BE] group-hover:translate-x-2 transition-transform" />
               </div>
            </div>

         </div>
      </div>

      {/* Simple Footer */}
      <footer className="w-full py-12 bg-[#050505] border-t border-white/10 text-center">
         <p className="text-gray-600 text-sm">&copy; 2025 Roel Schoonderbeek. All rights reserved.</p>
         <div className="flex justify-center gap-4 mt-4 text-gray-400">
            <Instagram size={18} className="hover:text-[#00D2BE] cursor-pointer"/>
         </div>
      </footer>

    </div>
  );
};

export default Portfolio;