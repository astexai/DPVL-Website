'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const newsData = [
  { id: 1, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action.", image: "/assets/bg/footerimg.jpg" },
  { id: 2, title: "Championship Finals: A Historic Showdown Awaits.", image: "/assets/bg/footerimg.jpg" },
  { id: 3, title: "New Talent Emerges in the League Qualifiers.", image: "/assets/bg/footerimg.jpg" },
  { id: 4, title: "Behind the Scenes: Training with the Champions.", image: "/assets/bg/footerimg.jpg" },
  { id: 5, title: "DPVL Announces New Venues for 2026 Season.", image: "/assets/bg/footerimg.jpg" },
];

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  /* -------------------- Responsive cards per view -------------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = newsData.length - cardsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  /* 🔑 Correct translate math */
  const translatePercent = 100 / cardsPerView;

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#2a2a72]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/assets/bg/LatestNews.png" alt="Background" fill className="object-cover" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center md:items-start mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase italic text-white mb-2">
            Latest News
          </h2>
          <div className="md:w-72 w-50 h-1 bg-[#d66095]" />
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transition: 'transform 500ms ease-in-out',
                transform: `translateX(-${currentIndex * translatePercent}%)`,
              }}
            >
              {newsData.map((news, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsPerView}%`, height: '350px' }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
                      <p className="text-white text-lg leading-snug font-medium">
                        <span className="font-bold text-xl">DPVL</span>{' '}
                        {news.title.replace('DPVL ', '')}
                      </p>
                      <div className="self-end mt-2 opacity-80 group-hover:translate-x-2 transition-transform">
                        <FaArrowRight className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-2 md:-left-8 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-2 md:-right-8 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
