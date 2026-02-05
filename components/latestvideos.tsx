"use client";

import Image from "next/image";
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

  useEffect(() => {
    if (!videoRef.current) return;
    isActive
      ? videoRef.current.play().catch(() => onPlay(null))
      : videoRef.current.pause();
  }, [isActive, onPlay]);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden bg-black group cursor-pointer"
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
        <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center">
          {isActive ? <FaPause className="text-white text-xl" /> : <FaPlay className="text-white text-xl ml-1" />}
        </div>
      </div>

      {/* Mute */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMuted(!isMuted);
          if (videoRef.current) videoRef.current.muted = !isMuted;
        }}
        className="absolute bottom-4 right-4 z-30 w-9 h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
      >
        {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
      </button>

      {/* Title */}
      <div className={`absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent transition-opacity ${isActive ? "opacity-0" : "opacity-100"}`}>
        <p className="text-white text-xs font-semibold uppercase tracking-wider">
          {video.title}
        </p>
      </div>
    </div>
  );
};

export default function LatestVideos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const visibleCards = 3;
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
    <div className="pt-48 md:pt-40 max-w-7xl mx-auto px-6 md:px-10 relative">
      {/* Heading */}
      <div className="flex flex-col items-center md:items-start mb-12 pt-10">
        <h2 className="text-5xl md:text-7xl uppercase text-white font-norch mb-2 tracking-wide">
          Latest Videos
        </h2>
        <div className="md:w-60 w-40 h-1 bg-[#3B3BB7] rounded-full" />
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center text-white/50 hover:text-white"
        >
          <FaChevronLeft size={30} />
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
        <div
          className="rounded-2xl "
          style={{ aspectRatio: "599 / 336.95" }}
        >
          <InlineVideoCard
            video={video}
            isActive={activeVideoId === video.id}
            onPlay={(id) => setActiveVideoId(id)}
          />
        </div>
      </div>
    ))}
  </motion.div>
</div>


        {/* Right */}
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center text-white/50 hover:text-white"
        >
          <FaChevronRight size={30} />
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
