import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExpandMedia({
    mediaType = "video",
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title,
    date,
    scrollToExpand,
    textBlend,
    children,
}) {
    const containerRef = useRef(null);
    const mediaWrapperRef = useRef(null);
    const textContentRef = useRef(null);
    const contentSectionRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Setup the timeline linked to the main container's scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });

            // --- Animation Phase 1: Expansion (0% - 40% of scroll) ---

            // Fade out background image
            tl.to(bgRef.current, { opacity: 0, duration: 1 }, 0);

            // Fade out title text
            tl.to(textContentRef.current, { opacity: 0, y: -50, duration: 1 }, 0);

            // Expand Video to Full Screen
            tl.fromTo(
                mediaWrapperRef.current,
                {
                    width: "60vw",
                    height: "50vh",
                    borderRadius: "1rem",
                },
                {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0rem",
                    ease: "power2.inOut",
                    duration: 2, // Takes up more timeline space
                },
                0
            );

            // --- Animation Phase 2: Content Appearance (Optional Parallax) ---
            // We don't need to animate the content section here because
            // we are using CSS sticky positioning to let it naturally scroll over.

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const firstWord = title?.split(" ")[0] || "";
    const restOfTitle = title?.split(" ").slice(1).join(" ") || "";

    return (
        // MAIN CONTAINER: Determines total scroll height (300vh ensures long scroll)
        <div
            ref={containerRef}
            className="relative w-full bg-black text-white"
            style={{ height: "300vh" }}
        >

            {/* STICKY LAYER: Holds the Media. It stays fixed while we scroll through the main container */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">

                {/* Background Fading Image */}
                <div ref={bgRef} className="absolute inset-0 z-0">
                    {bgImageSrc && (
                        <>
                            <img src={bgImageSrc} className="w-full h-full object-cover opacity-50" alt="bg" />
                            <div className="absolute inset-0 bg-black/60" />
                        </>
                    )}
                </div>

                {/* The Expandable Media */}
                <div
                    ref={mediaWrapperRef}
                    className="relative z-10 overflow-hidden shadow-2xl bg-gray-900"
                    style={{ width: "60vw", height: "50vh" }}
                >
                    {mediaType === "video" ? (
                        <video
                            src={mediaSrc}
                            poster={posterSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img src={mediaSrc} className="w-full h-full object-cover" alt={title} />
                    )}
                    {/* Dark Overlay on the video itself to make text readable when it scrolls over */}
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                </div>

                {/* Title Text (Fades out) */}
                <div
                    ref={textContentRef}
                    className="absolute z-20 pointer-events-none flex flex-col items-center justify-center inset-0"
                >
                    <div className={`text-center ${textBlend ? "mix-blend-difference" : ""}`}>
                        <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight uppercase">
                            {firstWord} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">{restOfTitle}</span>
                        </h2>
                        <div className="mt-6 flex items-center justify-center gap-4 text-gray-300 font-mono text-sm uppercase tracking-widest">
                            {date && <span>{date}</span>}
                            {scrollToExpand && (
                                <>
                                    <span>•</span>
                                    <span className="animate-pulse">{scrollToExpand} ↓</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* SCROLLING CONTENT LAYER: Appears at the bottom of the container */}
            {/* We position this absolutely at the bottom or give it a massive top margin 
          so it enters view AFTER the video has expanded. */}
            <div className="relative z-30 w-full flex flex-col justify-end" style={{ marginTop: "-80vh" }}>

                {/* Spacer to push content down so video expands first */}
                <div className="h-[50vh] w-full pointer-events-none"></div>

                {/* Actual Content - with a background to wipe over the video */}

            </div>
        </div>
    );
}