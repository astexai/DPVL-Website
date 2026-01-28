"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Mock Data for Gallery
const galleryImages = [
  { id: 1, src: "/assets/footerimg.jpg" }, // Replace with your actual auction images
  { id: 2, src: "/assets/footerimg.jpg" },
  { id: 3, src: "/assets/footerimg.jpg" },
  { id: 4, src: "/assets/footerimg.jpg" },
  { id: 5, src: "/assets/footerimg.jpg" },
  { id: 6, src: "/assets/footerimg.jpg" },
];

export default function ShowStoppersAndGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = galleryImages.length - cardsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="w-full font-sans text-white">
     <section className="relative w-full py-12 md:py-16 px-4 md:px-12 bg-gradient-to-r from-[#2a2a72] to-[#009ffd] overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/assets/bg/Stopper.png"
      alt="Venue"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a72]/90 via-[#2a2a72]/50 to-transparent" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2 text-white">
        Show Stoppers of the Mega Auction
      </h2>

      <div className="w-40 md:w-64 h-1 bg-[#ef4444] mb-6 md:mb-8" />

      <p className="text-white/90 mb-4 text-sm md:text-base max-w-xl text-left md:text-justify">
        The Mega Auction of the Delhi Pro Volleyball League delivered
        several show-stopping moments, with franchises locking horns over
        proven Indian attackers and dynamic all-rounders. Intense bidding
        wars for top domestic talent became the highlight of the auction,
        underlining the league’s ambition to showcase the best of Indian
        volleyball and raise the competition’s overall quality.
      </p>

      <p className="text-white/90 text-sm md:text-base max-w-xl text-left md:text-justify">
        Another major attraction of the auction was the smart acquisition
        of marquee and emerging players who can change the course of a
        match. These high-impact signings not only strengthened team
        combinations but also generated excitement among fans, setting the
        tone for a competitive and entertaining inaugural season of the
        league.
      </p>
    </div>
  </div>
</section>


      <section className="relative w-full py-16 px-6 md:px-12 overflow-hidden">
        <Image
        src={"/assets/bg/AucGallery.png"}
        alt="this"
        fill
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start mb-10">
            <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tighter mb-2">
              Auction Gallery
            </h2>
            <div className="w-32 h-1 bg-[#ef4444]" />
          </div>

          <div className="relative group px-8 md:px-12">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white hover:scale-125 transition-all"
            >
              <FaChevronLeft size={30} />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className="shrink-0 relative rounded-xl overflow-hidden shadow-xl border border-white/10"
                    style={{
                      flexBasis: `calc(${100 / cardsPerView}% - ${cardsPerView > 1 ? 12 : 0}px)`,
                      aspectRatio: "3/4",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={`Gallery ${index}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white hover:scale-125 transition-all"
            >
              <FaChevronRight size={30} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
