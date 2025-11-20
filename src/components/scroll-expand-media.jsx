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
  const bgRef = useRef(null);
  const textContentRef = useRef(null);
  const contentSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // How long the expansion scroll lasts (200% of viewport height)
          end: "+=200%", 
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the video while it expands
        },
      });

      // 1. Background fades out as video gets bigger
      tl.to(bgRef.current, { opacity: 0 }, 0);

      // 2. Media expands from small centered size to FULL SCREEN
      tl.fromTo(
        mediaWrapperRef.current,
        {
          width: "60vw",  // Starting width
          height: "50vh", // Starting height
          borderRadius: "1rem",
        },
        {
          width: "100vw", // Final width (covers screen)
          height: "100vh",// Final height (covers screen)
          borderRadius: "0rem",
          ease: "power2.inOut",
        },
        0
      );

      // 3. Fade out the title text so it doesn't block the full screen video
      tl.to(textContentRef.current, { opacity: 0, y: -50 }, 0.5);

      // 4. Prepare the content section to appear after unpinning
      // (GSAP handles the pin spacing, so this naturally flows after)
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const firstWord = title?.split(" ")[0] || "";
  const restOfTitle = title?.split(" ").slice(1).join(" ") || "";

  return (
    <div className="w-full bg-black text-white">
      
      {/* PINNED SECTION */}
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden"
      >
        {/* BACKGROUND IMAGE (Fades out) */}
        <div ref={bgRef} className="absolute inset-0 z-0">
          {bgImageSrc && (
            <>
              <img
                src={bgImageSrc}
                className="w-full h-full object-cover"
                alt="Background"
              />
              <div className="absolute inset-0 bg-black/60" />
            </>
          )}
        </div>

        {/* CENTER MEDIA (Expands to full screen) */}
        <div
          ref={mediaWrapperRef}
          className="relative z-10 overflow-hidden shadow-2xl"
          style={{ 
            // Initial sizes set in GSAP, but defaults here prevent FOUC
            width: '60vw', 
            height: '50vh' 
          }} 
        >
          {mediaType === "video" ? (
            mediaSrc.includes("youtube.com") ? (
              <iframe
                src={mediaSrc.replace("watch?v=", "embed/") + "?autoplay=1&mute=1&loop=1&playlist=" + mediaSrc.split("v=")[1]}
                className="w-full h-full object-cover"
                allow="autoplay; encrypted-media"
                title="Video"
              />
            ) : (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <img
              src={mediaSrc}
              className="w-full h-full object-cover"
              alt={title}
            />
          )}
        </div>

        {/* OVERLAY TEXT (Fades out during scroll) */}
        <div
          ref={textContentRef}
          className="absolute z-20 pointer-events-none flex flex-col items-center justify-center inset-0"
        >
           {/* Title Wrapper to push it below or above video if needed, 
               or centered on top of video initially */}
           <div className={`text-center ${textBlend ? "mix-blend-difference" : ""}`}>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                {firstWord} <span className="text-blue-400">{restOfTitle}</span>
              </h2>
              
              <div className="mt-4 flex items-center gap-4 text-blue-200 font-mono text-sm">
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

      {/* SCROLLABLE CONTENT (Appears naturally after the pin finishes) */}
      <section
        ref={contentSectionRef}
        className="relative z-30 bg-black w-full px-6 py-24 md:px-12"
      >
        <div className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-300">
          {children}
        </div>
      </section>
    </div>
  );
}