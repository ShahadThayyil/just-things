import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Aperture, Film, Eye, Instagram, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const bioRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- 1. HERO ANIMATION ---
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Strips reveal
      gsap.utils.toArray('.hero-strip').forEach((strip, i) => {
         heroTl.fromTo(strip, 
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 1.2, delay: i * 0.1 },
            0
         );
      });
      
      // Text reveal
      heroTl.fromTo('.hero-title .word',
         { y: 100, opacity: 0, skewY: 5 },
         { y: 0, opacity: 1, skewY: 0, stagger: 0.05, duration: 1 },
         "-=1"
      );

      // --- 2. BIO SECTION ---
      gsap.fromTo(bioRef.current.querySelector('.bio-portrait'),
         { y: 50, opacity: 0 },
         {
            y: 0, opacity: 1, duration: 1,
            scrollTrigger: {
               trigger: bioRef.current,
               start: "top 80%",
            }
         }
      );
      
      // Bio items stagger
      gsap.utils.toArray('.bio-data-item').forEach((item, i) => {
         gsap.fromTo(item,
            { x: 30, opacity: 0 },
            {
               x: 0, opacity: 1, duration: 0.8, delay: i * 0.1,
               scrollTrigger: {
                  trigger: bioRef.current,
                  start: "top 70%",
               }
            }
         );
      });

      // Social links stagger
      gsap.fromTo('.social-link',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.6,
          scrollTrigger: {
             trigger: '.social-container',
             start: "top 90%",
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const splitText = (text) => text.split(" ").map((word, i) => <span key={i} className="word inline-block mr-2 md:mr-4">{word}</span>);

  return (
    // Applied global font-sans (Inter)
    <div ref={containerRef} className="bg-[#2F3E2F] text-[#E8E6E0] font-sans overflow-hidden pt-24 md:pt-32 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden mb-20 md:mb-32">
         {/* Strips Background */}
         <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 gap-1 p-4 z-0 opacity-30 mix-blend-overlay pointer-events-none">
            {[...Array(12)].map((_, i) => (
               <div key={i} className="hero-strip relative w-full h-full bg-[#1a241a] overflow-hidden origin-bottom rounded-sm">
                  <img 
                     src="https://www.shutterstock.com/image-photo/breathtaking-view-dense-forest-sunlight-600nw-2582941859.jpg"
                     alt="Texture"
                     className="w-full h-full object-cover grayscale opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E2F] to-transparent"></div>
               </div>
            ))}
         </div>

         {/* Content */}
         <div className="container mx-auto px-4 relative z-10 text-center">
            {/* Label - Nav Style */}
            <div className="inline-flex items-center gap-2 text-[#A3B18A] mb-4 md:mb-6 border border-[#A3B18A]/30 px-3 py-1 rounded-full uppercase text-[10px] md:text-xs font-sans font-medium tracking-[0.25em]">
               <Camera size={12} />
               <span>2030 Vision</span>
            </div>
            
            {/* H1 - Playfair Medium */}
            <h1 className="hero-title text-[13vw] md:text-[10vw] font-serif font-medium leading-[0.9] uppercase mb-4 md:mb-6">
               {splitText("Visual Architect")}
            </h1>
            
            {/* Subtitle - Nav Style */}
            <p className="hero-title text-sm md:text-2xl font-sans font-medium text-[#A3B18A] tracking-[0.25em] uppercase">
               {splitText("Framing the Future")}
            </p>
         </div>
         
         {/* Tech Specs - Nav Style */}
         <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 text-[#E8E6E0]/40 font-sans font-medium text-xs uppercase tracking-[0.25em]">
            <Aperture size={14} />
            <span>F/1.2</span>
            <span>ISO 3200</span>
         </div>
      </section>


      {/* --- BIO SECTION --- */}
      <section ref={bioRef} className="py-12 md:py-32 container mx-auto px-6 relative z-10 mb-20">
         <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            
            {/* Portrait */}
            <div className="bio-portrait relative h-[50vh] md:h-[700px] bg-[#1a241a] rounded-[2px] overflow-hidden order-1 md:order-none shadow-2xl sticky top-24">
               <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop" 
                  alt="Portrait" 
                  className="w-full h-full object-cover grayscale contrast-125 opacity-90"
               />
               <div className="absolute top-4 left-4 flex gap-2 text-[#A3B18A]">
                  <Film size={18} />
                  {/* Label - Nav Style */}
                  <span className="font-sans font-medium text-xs uppercase tracking-[0.25em]">Rec</span>
               </div>
               <div className="absolute inset-0 border border-[#A3B18A]/30 m-3 pointer-events-none"></div>
            </div>

            {/* Bio Data & Socials */}
            <div className="space-y-12 md:space-y-16 order-2 md:order-none">
               
               {/* Intro Text */}
               <div>
                  {/* H2 - Playfair Medium */}
                  <h2 className="text-4xl md:text-6xl font-serif font-medium mb-4 md:mb-6">Just-Things</h2>
                  {/* Body - Inter Normal */}
                  <p className="text-lg md:text-xl text-[#A3B18A] font-sans font-normal leading-relaxed">
                     A visual alchemist based in the neon-lit canyons of the city.
                  </p>
               </div>

               {/* Bio Items */}
               <div className="space-y-6 md:space-y-8">
                  {[
                     { icon: <Eye />, title: "Philosophy", text: "I don't capture reality; I curate it. My work is a study in high-contrast noir." },
                     { icon: <Camera />, title: "Gear", text: "Custom-modded mirrorless systems designed for extreme low light." },
                     { icon: <Aperture />, title: "Focus", text: "Cyberpunk Editorial, Brutalist Architecture, Neo-Noir Portraiture." }
                  ].map((item, i) => (
                     <div key={i} className="bio-data-item flex items-start gap-4 border-l-2 border-[#A3B18A] pl-4">
                        <div className="text-[#A3B18A] shrink-0 mt-1">{item.icon}</div>
                        <div>
                           {/* Label - Nav Style */}
                           <h3 className="text-xs md:text-sm font-sans font-medium uppercase tracking-[0.25em] text-[#E8E6E0]/60 mb-1">{item.title}</h3>
                           {/* Body - Inter Normal */}
                           <p className="text-sm md:text-lg text-[#E8E6E0] font-sans font-normal leading-relaxed">{item.text}</p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Social Links Section */}
               <div className="social-container pt-8 border-t border-[#A3B18A]/20">
                  {/* Label - Nav Style */}
                  <h3 className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-[#A3B18A] mb-6">Connect</h3>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                        { name: "Instagram", icon: <Instagram size={18} />, href: "#" },
                        { name: "Twitter / X", icon: <Twitter size={18} />, href: "#" },
                        { name: "LinkedIn", icon: <Linkedin size={18} />, href: "#" },
                        { name: "Email Me", icon: <Mail size={18} />, href: "mailto:hello@example.com" }
                     ].map((link, i) => (
                        <a 
                           key={i} 
                           href={link.href}
                           className="social-link group flex items-center justify-between p-4 border border-[#E8E6E0]/10 hover:border-[#A3B18A] bg-[#E8E6E0]/5 hover:bg-[#A3B18A]/10 transition-all duration-300 rounded-sm"
                        >
                           <div className="flex items-center gap-3 text-[#E8E6E0] group-hover:text-[#A3B18A] transition-colors">
                              {link.icon}
                              {/* Link Text - Nav Style (Compact) */}
                              <span className="text-sm font-sans font-medium uppercase tracking-[0.1em]">{link.name}</span>
                           </div>
                           <ArrowUpRight size={14} className="text-[#E8E6E0]/30 group-hover:text-[#A3B18A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                     ))}
                  </div>
               </div>

            </div>

         </div>
      </section>

    </div>
  );
};

export default AboutPage;