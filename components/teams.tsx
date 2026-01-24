'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const teams = [
  { id: 1, name: 'Team Alpha', color: 'bg-[#ffc107]' }, 
  { id: 2, name: 'Team Bravo', color: 'bg-[#d67bb0]' }, 
  { id: 3, name: 'Team Charlie', color: 'bg-[#e0cfa0]' }, 
  { id: 4, name: 'Team Delta', color: 'bg-[#d9534f]' }, 
  { id: 5, name: 'Team Echo', color: 'bg-[#311b92]' }, 
  { id: 6, name: 'Team Foxtrot', color: 'bg-[#ffc107]' }, 
  { id: 7, name: 'Team Golf', color: 'bg-[#d67bb0]' },
];

export default function TeamsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(5); 
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2); 
      } else {
        setCardsPerView(1); 
      }
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
  
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/footerimg.jpg" 
          alt="Background Texture"
          fill
          className="object-cover opacity-40 grayscale mix-blend-multiply"
        />
      
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent opacity-90 to-white/80" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4">
        
     
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-black mb-2" style={{ fontFamily: 'sans-serif' }}>
            TEAMS
          </h2>
        
          <div className="w-20 h-1 bg-[#4a148c]" />
        </div>

        
        <div className="relative w-full overflow-hidden px-2 md:px-0">
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform gap-4 md:gap-6"
            style={{
           
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {teams.map((team, index) => (
              <div
                key={`${team.id}-${index}`}
                className="relative shrink-0 rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{
                  
                  flexBasis: `calc(${100 / cardsPerView}% - ${(cardsPerView > 1 ? 24 : 0)}px)`,
                  aspectRatio: '1/1', 
                }}
              >
           
                <div className={`absolute inset-0 ${team.color}`} />

          
                <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay">
                  <Image
                    src="/assets/footerimg.jpg"
                    alt="Card Texture"
                    fill
                    className="object-cover"
                  />
                </div>

              
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl" />

                
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  
                   <div className="relative w-3/4 h-3/4 drop-shadow-xl">
                     <Image
                        src="/assets/footerimg.jpg"
                        alt="Team Mascot"
                        fill
                        className="object-contain"
                     />
                   </div>
                </div>

            
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-bold text-xl uppercase tracking-widest">{team.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-[#4a148c] text-white flex items-center justify-center shadow-lg hover:bg-[#6a1b9a] hover:scale-110 transition-all duration-300"
            aria-label="Previous Slide"
          >
            <FaChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-[#4a148c] text-white flex items-center justify-center shadow-lg hover:bg-[#6a1b9a] hover:scale-110 transition-all duration-300"
            aria-label="Next Slide"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}