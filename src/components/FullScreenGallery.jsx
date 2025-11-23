import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    useCallback
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

// ----------------------------------------------------------------------
// REGISTER PLUGINS
// ----------------------------------------------------------------------
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);
    try {
        // eslint-disable-next-line
        const { SplitText } = require("gsap/SplitText");
        gsap.registerPlugin(SplitText);
    } catch (e) {
        console.warn("SplitText plugin not found. Text animations will be simplified.");
    }
}

// ----------------------------------------------------------------------
// COMPONENT 1: THE FULL SCREEN OVERLAY (Arrows Only, Lower Close Btn, Exit Anim)
// ----------------------------------------------------------------------

const AnimatedCarouselModal = ({ isOpen, onClose, sections, autoPlayDuration = 4000 }) => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const currentIndexRef = useRef(-1);
    const animatingRef = useRef(false);
    const autoPlayTimerRef = useRef(null);

    const sectionsRefs = useRef([]);
    const imagesRefs = useRef([]);
    const outerRefs = useRef([]);
    const innerRefs = useRef([]);
    const headingRefs = useRef([]);

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // -------------------------
    // 1. BODY SCROLL LOCK
    // -------------------------
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [isOpen]);

    // -------------------------
    // 2. IMAGE PRELOADING
    // -------------------------
    useEffect(() => {
        if (!sections || sections.length === 0) return;
        let loaded = 0;
        setImagesLoaded(false);
        sections.forEach((section) => {
            const img = new Image();
            img.src = section.img;
            const onLoad = () => {
                loaded++;
                if (loaded === sections.length) setImagesLoaded(true);
            };
            img.onload = onLoad;
            img.onerror = onLoad;
        });
    }, [sections]);

    // -------------------------
    // 3. EXIT ANIMATION HANDLER
    // -------------------------
    const handleExit = () => {
        if (!containerRef.current) return;

        // Stop autoplay
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);

        // Animate Out
        gsap.to(containerRef.current, {
            autoAlpha: 0, // Fades opacity and sets visibility to hidden
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                // Only triggers the actual unmount after animation is done
                onClose();
            }
        });
    };

    // -------------------------
    // 4. NAVIGATION ANIMATION
    // -------------------------
    const gotoSection = useCallback((index, direction) => {
        if (!containerRef.current || animatingRef.current) return;

        const sectionsElements = sectionsRefs.current;
        const images = imagesRefs.current;
        const outerWrappers = outerRefs.current;
        const innerWrappers = innerRefs.current;
        const headings = headingRefs.current;

        const wrap = gsap.utils.wrap(0, sectionsElements.length);
        const targetIndex = wrap(index);

        if (targetIndex === currentIndexRef.current) return;

        animatingRef.current = true;

        if (direction === undefined) {
            direction = targetIndex > currentIndexRef.current ? 1 : -1;
            if (currentIndexRef.current === sectionsElements.length - 1 && targetIndex === 0) direction = 1;
            if (currentIndexRef.current === 0 && targetIndex === sectionsElements.length - 1) direction = -1;
        }

        const dFactor = direction === -1 ? -1 : 1;

        const tl = gsap.timeline({
            defaults: { duration: 1.25, ease: 'power1.inOut' },
            onComplete: () => { animatingRef.current = false; }
        });

        timelineRef.current = tl;

        // OUTGOING
        if (currentIndexRef.current >= 0) {
            gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 0 });
            tl.to(images[currentIndexRef.current], { xPercent: -15 * dFactor })
                .set(sectionsElements[currentIndexRef.current], { autoAlpha: 0 });
        }

        // INCOMING
        gsap.set(sectionsElements[targetIndex], { autoAlpha: 1, zIndex: 1 });

        tl.fromTo([outerWrappers[targetIndex], innerWrappers[targetIndex]],
            { xPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
            { xPercent: 0 }, 0
        ).fromTo(images[targetIndex],
            { xPercent: 15 * dFactor },
            { xPercent: 0 }, 0
        );

        // TEXT
        const heading = headings[targetIndex];
        if (heading) {
            gsap.fromTo(heading,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
            );
        }

        currentIndexRef.current = targetIndex;
        setCurrentIndex(targetIndex);
    }, [sections]);

    // -------------------------
    // 5. AUTO PLAY
    // -------------------------
    useEffect(() => {
        if (!isOpen || !imagesLoaded || isPaused) {
            if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
            return;
        }

        autoPlayTimerRef.current = setInterval(() => {
            if (!animatingRef.current) {
                gotoSection(currentIndexRef.current + 1, 1);
            }
        }, autoPlayDuration);

        return () => clearInterval(autoPlayTimerRef.current);
    }, [isOpen, imagesLoaded, isPaused, gotoSection, autoPlayDuration]);

    // -------------------------
    // 6. INITIALIZATION & ENTRY ANIMATION
    // -------------------------
    useGSAP(() => {
        if (!isOpen || !containerRef.current || !imagesLoaded) return;

        // ENTRY ANIMATION: Fade in the whole container
        gsap.fromTo(containerRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
        );

        // Reset Logic
        currentIndexRef.current = -1;
        animatingRef.current = false;

        const outerWrappers = outerRefs.current;
        const innerWrappers = innerRefs.current;

        gsap.set(outerWrappers, { xPercent: 100 });
        gsap.set(innerWrappers, { xPercent: -100 });

        // Start at 0
        gotoSection(0, 1);

        return () => {
            if (timelineRef.current) timelineRef.current.kill();
            if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
        };
    }, { scope: containerRef, dependencies: [isOpen, imagesLoaded] });

    if (!isOpen) return null;

    return (
        <div
            ref={containerRef}
            // "autoAlpha: 0" start state handled by GSAP, but good to have base styles
            className="fixed inset-0 z-[9999] bg-black text-white uppercase font-sans opacity-0 invisible"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* CLOSE BUTTON (Lowered Position) */}
            <button
                onClick={handleExit} // Calls the animation function first
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                // CHANGED: top-8 -> top-24 (mobile) and md:top-32 (desktop)
                className="fixed top-24 md:top-32 right-8 z-[10000] w-12 h-12 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-transform bg-white/10 backdrop-blur-md text-white border-none shadow-xl"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            {/* --- LEFT ARROW --- */}
            <button
                onClick={() => gotoSection(currentIndexRef.current - 1, -1)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="fixed top-1/2 left-4 z-50 p-4 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* --- RIGHT ARROW --- */}
            <button
                onClick={() => gotoSection(currentIndexRef.current + 1, 1)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="fixed top-1/2 right-4 z-50 p-4 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* NAVIGATION THUMBNAILS (BOTTOM) */}
            <div
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="flex gap-2">
                    {sections.map((section, i) => (
                        <div
                            key={`thumb-${i}`}
                            className="rounded overflow-hidden relative cursor-pointer transition-opacity duration-300 border border-white/20 hover:border-white"
                            style={{ width: '48px', height: '32px', opacity: currentIndex === i ? 1 : 0.4 }}
                            onClick={() => {
                                if (currentIndex !== i && !animatingRef.current) {
                                    gotoSection(i);
                                }
                            }}
                        >
                            <img src={section.img} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="text-sm tracking-wider text-white font-mono ml-4">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                </div>
            </div>

            {/* FULL SCREEN SLIDES */}
            {sections.map((section, i) => (
                <section
                    key={`sec-${i}`}
                    className="absolute top-0 left-0 w-full h-full invisible"
                    ref={el => { if (el) sectionsRefs.current[i] = el; }}
                >
                    <div className="w-full h-full overflow-hidden" ref={el => { if (el) outerRefs.current[i] = el; }}>
                        <div className="w-full h-full overflow-hidden" ref={el => { if (el) innerRefs.current[i] = el; }}>
                            <div
                                className="absolute top-0 left-0 h-full w-full bg-cover bg-center flex items-center justify-center"
                                ref={el => { if (el) imagesRefs.current[i] = el; }}
                                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("${section.img}")` }}
                            >
                                <h2
                                    ref={el => { if (el) headingRefs.current[i] = el; }}
                                    className="text-white text-center font-bold text-4xl md:text-6xl lg:text-8xl z-10 px-4 select-none pointer-events-none drop-shadow-lg"
                                >
                                    {section.text}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

// ----------------------------------------------------------------------
// COMPONENT 2: THE MINI CAROUSEL (Refined Timer)
// ----------------------------------------------------------------------

const MiniCarousel = ({ images, onOpen }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => {
            setIdx(prev => (prev + 1) % images.length);
        }, 2500);
        return () => clearInterval(t);
    }, [images.length]);

    return (
        <div className="mini-carousel-group">
            <div className="mini-carousel-frame" onClick={onOpen}>
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="preview"
                        className={`mini-img ${i === idx ? "active" : ""}`}
                    />
                ))}
                <div className="mini-overlay"><span>EXPAND</span></div>
            </div>

            <button className="mini-view-btn" onClick={onOpen}>
                VIEW COLLECTION
            </button>

            <style jsx>{`
        .mini-carousel-group {
          display: flex; flex-direction: column; align-items: center; gap: 20px;
          animation: fadeInUp 0.8s ease forwards;
        }
        .mini-carousel-frame {
          width: 260px; height: 350px;
          position: relative; overflow: hidden;
          border-radius: 8px; cursor: pointer;
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }
        .mini-carousel-frame:hover { transform: scale(1.02); }
        
        .mini-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          opacity: 0; transition: opacity 1s ease, transform 4s ease;
          transform: scale(1.1);
        }
        .mini-img.active { opacity: 1; transform: scale(1); }
        
        .mini-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.3);
          display: grid; place-items: center; opacity: 0; transition: 0.3s;
        }
        .mini-carousel-frame:hover .mini-overlay { opacity: 1; }
        .mini-overlay span {
          color: white; font-size: 0.8rem; letter-spacing: 2px; 
          border: 1px solid white; padding: 8px 16px;
        }

        .mini-view-btn {
          background: transparent; color: var(--fx-text, #fff);
          border: 1px solid var(--fx-text, #fff);
          padding: 12px 24px; font-size: 0.85rem; letter-spacing: 3px;
          cursor: pointer; transition: all 0.3s ease;
        }
        .mini-view-btn:hover {
          background: var(--fx-text, #fff); color: #000;
        }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:translateY(0);} }
      `}</style>
        </div>
    );
};

// ----------------------------------------------------------------------
// COMPONENT 3: MAIN PAGE (Unchanged logic, updated components)
// ----------------------------------------------------------------------

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef(
    (
        {
            sections,
            className,
            style,
            fontFamily = '"Rubik Wide", system-ui, sans-serif',
            header,
            footer,
            gap = 1,
            gridPaddingX = 2,
            showProgress = true,
            debug = false,
            initialIndex = 0,
            colors = {
                text: "rgba(245,245,245,0.92)",
                overlay: "rgba(0,0,0,0.35)",
                pageBg: "#ffffff",
                stageBg: "#000000",
            },
        },
        ref
    ) => {
        const total = sections.length;
        const [index, setIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));

        // MODAL STATE
        const [showCarousel, setShowCarousel] = useState(false);
        const [activeCarouselData, setActiveCarouselData] = useState(null);

        const rootRef = useRef(null);
        const fixedRef = useRef(null);
        const fixedSectionRef = useRef(null);
        const bgRefs = useRef([]);
        const wordRefs = useRef([]);
        const leftTrackRef = useRef(null);
        const rightTrackRef = useRef(null);
        const leftItemRefs = useRef([]);
        const rightItemRefs = useRef([]);
        const progressFillRef = useRef(null);
        const currentNumberRef = useRef(null);
        const isAnimatingRef = useRef(false);
        const lastIndexRef = useRef(index);

        const splitWords = (text) => {
            return text.split(/\s+/).map((w, i) => (
                <span className="fx-word-mask" key={i}>
                    <span className="fx-word" ref={(el) => { if (el) wordRefs.current.push(el); }}>{w}</span>
                    {i < text.split(/\s+/).length - 1 ? " " : null}
                </span>
            ));
        };

        const centerLists = (toIndex, animate) => {
            const doCenter = (track, items, isRight) => {
                if (!track || items.length === 0) return;
                const itemH = items[0].getBoundingClientRect().height + 10;
                const containerH = track.parentElement.getBoundingClientRect().height;
                const targetY = (containerH / 2) - (itemH / 2) - (toIndex * itemH);

                if (animate) gsap.to(track, { y: targetY, duration: 0.6, ease: "power3.out" });
                else gsap.set(track, { y: targetY });
            };
            doCenter(leftTrackRef.current, leftItemRefs.current, false);
            doCenter(rightTrackRef.current, rightItemRefs.current, true);
        };

        useLayoutEffect(() => {
            const fixed = fixedRef.current;
            const sectionEl = fixedSectionRef.current;
            if (!fixed || !sectionEl) return;

            wordRefs.current = [];

            gsap.set(bgRefs.current, { opacity: 0, scale: 1.05 });
            if (bgRefs.current[index]) gsap.set(bgRefs.current[index], { opacity: 1, scale: 1 });
            centerLists(index, false);

            const st = ScrollTrigger.create({
                trigger: sectionEl,
                start: "top top",
                end: "bottom bottom",
                pin: fixed,
                scrub: false,
                onUpdate: (self) => {
                    if (showCarousel || isAnimatingRef.current) return;

                    const prog = self.progress;
                    const target = Math.min(total - 1, Math.floor(prog * total));

                    if (target !== lastIndexRef.current) {
                        changeSection(target);
                    }

                    if (progressFillRef.current) {
                        progressFillRef.current.style.width = `${(lastIndexRef.current / (total - 1 || 1)) * 100}%`;
                    }
                }
            });

            return () => st.kill();
        }, [total, showCarousel]);

        const changeSection = (to) => {
            if (to === lastIndexRef.current || isAnimatingRef.current) return;
            const from = lastIndexRef.current;
            const direction = to > from ? 1 : -1;
            isAnimatingRef.current = true;
            setIndex(to);

            if (currentNumberRef.current) currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");

            const bgOut = bgRefs.current[from];
            const bgIn = bgRefs.current[to];
            if (bgOut) gsap.to(bgOut, { opacity: 0, yPercent: -5 * direction, duration: 0.7 });
            if (bgIn) {
                gsap.set(bgIn, { opacity: 0, yPercent: 5 * direction, scale: 1.05 });
                gsap.to(bgIn, { opacity: 1, yPercent: 0, scale: 1, duration: 0.7 });
            }

            centerLists(to, true);
            leftItemRefs.current.forEach((el, i) => {
                el.classList.toggle('active', i === to);
                gsap.to(el, { opacity: i === to ? 1 : 0.3, x: i === to ? 10 : 0, duration: 0.5 });
            });
            rightItemRefs.current.forEach((el, i) => {
                el.classList.toggle('active', i === to);
                gsap.to(el, { opacity: i === to ? 1 : 0.3, x: i === to ? -10 : 0, duration: 0.5 });
            });

            setTimeout(() => {
                lastIndexRef.current = to;
                isAnimatingRef.current = false;
            }, 700);
        };

        const handleOpenCarousel = (data) => {
            setActiveCarouselData(data);
            setShowCarousel(true);
        };

        const cssVars = {
            "--fx-font": fontFamily,
            "--fx-text": colors.text,
            "--fx-overlay": colors.overlay,
            "--fx-page-bg": colors.pageBg,
            "--fx-stage-bg": colors.stageBg,
            "--fx-gap": `${gap}rem`,
            "--fx-grid-px": `${gridPaddingX}rem`,
        };

        return (
            <>
                {/* COMPONENT B: THE MODAL */}
                <AnimatedCarouselModal
                    isOpen={showCarousel}
                    onClose={() => setShowCarousel(false)}
                    sections={activeCarouselData}
                />

                {/* COMPONENT A: THE PAGE */}
                <div className="fx" style={{ ...cssVars, ...style }} ref={ref}>

                    <div className="fx-fixed-section" ref={fixedSectionRef}>
                        <div className="fx-fixed" ref={fixedRef}>

                            {/* BACKGROUNDS */}
                            <div className="fx-bgs">
                                {sections.map((s, i) => (
                                    <div key={i} className="fx-bg">
                                        <img ref={el => bgRefs.current[i] = el} src={s.background} className="fx-bg-img" alt="" />
                                        <div className="fx-bg-overlay" />
                                    </div>
                                ))}
                            </div>

                            {/* CONTENT GRID */}
                            <div className="fx-grid">
                                {header && <div className="fx-header">{header}</div>}

                                <div className="fx-content">

                                    {/* LEFT LIST */}
                                    <div className="fx-left">
                                        <div className="fx-track" ref={leftTrackRef}>
                                            {sections.map((s, i) => (
                                                <div key={i}
                                                    ref={el => leftItemRefs.current[i] = el}
                                                    className={`fx-item fx-left-item ${i === index ? 'active' : ''}`}
                                                    onClick={() => !isAnimatingRef.current && changeSection(i)}
                                                >
                                                    {s.leftLabel}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CENTER AREA */}
                                    <div className="fx-center">
                                        {sections.map((s, i) => {
                                            const isActive = i === index;
                                            if (!isActive) return null;

                                            if (s.carouselData && s.carouselData.length > 0) {
                                                return (
                                                    <div key={`c-${i}`} className="fx-center-content">
                                                        <MiniCarousel
                                                            images={s.carouselData.map(d => d.img)}
                                                            onOpen={() => handleOpenCarousel(s.carouselData)}
                                                        />
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={`t-${i}`} className="fx-center-content">
                                                    <h3 className="fx-title">
                                                        {typeof s.title === 'string' ? splitWords(s.title) : s.title}
                                                    </h3>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* RIGHT LIST */}
                                    <div className="fx-right">
                                        <div className="fx-track" ref={rightTrackRef}>
                                            {sections.map((s, i) => (
                                                <div key={i}
                                                    ref={el => rightItemRefs.current[i] = el}
                                                    className={`fx-item fx-right-item ${i === index ? 'active' : ''}`}
                                                    onClick={() => !isAnimatingRef.current && changeSection(i)}
                                                >
                                                    {s.rightLabel}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* FOOTER */}
                                <div className="fx-footer">
                                    {footer && <div className="fx-footer-text">{footer}</div>}
                                    {showProgress && (
                                        <div className="fx-progress">
                                            <div className="fx-nums">
                                                <span ref={currentNumberRef}>{String(index + 1).padStart(2, '0')}</span>
                                                <span>{String(total).padStart(2, '0')}</span>
                                            </div>
                                            <div className="fx-bar"><div className="fx-fill" ref={progressFillRef}></div></div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                    <style jsx>{`
            .fx { width: 100%; background: var(--fx-page-bg); color: var(--fx-text); font-family: var(--fx-font); }
            .fx-fixed-section { height: ${total * 100}vh; }
            .fx-fixed { position: sticky; top: 0; height: 100vh; overflow: hidden; }
            
            .fx-bgs { position: absolute; inset: 0; z-index: 0; background: #000; }
            .fx-bg { position: absolute; inset: 0; }
            .fx-bg-img { width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.05); }
            .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }

            .fx-grid { 
               position: relative; z-index: 1; height: 100%; 
               display: grid; grid-template-columns: repeat(12, 1fr); 
               padding: 0 var(--fx-grid-px); gap: var(--fx-gap);
            }

            .fx-header { grid-column: 1 / -1; text-align: center; padding-top: 4vh; font-size: 2rem; font-weight: bold; }

            .fx-content { 
               grid-column: 1 / -1; align-self: center; height: 60vh;
               display: grid; grid-template-columns: 1fr 1.5fr 1fr;
               align-items: center;
            }

            .fx-left, .fx-right { height: 100%; overflow: hidden; display: grid; align-items: center; }
            .fx-left { justify-items: start; }
            .fx-right { justify-items: end; }
            
            .fx-item { 
               padding: 10px 0; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; 
               opacity: 0.3; cursor: pointer; transition: opacity 0.3s; white-space: nowrap;
            }
            .fx-item.active { opacity: 1; }
            .fx-left-item.active::before { content: '•'; margin-right: 10px; color: var(--fx-text); }
            .fx-right-item.active::after { content: '•'; margin-left: 10px; color: var(--fx-text); }

            .fx-center { display: grid; place-items: center; text-align: center; height: 100%; }
            .fx-center-content { width: 100%; display: flex; justify-content: center; }
            .fx-title { font-size: clamp(2rem, 5vw, 5rem); margin: 0; line-height: 1; text-transform: uppercase; }
            .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: bottom; }
            .fx-word { display: inline-block; animation: wordUp 0.8s cubic-bezier(0.2, 0.0, 0.2, 1) forwards; transform: translateY(100%); }
            
            @keyframes wordUp { to { transform: translateY(0); } }

            .fx-footer { grid-column: 1 / -1; align-self: end; padding-bottom: 4vh; display: flex; flex-direction: column; align-items: center; }
            .fx-footer-text { font-size: 3rem; font-weight: 900; text-transform: uppercase; margin-bottom: 20px; }
            .fx-progress { width: 200px; }
            .fx-nums { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 5px; }
            .fx-bar { width: 100%; height: 2px; background: rgba(255,255,255,0.3); position: relative; }
            .fx-fill { height: 100%; background: var(--fx-text); width: 0%; transition: width 0.3s; }
          `}</style>
                </div>
            </>
        );
    }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";