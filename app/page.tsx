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
  const [backendBanners, setBackendBanners] = useState<any[]>([]);
  
  const staticCount = 5; // number of hard-coded slides
  const totalSlides = staticCount + backendBanners.length;

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Fetch Banners
  useEffect(() => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((data) => {
        if (data?.banners && Array.isArray(data.banners) && data.banners.length > 0) {
          setBackendBanners(data.banners);
        }
      })
      .catch((err) => console.error("Failed to fetch banners", err));
  }, []);

  return (
    <main className="min-h-screen font-sans">
      <Navbar />

      {/* HERO */}
      <section className="
        relative w-full
        mt-[15px] md:mt-[140px] lg:mt-[2px]
        min-h-[558px] md:min-h-[600px] lg:min-h-[690px]
        flex items-center overflow-hidden
      ">
        
        {/* --- STATIC BANNER 1 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 0 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image 
              src="/assets/Banners/1.png" 
              alt="Hero 1 Desktop" 
              fill 
              priority 
              className="object-cover" 
              sizes="100vw"
            />
          </div>
          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <Image 
              src="/assets/Banners/mobile1.png" 
              alt="Hero 1 Mobile" 
              fill 
              priority 
              className="object-cover" 
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 bg-black/40" />
          
          {/* CONTENT */}
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

        {/* --- STATIC BANNER 2 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 1 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <div className="hidden md:block absolute inset-0">
            <Image src="/assets/Banners/2.png" alt="Hero 2 Desktop" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image src="/assets/Banners/mobile2.png" alt="Hero 2 Mobile" fill className="object-cover" sizes="100vw" />
          </div>

          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute bottom-16 left-0 w-full z-20 flex justify-center text-center px-6">
            <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
              The Minds Behind The Movement.
            </h2>
          </div>
        </div>
        

        {/* --- STATIC BANNER 3 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 2 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
           <div className="hidden md:block absolute inset-0">
            <Image src="/assets/Banners/3.png" alt="Hero 3 Desktop" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image src="/assets/Banners/mobile3.png" alt="Hero 3 Mobile" fill className="object-cover" sizes="100vw" />
          </div>

          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute bottom-16 left-0 w-full z-20 flex flex-col items-center text-center px-6">
            <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
              <span className="block">SPARTAN</span>
              <span className="block text-xl md:text-3xl lg:text-7xl opacity-90">Official Ball & Kit Partner</span>
              <span className="block text-lg md:text-2xl lg:text-5xl opacity-80">Powering The Game</span>
            </h2>
          </div>
        </div>

        {/* --- STATIC BANNER 4 (Nutrition) --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 3 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
           <div className="hidden md:block absolute inset-0">
            <Image src="/assets/Banners/5.png" alt="Hero 4 Desktop" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image src="/assets/Banners/mobile5.png" alt="Hero 4 Mobile" fill className="object-cover" sizes="100vw" />
          </div>

          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute bottom-16 left-0 w-full z-20 flex justify-center text-center px-6">
            <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
              Official Nutrition & Diet Partner
            </h2>
          </div>
        </div>

        {/* --- STATIC BANNER 5 --- */}
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${current === 4 ? "opacity-100 z-10" : "opacity-0 z-0"}`}>
          <div className="hidden md:block absolute inset-0">
            <Image src="/assets/Banners/4.png" alt="Hero 5 Desktop" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image src="/assets/Banners/mobile4.png" alt="Hero 5 Mobile" fill className="object-cover" sizes="100vw" />
          </div>
        </div>

        {/* --- DYNAMIC BACKEND BANNERS --- */}
        {backendBanners.map((banner: any, index: number) => {
          const globalIndex = staticCount + index; // Start counting after static banners
          const isActive = current === globalIndex;
          
          return (
            <div 
              key={banner._id || `backend-${index}`} 
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              {/* Laptop Image (Hidden on Mobile) */}
              <div className="hidden md:block absolute inset-0">
                <Image 
                  src={banner.laptopSrc} 
                  alt={banner.title || "Banner Desktop"} 
                  fill 
                  className="object-cover" 
                  sizes="100vw"
                />
              </div>

              {/* Mobile Image (Hidden on Laptop) */}
              <div className="block md:hidden absolute inset-0">
                <Image 
                  src={banner.mobileSrc} 
                  alt={banner.title || "Banner Mobile"} 
                  fill 
                  className="object-cover" 
                  sizes="100vw"
                />
              </div>

              {/* Optional Overlay & Title */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-16 left-0 w-full z-20 flex justify-center text-center px-6">
                {banner.title && (
                  <h2 className="text-white font-norch text-2xl md:text-4xl lg:text-8xl leading-wide">
                    {banner.title}
                  </h2>
                )}
              </div>
            </div>
          );
        })}

        {/* Social Icons & Mobile SVG */}
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