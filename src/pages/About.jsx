// src/pages/PhotographerAboutPage.jsx
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const mainContainerRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroImageBgRef = useRef(null);
    const bioRef = useRef(null);
    const focusAreasRef = useRef(null);
    const timelineRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // --- 1. Hero Animation ---
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.fromTo(heroImageBgRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 0.4, duration: 2 }
            )
                .fromTo(heroTextRef.current.children,
                    { y: 100, opacity: 0, skewY: 5 },
                    { y: 0, opacity: 1, skewY: 0, stagger: 0.15, duration: 1.2 },
                    "-=1.5"
                );


            // --- 2. Bio Section Trigger ---
            gsap.fromTo(bioRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: bioRef.current,
                        start: "top 80%",
                    }
                }
            );

            // --- 3. Focus Areas Stagger ---
            const focusItems = gsap.utils.toArray('.focus-item', focusAreasRef.current);
            gsap.fromTo(focusItems,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: focusAreasRef.current,
                        start: "top 85%",
                    }
                }
            );

            // --- 4. Timeline/Exhibits Trigger ---
            const timelineItems = gsap.utils.toArray('.timeline-item', timelineRef.current);
            timelineItems.forEach((item, index) => {
                gsap.fromTo(item,
                    { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        }
                    }
                )
            });

        }, mainContainerRef);
        return () => ctx.revert();
    }, []);


    // Data needed for the sections
    const focusAreas = [
        { title: "Urban Street", desc: "Capturing the raw energy and candid moments of city life in monochrome." },
        { title: "Neo-Noir Portraiture", desc: "High-contrast, moody portraiture utilizing available artificial light." },
        { title: "Architecture", desc: "Finding geometry and stark contrast in modern and brutalist structures." },
        { title: "Nightscapes", desc: "Long exposures synthesizing movement and static neon light." },
    ];

    const timelineData = [
        { year: "2024", title: "Solo Exhibition: 'Neon Shadows'", location: "Apex Gallery, NY", description: "A 30-piece collection exploring isolation in the hyper-connected city." },
        { year: "2022", title: "Featured: Monochrome Magazine", location: "Print Issue #45", description: "Cover feature and 8-page spread on minimalist architectural photography." },
        { year: "2019", title: "Award: LensCulture Street", location: "International", description: "Finalist in the annual street photography awards for the 'Transit' series." },
    ];


    return (
        <div ref={mainContainerRef} className="bg-black text-white overflow-hidden font-sans">

            {/* === HERO SECTION === */}
            <section className="relative h-screen flex items-center justify-start overflow-hidden">
                {/* Background Image with Neon Overlay */}
                <div ref={heroImageBgRef} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-cyan-900/30 mix-blend-multiply z-10"></div>
                    <img
                        // Placeholder: A high contrast, dark, moody image
                        src="https://images.unsplash.com/photo-1493895583953-015a0d31c12d?q=80&w=2070&auto=format&fit=crop"
                        alt="Photographer Aesthetic"
                        className="w-full h-full object-cover grayscale contrast-125"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <div ref={heroTextRef} className="max-w-4xl">
                        {/* Neon Cyan Accent Text */}
                        <h2 className="text-cyan-400 font-mono tracking-[0.2em] uppercase mb-6 text-sm md:text-base drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] opacity-0">
                            The World in Monochrome & Light
                        </h2>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none uppercase opacity-0">
                            CHASING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">SHADOWS</span>, <br />
                            FRAMING <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,1)]">NEON</span>.
                        </h1>
                        <p className="text-xl text-neutral-300 mb-10 max-w-xl opacity-0 font-light border-l-2 border-cyan-400 pl-6">
                            Visual storyteller obsessed with high contrast, urban decay, and the artificial light that cuts through the darkness.
                        </p>
                    </div>
                </div>
            </section>


            {/* === BIO SECTION (The Artist) === */}
            <section ref={bioRef} className="py-32 container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    {/* Image Side */}
                    <div className="relative group">
                        {/* Neon Frame Effect */}
                        <div className="absolute inset-0 border-2 border-cyan-400 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 shadow-[0_0_20px_rgba(34,211,238,0.3)]"></div>
                        <div className="relative h-[600px] bg-neutral-900 overflow-hidden contrast-125 grayscale">
                            {/* Placeholder: Photographer portrait */}
                            <img
                                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop"
                                alt="The Photographer"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="space-y-10">
                        <h2 className="text-5xl font-black uppercase tracking-tight opacity-0">
                            Behind The <span className="text-cyan-400">Lens</span>.
                        </h2>
                        <div className="space-y-6 text-lg text-neutral-300 font-light leading-relaxed">
                            <p className="opacity-0">
                                I don't just take pictures; I hunt for moments where reality looks like a film noir set. Based in the concrete jungle, I started armed with an old analog Canon and a fascination for how the city changes when the sun goes down.
                            </p>
                            <p className="opacity-0">
                                My aesthetic is defined by a strict adherence to black and white for structure, punctuated by the aggressive intrusion of modern, artificial light. It's about finding the silence in the noise.
                            </p>
                            <p className="opacity-0">
                                Whether shooting editorial spreads or personal street projects, my goal remains the same: to freeze the kinetic energy of modern life into a singular, striking frame.
                            </p>
                        </div>
                        <div className="opacity-0 pt-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Signature_placeholder.png" alt="Signature" className="h-16 invert opacity-60" />
                        </div>
                    </div>
                </div>
            </section>


            {/* === AREAS OF FOCUS === */}
            <section className="py-32 bg-neutral-950 relative">
                {/* Subtle neon grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                <div ref={focusAreasRef} className="container mx-auto px-6 relative z-10">
                    <div className="text-left mb-20 border-b border-neutral-800 pb-8">
                        <h2 className="text-cyan-400 font-mono tracking-wider uppercase mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">My Craft</h2>
                        <h3 className="text-5xl font-black text-white uppercase">Areas of Focus</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
                        {focusAreas.map((area, index) => (
                            <div key={index} className="focus-item bg-black p-10 group hover:bg-neutral-950 transition-colors duration-300 opacity-0">
                                <div className="mb-6 text-cyan-400/50 group-hover:text-cyan-400 transition-colors duration-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-aperture"><circle cx="12" cy="12" r="10" /><path d="m14.31 8 5.74 9.94" /><path d="M9.69 8h11.48" /><path d="m7.38 12 5.74-9.94" /><path d="M9.69 16 3.95 6.06" /><path d="M14.31 16H2.83" /><path d="m16.62 12-5.74 9.94" /></svg>
                                </div>
                                <h4 className="font-bold text-white text-2xl mb-4 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{area.title}</h4>
                                <p className="text-neutral-400 font-light">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* === EXHIBITIONS & MILESTONES TIMELINE === */}
            <section className="py-32 container mx-auto px-6 relative">
                <div className="text-center mb-24">
                    <h2 className="text-5xl font-black text-white uppercase">Milestones & <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">Exhibits</span></h2>
                </div>

                <div ref={timelineRef} className="relative space-y-16 max-w-4xl mx-auto">
                    {/* Glowing Neon Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.6)] -ml-[0.5px] hidden md:block"></div>

                    {timelineData.map((item, index) => (
                        <div key={index} className={`timeline-item relative flex flex-col md:flex-row gap-12 items-center opacity-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Glowing Dot Indicator */}
                            <div className="absolute left-0 md:left-1/2 top-0 md:top-8 w-6 h-6 rounded-full bg-black border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] -translate-x-3 md:-translate-x-3 z-20"></div>

                            {/* Date Block */}
                            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'text-left'}`}>
                                <span className="inline-block py-2 px-6 border-2 border-cyan-400/50 text-cyan-400 text-xl font-mono font-bold tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.2)] bg-black">{item.year}</span>
                            </div>

                            {/* Content Block */}
                            <div className="w-full md:w-1/2 bg-neutral-950 p-10 border border-neutral-800 hover:border-cyan-400/50 transition-colors duration-500 group z-10 relative">
                                <h3 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                                <h4 className="text-neutral-400 font-mono text-sm mb-6 uppercase tracking-wider">{item.location}</h4>
                                <p className="text-neutral-300 font-light leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* === CTA SECTION === */}
            <section className="py-40 bg-black text-center px-6 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-12 uppercase leading-tight">
                        Ready to create something <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,1)]">striking</span>?
                    </h2>
                    <button className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-none bg-transparent px-12 font-bold text-white transition-all duration-500">
                        <span className="absolute inset-0 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:bg-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,1)] transition-all duration-500"></span>
                        <span className="relative z-20 uppercase tracking-[0.2em] group-hover:text-black transition-colors duration-500">Book A Consultation</span>
                    </button>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;