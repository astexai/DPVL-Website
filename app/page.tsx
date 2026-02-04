"use client";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FooterGrad from "../components/footergrad";
import { useState, useEffect } from "react";
import Image from "next/image";

import Pointstable from "../components/pointstable";
import TeamsCarousel from "@/components/teams";
import LatestNews from "@/components/latestnews";
import PartnersSponsors from "@/components/partners";
import Socials from "@/components/socials";
import ScheduleCard from "@/components/ScheduleCard";
import MobileSvg from "@/components/MobileSvg";
import Link from "next/link";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen font-sans">
      <Navbar />

      {/* HERO */}
      <section className="
        relative w-full
        mt-[120px] md:mt-[140px] lg:mt-[132px]
        min-h-[550px] md:min-h-[600px] lg:min-h-[690px]
        flex items-center overflow-hidden
      ">
        
        {/* --- BANNER 1 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <Image src="/assets/Banners/1.png" alt="Hero 1" fill priority className="object-fit" />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* CONTENT: CENTERED */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
              A Movement Shaping The <br /> Future Of Volleyball.
            </h2>
            <Link href={"/about-us"}>
            <button className="mt-10 px-8 py-3 border-3 border-white text-white backdrop-blur-xs font-norch text-lg md:text-2xl rounded-2xl shadow-lg hover:scale-105 transition-transform active:scale-95">
              Explore Now
            </button>
            </Link>
          </div>
        </div>

        {/* --- BANNER 2 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <Image src="/assets/Banners/2.png" alt="Hero 2" fill className="object-fit" />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* CONTENT: BOTTOM CENTER */}
          <div className="absolute bottom-16 left-0 w-full z-20 flex justify-center text-center px-6">
            <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
              The Minds Behind The Movement.
            </h2>
          </div>
        </div>

        {/* --- BANNER 3 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 2 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <Image src="/assets/Banners/3.png" alt="Hero 3" fill className="object-fit" />
          <div className="absolute inset-0 bg-black/40" />
          
          {/* CONTENT: BOTTOM CENTER */}
          <div className="absolute bottom-16 left-0 w-full z-20 flex flex-col items-center text-center px-6">
            <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
              <span className="block">SPARTAN</span>
              <span className="block text-xl md:text-3xl lg:text-7xl opacity-90">Official Ball & Kit Partner</span>
              <span className="block text-lg md:text-2xl lg:text-5xl opacity-80">Powering The Game</span>
            </h2>
          </div>
        </div>

        {/* Social Icons & Mobile SVG remain constant */}
        <Socials />
        <MobileSvg />
      </section>

      {/* PAGE CONTENT */}
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