'use client';
import React, { useState, useEffect } from 'react';

const teams = [
  { id: 1, name: 'Team Eastern Eagles', bgColor: '#ffc107', bgImage: '/assets/teams/EasternEagles.jpeg' },
  { id: 2, name: 'Team New Delhi Titans', bgColor: '#d67bb0', bgImage: '/assets/teams/NewDelhi.jpeg' },
  { id: 3, name: 'Team Northern Ninjas', bgColor: '#e0cfa0', bgImage: '/assets/teams/NorthernNinjas.jpeg' },
  { id: 4, name: 'Team Delta', bgColor: '#d9534f', bgImage: '/assets/teams/PuraniDilli.jpeg' },
  { id: 5, name: 'Team Southern Spikers', bgColor: '#000000', bgImage: '/assets/teams/SouthernSpiker.jpeg' },
  { id: 6, name: 'Team Western Warriors', bgColor: '#ffc107', bgImage: '/assets/teams/WesternWarriors.jpeg' },
];

export default function TeamsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const extendedTeams = [...teams, ...teams.slice(0, 4)];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(4);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === teams.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex]);

  const cardWidthPercent = 100 / cardsPerView;

  return (
    <section className="relative w-full py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/assets/bg/TeamBg.png" alt="Background Texture" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-black mb-2">
            TEAMS
          </h2>
          <div className="w-20 h-1 bg-purple-900" />
        </div>

        {/* Wrapper to center the visible cards */}
        <div className="flex justify-center w-full">
          <div className="relative overflow-hidden" style={{ width: `${cardsPerView * 100}%`, maxWidth: '1200px' }}>
            <div
              className="flex"
              style={{
                transition: isTransitioning ? 'transform 500ms ease-out' : 'none',
                transform: `translateX(-${(currentIndex * cardWidthPercent)}%)`,
                gap: '20px',
              }}
            >
              {extendedTeams.map((team, idx) => (
                <div
                  key={`${team.id}-${idx}`}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${cardWidthPercent}% - 20px)`,
                  }}
                >
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={team.bgImage} 
                        alt={team.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-bold uppercase text-sm">{team.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}