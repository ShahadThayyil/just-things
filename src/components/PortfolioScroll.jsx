import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PortfolioScroll() {
    const componentRef = useRef(null);
    const sliderRef = useRef(null);
    const headingRef = useRef(null);
    const subHeadingRef = useRef(null);
    const cardsRef = useRef([]);

    const cards = [
        { id: 1, img: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=1000", title: "Cyber Future", x: -300, y: 100, rotation: -15, scale: 0.9, zIndex: 1 },
        { id: 2, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000", title: "Neon City", x: 0, y: -50, rotation: 0, scale: 1.1, zIndex: 3 },
        { id: 3, img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000", title: "Retro Tech", x: 300, y: 100, rotation: 15, scale: 0.9, zIndex: 2 }
    ];

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: componentRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                }
            });

            tl.to(headingRef.current, { opacity: 0, y: -100, scale: 0.8, duration: 2, ease: "power2.out" }, 0);
            tl.to(subHeadingRef.current, { opacity: 0, y: -50, duration: 1.5 }, 0);

            cards.forEach((card, index) => {
                if (cardsRef.current[index]) {
                    tl.to(cardsRef.current[index], {
                        x: card.x,
                        y: card.y,
                        rotation: card.rotation,
                        scale: card.scale,
                        duration: 4,
                        ease: "power3.out"
                    }, 0.5);
                }
            });
        }, componentRef);
        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <div ref={componentRef} className="bg-black text-white min-h-screen w-full overflow-hidden relative font-sans">
            <div ref={sliderRef} className="h-screen w-full flex flex-col items-center justify-center relative">
                <div className="absolute top-[20%] md:top-[25%] z-20 text-center px-4">
                    <h1 ref={headingRef} className="text-5xl md:text-8xl font-black uppercase tracking-tight text-white mb-4">
                        Selected <br /> <span className="text-blue-500">Works</span>
                    </h1>
                    <p ref={subHeadingRef} className="text-gray-400 text-lg font-light tracking-wide max-w-lg mx-auto">
                        A curated selection of digital experiences.
                    </p>
                </div>

                <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            ref={addToRefs}
                            className="absolute top-1/2 left-1/2 w-[280px] h-[380px] md:w-[400px] md:h-[500px] bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-white/10 origin-bottom"
                            style={{ transform: 'translate(-50%, -50%)', zIndex: card.zIndex }}
                        >
                            <div className="absolute inset-0 bg-black/20 group hover:bg-transparent transition-all duration-500 z-10" />
                            <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
                                <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                                <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-gray-500 opacity-50">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ArrowDown size={20} />
                </div>
            </div>
        </div>
    );
};