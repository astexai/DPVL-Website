'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { Latestnews } from '@/data/news';
import Link from 'next/link';

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

  const maxIndex = Latestnews.length - cardsPerView;

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
          <h2 className="text-5xl md:text-7xl tracking-wide font-norch uppercase text-white mb-2">
            Latest News
          </h2>
          <div className="md:w-60 w-40 h-1 bg-[#d66095]" />
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
              {Latestnews.map((news, index) => (
  <div
    key={index}
    className="flex-shrink-0 px-3"
    style={{ width: `${100 / cardsPerView}%`, height: '350px' }}
  >
    <Link
      href={news.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
        <Image
          src={news.image}
          alt={news.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110 scale-100"
        />



        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
          

          <div className="self-end mt-2 transition-transform group-hover:translate-x-2">
  <div
    className="
      w-9 h-9 rounded-full
      flex items-center justify-center
      bg-white/20 backdrop-blur-md
      border border-white/40
      shadow-lg
      opacity-90
    "
  >
    <FaArrowRight className="text-white" />
  </div>
</div>

        </div>
      </div>
    </Link>
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
