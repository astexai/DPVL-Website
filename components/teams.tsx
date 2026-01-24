'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const teams = [
  {
    id: 1,
    name: 'Team Eastern Eagles',
    bgColor: '#ffc107',
    bgImage: '/assets/teams/EasternEagles.jpeg',
  },
  {
    id: 2,
    name: 'Team New Delhi Titans',
    bgColor: '#d67bb0',
    bgImage: '/assets/teams/NewDelhi.jpeg',
  },
  {
    id: 3,
    name: 'Team Northern Ninjas',
    bgColor: '#e0cfa0',
    bgImage: '/assets/teams/NorthernNinjas.jpeg',
  },
  {
    id: 4,
    name: 'Team Delta',
    bgColor: '#d9534f',
    bgImage: '/assets/teams/PuraniDilli.jpeg',
  },
  {
    id: 5,
    name: 'Team Southern Spikers',
    bgColor: '#311b92',
    bgImage: '/assets/teams/SouthernSpikers.jpeg',
    bgOverlay: '#ffffff',
  },
  {
    id: 6,
    name: 'Team Western Warriors',
    bgColor: '#ffc107',
    bgImage: '/assets/teams/WesternWarriors.jpeg',
  },
];

// ... (imports and teams array remain the same)

export default function TeamsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(5);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = teams.length - cardsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="relative w-full py-16 overflow-hidden bg-gray-100">
      {/* Background Section remains same */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/footerimg.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-40 grayscale mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-black mb-2">
            TEAMS
          </h2>
          <div className="w-20 h-1 bg-[#4a148c]" />
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              // Calculation: 
              // On mobile: uses simple 100% increments.
              // On desktop: accounts for the gap (24px).
              transform: cardsPerView === 1 
                ? `translateX(-${currentIndex * 100}%)` 
                : `translateX(calc(-${currentIndex * (100 / cardsPerView)}% - ${currentIndex * (cardsPerView === 2 ? 16 : 24) / cardsPerView}px))`,
              gap: cardsPerView === 1 ? '0px' : (cardsPerView === 2 ? '16px' : '24px'),
            }}
          >
            {teams.map((team) => (
              <div
                key={team.id}
                className="relative shrink-0 flex justify-center items-center"
                style={{
                  // On mobile, card is 100% of container, but we use inner padding for the "look"
                  width: cardsPerView === 1 ? '100%' : `calc(${100 / cardsPerView}% - ${cardsPerView === 2 ? 16 : 24}px)`,
                }}
              >
                <div
                  className="relative w-full rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  style={{
                    aspectRatio: '1 / 1',
                    // This limits the size on mobile so it doesn't touch the screen edges
                    maxWidth: cardsPerView === 1 ? '320px' : 'none', 
                  }}
                >
                  {/* Team Content (BG, Image, Overlays) */}
                  <div className="absolute inset-0" style={{ backgroundColor: team.bgColor }}>
                    {team.bgImage && (
                      <Image src={team.bgImage} alt={team.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls remain same */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-[#4a148c] text-white flex items-center justify-center shadow-lg hover:bg-[#6a1b9a] transition-all">
            <FaChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-[#4a148c] text-white flex items-center justify-center shadow-lg hover:bg-[#6a1b9a] transition-all">
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}