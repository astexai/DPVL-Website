"use client";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FooterGrad from "../components/footergrad";
import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCalendarAlt, FaMapMarkerAlt, FaPlay } from "react-icons/fa";
import Pointstable from "../components/pointstable";
import TeamsCarousel from "@/components/teams";
import LatestNews from "@/components/latestnews";
import PartnersSponsors from "@/components/partners";
import LatestVideos from "@/components/latestvideos";
import Socials from "@/components/socials";
import ScheduleCard from "@/components/ScheduleCard";
import MobileSvg from "@/components/MobileSvg";

export default function Home() {
  // Carousel Data
  const slides = [
    {
      id: 1,
      title: ["WELCOME TO THE", "OFFICIAL WEBSITE", "OF DPVL."],
      subtitle:
        "The league that fuels ambition, celebrates skill, and brings volleyball to life.",
      image: "/assets/bg/Hero.png",
      accent: "from-blue-600 to-pink-500",
    },
    {
      id: 2,
      title: ["UNLEASH YOUR", "TRUE POTENTIAL", "ON COURT."],
      subtitle:
        "Join the community of champions and elevate your game to the next level.",
      image: "/assets/bg/Hero.png",
      accent: "from-purple-600 to-blue-500",
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
          <div className=" absolute inset-0 w-full h-full">
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
          <MobileSvg />

          {/* Decorative court line (Shared for both) */}
          <div className="absolute bottom-[35%] w-full h-[2px] bg-white/20 blur-[1px]" />
        </div>

        {/* Content Layer */}
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16 relative z-10 h-full flex items-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`flex flex-col md:flex-row items-center justify-between w-full transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"}`}
            >
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-0 z-20">
                <h1 className="text-white font-sans font-bold font-mokoto text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide mb-6">
                  {slide.title.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
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

        <Socials />

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
        <div className="w-full h-32 md:h-48 bg-gray-50" />

        <ScheduleCard />
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
