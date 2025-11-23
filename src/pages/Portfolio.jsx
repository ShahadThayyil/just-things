import React, { useLayoutEffect } from "react";
import ScrollExpandMedia from "../components/ScrollExpandMedia";
import PortfolioScroll from "../components/PortfolioScroll";
import { FullScreenScrollFX } from "../components/FullScreenScrollFX";

// Data for the DemoOne / FullScreenScrollFX component
const sections = [
  {
    leftLabel: "Silence",
    title: <>Absence</>,
    rightLabel: "Silence",
    background: "https://images.pexels.com/photos/3289156/pexels-photo-3289156.jpeg?cs=srgb&dl=pexels-alexfu-3289156.jpg&fm=jpg&_gl=1*1acr8i7*_ga*MTI3MjA2NDU0Mi4xNzU1NzM3ODI5*_ga_8JE65Q40S6*czE3NTU3NjkyMzgkbzMkZzEkdDE3NTU3Njk1MTckajYwJGwwJGgw",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: "Essence",
    title: <>Stillness</>,
    rightLabel: "Essence",
    background: "https://images.pexels.com/photos/163790/at-night-under-a-lantern-guy-night-city-163790.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Rebirth",
    title: <>Growth</>,
    rightLabel: "Rebirth",
    background: "https://images.pexels.com/photos/9817/pexels-photo-9817.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Change",
    title: <>Opportunity</>,
    rightLabel: "Change",
    background: "https://images.pexels.com/photos/939807/pexels-photo-939807.jpeg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  // ...
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
        <FullScreenScrollFX
          sections={sections}
          header={<><div>The Creative</div><div>Process</div></>}
          footer={<div></div>}
          showProgress
          durations={{ change: 0.7, snap: 800 }}
        />
      </div>
    </div>
  );
}