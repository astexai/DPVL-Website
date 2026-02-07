"use client";

import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const videos = [
  { id: 1, title: "DPVL Set for Biggest Season Yet", image: "/assets/videos/thumbnails/Video1.jpg", videoSrc: "/assets/videos/Video1.mp4" },
  { id: 2, title: "Team Gear Up", image: "/assets/videos/thumbnails/Video2.jpg", videoSrc: "/assets/videos/Video2.mp4" },
  { id: 3, title: "League Ambition", image: "/assets/videos/thumbnails/Video3.jpg", videoSrc: "/assets/videos/Video3.mp4" },
  { id: 4, title: "Skill Highlights", image: "/assets/videos/thumbnails/Video4.jpg", videoSrc: "/assets/videos/Video4.mp4" },
  { id: 5, title: "DPVL Health & Fitness Guidelines", image: "/assets/videos/thumbnails/Video5.jpg", videoSrc: "/assets/videos/Video5.mp4" },
  { id: 6, title: "DPVL Health & Fitness Guidelines", image: "/assets/videos/thumbnails/Video6.jpg", videoSrc: "/assets/videos/Video6.mp4" },
  { id: 7, title: "DPVL Health & Fitness Guidelines", image: "/assets/videos/thumbnails/Video7.jpg", videoSrc: "/assets/videos/Video7.mp4" },
  { id: 8, title: "DPVL Health & Fitness Guidelines", image: "/assets/videos/thumbnails/Video8.jpg", videoSrc: "/assets/videos/Video8.mp4" },
];

const InlineVideoCard = ({
  video,
  isActive,
  onPlay,
}: {
  video: any;
  isActive: boolean;
  onPlay: (id: number | null) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isActive) {
      videoRef.current.play().catch(() => onPlay(null));
    } else {
      videoRef.current.pause();
    }
  }, [isActive, onPlay]);

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden bg-black group cursor-pointer"
      onClick={() => (isActive ? onPlay(null) : onPlay(video.id))}
    >
      <video
        ref={videoRef}
        src={video.videoSrc}
        poster={video.image}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
      />

      {/* Play / Pause */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isActive ? "opacity-0 hover:opacity-100" : "opacity-100"}`}>
        <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center`}>
          {isActive ? (
            <FaPause className={`text-white ${isMobile ? 'text-base' : 'text-xl'}`} />
          ) : (
            <FaPlay className={`text-white ${isMobile ? 'text-base ml-1' : 'text-xl ml-1'}`} />
          )}
        </div>
      </div>

      {/* Mute */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
          if (videoRef.current) videoRef.current.muted = !isMuted;
        }}
        className={`absolute ${isMobile ? 'bottom-3 right-3 w-8 h-8' : 'bottom-4 right-4 w-10 h-10'} z-30 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20`}
      >
        {isMobile ? (
          isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />
        ) : (
          isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />
        )}
      </button>

      {/* Title */}
      <div className={`absolute bottom-0 left-0 w-full ${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-t from-black/70 to-transparent transition-opacity ${isActive ? "opacity-0" : "opacity-100"}`}>
        <p className={`text-white ${isMobile ? 'text-xs font-medium' : 'text-sm font-semibold'} uppercase tracking-wider line-clamp-2`}>
          {video.title}
        </p>
      </div>
    </div>
  );
};

export default function LatestVideos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show 3 videos on desktop, 1 on mobile (same as reference)
  const visibleCards = isMobile ? 1 : 3;
  const maxIndex = videos.length - visibleCards;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setActiveVideoId(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setActiveVideoId(null);
  };

  return (
    <div className="pt-48 md:pt-40 max-w-[1400px] mx-auto px-6 relative">
      {/* Heading */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-5xl md:text-7xl uppercase text-white font-norch mb-2 tracking-wide">
          Latest Videos
        </h2>
        <div className="md:w-60 w-40 h-1 bg-[#3B3BB7] rounded-full" />
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow - At start of video box */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition-all"
        >
          <FaChevronLeft size={isMobile ? 18 : 24} />
        </button>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${(100 / visibleCards) * currentIndex}%` }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex"
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 px-3 md:px-4"
                style={{
                  width: `${100 / visibleCards}%`,
                }}
              >
                {/* Video Container with exact same size as reference */}
                <div
                  className="relative group w-full bg-gradient-to-br from-[#d66095] to-[#7b1fa2] p-[3px] rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                  style={{ aspectRatio: '599 / 336.95' }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                    <InlineVideoCard
                      video={video}
                      isActive={activeVideoId === video.id}
                      onPlay={(id) => setActiveVideoId(id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Arrow - At end of video box */}
        <button
          onClick={nextSlide}
          className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition-all"
        >
          <FaChevronRight size={isMobile ? 18 : 24} />
        </button>
      </div>

      {/* View More */}
      <div className="flex justify-center mt-12">
        <Link href="/dpvl-tv">
          <button className="bg-[#3B3BB7] hover:bg-[#2A2A8A] text-white px-10 py-3 rounded-lg font-bold tracking-widest text-sm transition-all shadow-lg hover:scale-105 active:scale-95">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}