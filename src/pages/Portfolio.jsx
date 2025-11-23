import React, { useLayoutEffect } from "react";
import ScrollExpandMedia from "../components/ScrollExpandMedia";
import PortfolioScroll from "../components/PortfolioScroll";
import { FullScreenScrollFX } from "../components/FullScreenGallery";
// Data for the DemoOne / FullScreenScrollFX component
const sections = [
  {
    background: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600",
    leftLabel: "Intro",
    title: "Welcome",
    rightLabel: "01"
  },
  {
    background: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1600",
    leftLabel: "Gallery",
    rightLabel: "02",
    title: "Ignored Title",
    carouselData: [
      { text: "Whispers of Radiance", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800" },
      { text: "Ethereal Moments", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800" },
      { text: "Silent Beauty", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800" }
    ]
  },

  // ---------------------------
  // ⭐ NEW SECTION 03 — Cinematic
  // ---------------------------
  {
    background: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600",
    leftLabel: "Cinematic",
    title: "Visual Stories",
    rightLabel: "03"
  },

  // ---------------------------
  // ⭐ NEW SECTION 04 — Portrait Carousel
  // ---------------------------
  {
    background: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600",
    leftLabel: "Portraits",
    rightLabel: "04",
    carouselData: [
      { text: "Soft Glow", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800" },
      { text: "Dreamlight", img: "https://images.unsplash.com/photo-1500048993959-d6e8c6449e2d?auto=format&fit=crop&w=800" },
      { text: "Golden Hour", img: "https://images.unsplash.com/photo-1520975918319-6c5903ed6ffd?auto=format&fit=crop&w=800" }
    ]
  },

  // ---------------------------
  // ⭐ NEW SECTION 05 — Nature
  // ---------------------------
  {
    background: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600",
    leftLabel: "Nature",
    title: "Serenity in Frames",
    rightLabel: "05"
  },

  // ---------------------------
  // ⭐ NEW SECTION 06 — Automotive Carousel
  // ---------------------------
  {
    background: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600",
    leftLabel: "Automotive",
    rightLabel: "06",
    carouselData: [
      { text: "Speed & Motion", img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800" },
      { text: "Chrome Dreams", img: "https://images.unsplash.com/photo-1518558400712-1824ac51eaa6?auto=format&fit=crop&w=800" },
      { text: "Precision Lines", img: "https://images.unsplash.com/photo-1549921296-3ec93abae235?auto=format&fit=crop&w=800" }
    ]
  },

  // ---------------------------
  // ⭐ NEW SECTION 07 — Finale
  // ---------------------------
  {
    background: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600",
    leftLabel: "Contact",
    title: "Let’s Create Together",
    rightLabel: "07"
  }
];



export default function Portfolio() {
  return (
    <div className="bg-black min-h-screen w-full">
      {/* 1. Hero / Expand Media Section */}
      <div>
        <ScrollExpandMedia
          mediaType="video"
          // Using a generic background video or placeholder
          mediaSrc="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
          posterSrc="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1920&q=80"
          bgImageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          title="Infinite Horizon"
          date="EST 2025"
          scrollToExpand="Scroll to Dive In"
          textBlend={true}
        >
          {/* Content appearing after the video scroll finishes */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">The Beginning</h3>
            <p>
              We craft digital experiences that transcend the ordinary. By merging
              cutting-edge technology with immersive design, we build worlds that
              captivate and inspire.
            </p>
            <p>
              Continue scrolling to explore our selected works and core services.
            </p>
          </div>
        </ScrollExpandMedia>
      </div>

      {/* 2. Portfolio Cards Scroll Section */}
      <div>
        <PortfolioScroll />
      </div>

      {/* 3. DemoOne (Full Screen FX) Section */}
      <div className="relative z-10">
        <FullScreenScrollFX sections={sections} header="MY BRAND" />
      </div>
    </div>
  );
}