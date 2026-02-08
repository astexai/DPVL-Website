"use client";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FooterGrad from "../components/footergrad";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import Pointstable from "../components/pointstable";
import TeamsCarousel from "@/components/teams";
import LatestNews from "@/components/latestnews";
import PartnersSponsors from "@/components/partners";
import Socials from "@/components/socials";
import ScheduleCard from "@/components/ScheduleCard";
import MobileSvg from "@/components/MobileSvg";

// --- CONFIGURATION FOR STATIC BANNERS ---
// You can easily change images and text here
const STATIC_SLIDES = [
  {
    id: "static-1",
    desktopImg: "/assets/Banners/1.png",
    mobileImg: "/assets/Banners/mobile1.png",
    position: "center", // Options: 'center' | 'bottom'
    content: (
      <>
        <h2 className="text-white font-norch text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center drop-shadow-2xl">
          A Movement Shaping The <br /> Future Of Volleyball.
        </h2>
        <Link href={"/about-us"}>
          <button className="mt-8 md:mt-10 px-3 md:px-10 py-2 md:py-3 border-2 border-white text-white backdrop-blur-sm font-norch text-lg md:text-2xl rounded-xl shadow-lg hover:scale-105 transition-transform active:scale-95">
            Explore Now
          </button>
        </Link>
      </>
    ),
  },
  {
    id: "static-2",
    desktopImg: "/assets/Banners/2.png",
    mobileImg: "/assets/Banners/mobile2.png",
    position: "bottom",
    content: (
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4">
        <h2 className="text-white font-norch text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center drop-shadow-2xl">
          The Minds Behind The Movement.
        </h2>
      </div>
    ),
  },
  {
    id: "static-3",
    desktopImg: "/assets/Banners/3.png",
    mobileImg: "/assets/Banners/mobile3.png",
    position: "bottom",
    content: (
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4">
        <div className="flex flex-col items-center text-center drop-shadow-2xl">
          <h2 className="text-white font-norch text-4xl md:text-6xl lg:text-8xl">
            SPARTAN
          </h2>
          <span className="block text-white font-norch text-xl md:text-3xl lg:text-5xl opacity-90 mt-2">
            Official Ball & Kit Partner
          </span>
          <span className="block text-white font-norch text-lg md:text-2xl lg:text-4xl opacity-80 mt-1">
            Powering The Game
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "static-4",
    desktopImg: "/assets/Banners/5.png",
    mobileImg: "/assets/Banners/mobile4.png",
    position: "bottom",
    content: (
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 w-full px-4">
        <h2 className="text-white font-norch text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center drop-shadow-2xl">
          Official Nutrition & Diet Partner
        </h2>
      </div>
    ),
  },
  {
    id: "static-5",
    desktopImg: "/assets/Banners/4.png",
    mobileImg: "/assets/Banners/mobile5.png",
    position: "center",
    content: null, // No text for this slide
  },
];
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [backendBanners, setBackendBanners] = useState<any[]>([]);

  // Merge Static + Backend Slides
  const allSlides = [
    ...STATIC_SLIDES,
    ...backendBanners.map((b) => ({
      id: b._id || `backend-${Math.random()}`,
      desktopImg: b.laptopSrc,
      mobileImg: b.mobileSrc,
      position: "bottom", // Default position for backend banners
      content: b.title ? (
        <h2 className="text-white font-norch text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-tight text-center drop-shadow-2xl">
          {b.title}
        </h2>
      ) : null,
    })),
  ];

  const totalSlides = allSlides.length;

  // Auto-scroll effect
  useEffect(() => {
    if (totalSlides === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Fetch Banners from Backend (unchanged logic)
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
    <main className="min-h-screen font-sans bg-gray-50">
      <Navbar />

      {/*
        HERO SECTION WRAPPER
        1. Fixed heights for stability.
        2. h-[550px] on mobile (good height, not too small).
        3. h-[80vh] on Desktop (Big but not full screen, allows footer peek).
      */}
      <section className="relative w-full overflow-hidden mt-0 md:mt-[100px] lg:mt-0 h-[300px] md:h-[650px] lg:h-[80vh] xl:h-[85vh]">

        {allSlides.map((slide, index) => {
          const isActive = current === index;

          // Logic to position text (Center vs Bottom)
          const textContainerClass = slide.position === 'center'
            ? 'justify-center items-center pb-0'
            : 'justify-end items-center pb-20 md:pb-24 lg:pb-32';

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/*
                --- IMAGE DISPLAY LOGIC ---
                Key Class: 'object-bottom'
                This ensures the bottom of the image (players/ground) is NEVER cut off.
                If the screen size is weird, it will cut the TOP (sky) instead.
              */}

              {/* Desktop Image (Hidden on Mobile) */}
              <div className="hidden md:block absolute inset-0 w-full h-full">
                <Image
                  src={slide.desktopImg}
                  alt="Desktop Banner"
                  fill
                  priority={index === 0}
                  className="object-cover object-bottom"
                  quality={95}
                  sizes="100vw"
                />
              </div>

              {/* Mobile Image (Hidden on Desktop) */}
              <div className="block md:hidden absolute inset-0 w-full h-full">
                <Image
                  src={slide.mobileImg}
                  alt="Mobile Banner"
                  fill
                  priority={index === 0}
                  className="object-cover object-bottom"
                  quality={95}
                  sizes="100vw"
                />
              </div>

              {/* Dark Gradient Overlay (Improves text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* --- TEXT CONTENT --- */}
              {slide.content && (
                <div className={`absolute inset-0 z-20 flex flex-col w-full px-4 md:px-12 ${textContainerClass}`}>
                  {slide.content}
                </div>
              )}
            </div>
          );
        })}

        {/* --- FIXED OVERLAYS --- */}
        {/* Social Icons (Clickable) */}
        <div className="absolute top-0 right-0 z-30 h-full flex items-center pointer-events-none">
          <div className="pointer-events-auto">
            <Socials />
          </div>
        </div>

        {/* Mobile SVG (Bottom decoration) */}
        <div className="absolute bottom-0 w-full z-20 pointer-events-none">
          <MobileSvg />
        </div>

      </section>

      {/* PAGE CONTENT */}
      <div className="w-full bg-gray-50 pt-20">
        <div className="w-full h-12 md:h-24 bg-gray-50" />
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