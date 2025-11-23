import React, { useLayoutEffect } from "react";
import ScrollExpandMedia from "../components/ScrollExpandMedia";
import PortfolioScroll from "../components/PortfolioScroll";
import { FullScreenScrollFX } from "../components/FullScreenScrollFX";

// Data for the DemoOne / FullScreenScrollFX component
const fxSections = [
  {
    background: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920",
    title: "Digital Ecosystems",
    leftLabel: "01. Strategy",
    rightLabel: "React / Node",
  },
  {
    background: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920",
    title: "Cyber Security",
    leftLabel: "02. Protection",
    rightLabel: "Python / Go",
  },
  {
    background: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&q=80&w=1920",
    title: "Data Visualization",
    leftLabel: "03. Analytics",
    rightLabel: "D3 / WebGL",
  },
  {
    background: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1920",
    title: "Cloud Infrastructure",
    leftLabel: "04. Scale",
    rightLabel: "AWS / Docker",
  },
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
          sections={fxSections}
          header={
            <div className="text-white text-xl font-bold tracking-tighter">
              AGENCY<span className="text-blue-500">.IO</span>
            </div>
          }
          footer={
            <div className="text-gray-400 text-sm">
              © 2025 All Rights Reserved.
            </div>
          }
        />
      </div>
    </div>
  );
}