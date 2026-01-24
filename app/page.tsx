'use client';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FooterGrad from "../components/footergrad";
import  { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FaCalendarAlt, FaMapMarkerAlt, FaPlay } from 'react-icons/fa';
import Pointstable from '../components/pointstable';
import TeamsCarousel from "@/components/teams";
import LatestNews from "@/components/latestnews";
import PartnersSponsors from "@/components/partners";
import LatestVideos from "@/components/latestvideos";
import Socials from "@/components/socials";

export default function Home() {


// Carousel Data
const slides = [
  {
    id: 1,
    title: ["WELCOME TO THE", "OFFICIAL WEBSITE", "OF DPVL."],
    subtitle: "The league that fuels ambition, celebrates skill, and brings volleyball to life.",
    image: "/assets/bg/Hero.png", 
    accent: "from-blue-600 to-pink-500"
  },
  {
    id: 2,
    title: ["UNLEASH YOUR", "TRUE POTENTIAL", "ON COURT."],
    subtitle: "Join the community of champions and elevate your game to the next level.",
    image: "/assets/bg/Hero.png", 
    accent: "from-purple-600 to-blue-500"
  },
];


  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
      <section className="relative w-full min-h-[550px] md:min-h-[600px] lg:min-h-[725px] flex items-center overflow-hidden bg-[#0d1b3e]">
  
  {/* BACKGROUND WRAPPER */}
  <div className="absolute inset-0 w-full h-full z-0">
    
    {/* 1. IMAGE: Visible on sm and up, hidden on mobile */}
    <div className="hidden sm:block absolute inset-0 w-full h-full">
      <Image
        src="/assets/bg/Hero.png" 
        alt="Hero Background"
        fill
        priority
        className="object-center"
      />
      {/* Gradient for Desktop Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#051038]/90 via-[#051038]/60 to-transparent" />
    </div>

    {/* 2. SVG: Visible on mobile, hidden on sm and up */}
    <div className="block sm:hidden absolute inset-0 w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-[#051038] via-[#1a237e] to-[#c2185b]" />
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#c2185b]/60 to-transparent mix-blend-overlay" />
      <svg className="absolute inset-0 w-full h-full mix-blend-overlay opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M20 100 L40 0 L55 0 L35 100 Z" fill="#00aaff" fillOpacity="0.5" />
        <path d="M5 100 L25 0 L30 0 L10 100 Z" fill="#00aaff" fillOpacity="0.3" />
        <path d="M60 100 L80 0 L95 0 L75 100 Z" fill="#ff00cc" fillOpacity="0.5" />
        <path d="M85 100 L95 0 L100 0 L90 100 Z" fill="#ff00cc" fillOpacity="0.6" />
      </svg>
    </div>
    
    {/* Decorative court line (Shared for both) */}
    <div className="absolute bottom-[35%] w-full h-[2px] bg-white/20 blur-[1px]" />
  </div>

  {/* Content Layer */}
  <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16 relative z-10 h-full flex items-center">
    {slides.map((slide, index) => (
      <div 
        key={slide.id}
        className={`flex flex-col md:flex-row items-center justify-between w-full transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'}`}
      >
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-0 z-20">
          <h1 className="text-white font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-6">
            {slide.title.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-light mb-8 max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>
          <button className="relative overflow-hidden group border border-white text-white rounded-full px-8 py-3 font-medium text-lg transition-all hover:bg-white hover:text-[#1a237e]">
            <span className="relative z-10">Explore Now</span>
          </button>
        </div>
      </div>
    ))}
  </div>

  <Socials/>



  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30">
    <button 
      onClick={prevSlide}
      className="w-10 h-10 rounded-full bg-white text-[#a259e6] flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
    >
      <FaChevronLeft size={14} />
    </button>
    <button 
      onClick={nextSlide}
      className="w-10 h-10 rounded-full bg-white text-[#a259e6] flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
    >
      <FaChevronRight size={14} />
    </button>
  </div>
</section>

    <div className="w-full bg-gray-50">
      
     
      <div className="w-full h-32 md:h-48 bg-gray-50"  />

    
      <section className="relative w-full bg-gradient-to-br from-[#d66095] via-[#a259e6] to-[#4a148c] rounded-t-none md:rounded-t-[60px] pb-16 px-4 md:px-0">
        
   
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-20">
          <div className="relative mt-15 sm:mt-0 bg-[#1d2472] rounded-xl overflow-hidden shadow-2xl border-[3px] border-[#D159A3]">
        
            <div className="absolute inset-0">
         
              <Image src="/assets/footerimg.jpg" alt="bg" fill className="object-cover opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 opacity-25 to-blue-800/90" />
            </div>

          
            <div className="relative z-10 flex flex-col items-center justify-center py-10 px-1 text-white">
              
     
              <div className="flex flex-row items-center justify-center gap-4 md:gap-12 w-full mb-6">
            
                <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-right">
                  <span className="text-lg md:text-2xl font-bold uppercase tracking-wider">Team 1</span>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    TBD
                  </div>
                </div>

          
                <div className="flex flex-col items-center">
                  <span className="text-4xl md:text-6xl font-black italic transform -skew-x-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-lg">
                    VS
                  </span>
                </div>

              
                <div className="flex flex-col-reverse md:flex-row items-center gap-3 text-center md:text-left">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    TBD
                  </div>
                  <span className="text-lg md:text-2xl font-bold uppercase tracking-wider">Team 2</span>
                </div>
              </div>

             
              <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm md:text-base font-light text-white/80 mb-6 text-center">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt /> <span>JUNE 13, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt /> <span>VENUE EXAMPLE</span>
                </div>
              </div>

           
              <button className="bg-[#d66095] hover:bg-[#b54a7b] text-white px-6 py-2 rounded text-sm uppercase tracking-wide font-medium shadow-lg transition-colors">
                Match schedule
              </button>
            </div>
          </div>
        </div>

       <LatestVideos/>
      </section>
    </div>
    <Pointstable />
      <FooterGrad />
      <TeamsCarousel />
      <LatestNews />
      <PartnersSponsors />
      <FooterGrad />
      <Footer />
    </main>
  );
}

