"use client";

import React, { useRef, useEffect, useState } from "react";

interface Reel {
  id: number;
  videoPath: string;
}

interface ReelsPlayerProps {
  reels: Reel[];
}

const ReelsPlayer: React.FC<ReelsPlayerProps> = ({ reels }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const children = Array.from(containerRef.current.children) as HTMLElement[];
    const middleScreen = window.innerHeight / 2;

    const inViewIndex = children.findIndex((child) => {
      const rect = child.getBoundingClientRect();
      return rect.top <= middleScreen && rect.bottom >= middleScreen;
    });

    if (inViewIndex !== -1 && inViewIndex !== activeIndex) {
      setActiveIndex(inViewIndex);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoEnd = () => {
    if (activeIndex < reels.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Restart from the first video
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  useEffect(() => {
    // Scroll to the active video programmatically
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children) as HTMLElement[];
      const activeChild = children[activeIndex];
      if (activeChild) {
        activeChild.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll scrollbar-hide snap-y snap-mandatory bg-black"
    >
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className="snap-start flex items-center justify-center bg-white"
           // Fixed size for each video
        >
          <video
            src={reel.videoPath}
            muted={isMuted}
            loop={false} // Don't loop individual videos; we'll handle looping
            autoPlay={index === activeIndex}
            onEnded={handleVideoEnd}
            className="object-cover w-full h-full"
            style={{ height: "100vh", width: "30vw" }}
            controls
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-8 right-8 bg-white/80 text-black px-4 py-2 rounded-lg shadow-lg"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReelsPlayer;
