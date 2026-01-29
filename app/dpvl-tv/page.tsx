'use client';

import React, { useRef, useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Image from "next/image";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

// Reusable Video Component remains same
const VideoCard = ({ 
  video, 
  isActive, 
  onPlay 
}: { 
  video: any, 
  isActive: boolean, 
  onPlay: (id: number | null) => void 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => onPlay(null));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, onPlay]);

  const handleTogglePlay = () => {
    if (isActive) onPlay(null);
    else onPlay(video.id);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-black group">
      {video.videoSrc ? (
        <div className="w-full h-full relative cursor-pointer" onClick={handleTogglePlay}>
          <video
            ref={videoRef}
            src={video.videoSrc}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className={`w-14 h-14 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center shadow-xl transition-all group-hover:bg-white/30 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
              {isActive ? <FaPause className="text-white text-xl" /> : <FaPlay className="text-white text-xl ml-1" />}
            </div>
          </div>
          <button 
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-30 w-9 h-9 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
          >
            {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </button>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <Image src={video.image} alt="Thumbnail" fill className="object-cover opacity-80" />
        </div>
      )}
      {video.title && (
        <div className={`absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity ${isActive ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-white text-xs font-medium leading-tight">{video.title}</p>
        </div>
      )}
    </div>
  );
};

const Page = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  useEffect(() => {
    setHasMounted(true);
    setActiveVideoId(1);
  }, []);

  const videos = [
    { id: 1, title: "DPVL Set for Biggest Season Yet", image: "/assets/footerimg.jpg", videoSrc: "/test.mp4" },
    { id: 2, title: "Team Gear Up", image: "/assets/image.png", videoSrc: "/test.mp4" },
    { id: 3, title: "League Ambition", image: "/assets/footerimg.jpg", videoSrc: "/test.mp4" },
    { id: 4, title: "Skill Highlights", image: "/assets/footerimg.jpg", videoSrc: "/test.mp4" },
    { id: 5, title: "DPVL Health & Fitness Guidelines", image: "/assets/footerimg.jpg", videoSrc: "/test.mp4" },
  ];

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <Heroo title="DPVL TV" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />
      <FooterGrad variant="cropped" height={20}/>
      <section className="relative w-full py-16 px-4 bg-[#3b3bb7] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/assets/bg/DpvlTv.png" alt="Background Texture" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white mb-2 tracking-tight">DPVL TV</h2>
            <div className="w-20 h-1 bg-[#d9534f] shadow-[0_0_10px_#d9534f]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
            {videos.map((video) => (
              <div 
                key={video.id} 
                // We keep the card width fixed at 335px and use margin-auto for small screens
                className="relative group w-full max-w-[335px] mx-auto bg-gradient-to-br from-[#d66095] to-[#7b1fa2] p-[2px] rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                style={{ aspectRatio: '335 / 595.65' }}
              >
                <VideoCard 
                  video={video} 
                  isActive={activeVideoId === video.id} 
                  onPlay={(id) => setActiveVideoId(id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterGrad />
      <Footer />
    </main>
  );
};

export default Page;