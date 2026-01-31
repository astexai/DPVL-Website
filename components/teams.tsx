'use client';
import React, { useState, useEffect } from 'react';

const teams = [
  { id: 1, name: 'Team Eastern Eagles', bgImage: '/assets/teams/EasternEagles.jpeg' },
  { id: 2, name: 'Team New Delhi Titans', bgImage: '/assets/teams/NewDelhi.jpeg' },
  { id: 3, name: 'Team Northern Ninjas', bgImage: '/assets/teams/NorthernNinjas.jpeg' },
  { id: 4, name: 'Team Purani Dilli Panthers', bgImage: '/assets/teams/PuraniDilli.jpeg' },
  { id: 5, name: 'Team Southern Spikers', bgImage: '/assets/teams/SouthernSpiker.jpeg' },
  { id: 6, name: 'Team Western Warriors', bgImage: '/assets/teams/WesternWarriors.jpeg' },
];

export default function TeamsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedTeams = [...teams, ...teams.slice(0, cardsPerView)];

  /* -------------------- Responsive cards per view -------------------- */
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

  /* -------------------- Auto slide -------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* -------------------- Infinite loop reset -------------------- */
  useEffect(() => {
    if (currentIndex === teams.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex]);

  /* -------------------- Translate logic -------------------- */
  const translatePercent = 100 / cardsPerView;

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/bg/TeamBg.png"
          alt="Background"
          className="w-full h-full object-cover"
          loading='lazy'
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-5xl md:text-7xl font-norch uppercase text-black mb-2 tracking-wide">
            TEAMS
          </h2>
          <div className="md:w-20 w-15 h-1 bg-purple-900" />
        </div>

        {/* Carousel */}
        <div className="flex justify-center w-full">
          <div className="relative overflow-hidden w-full max-w-[1200px]">
            <div
              className="flex"
              style={{
                transition: isTransitioning ? 'transform 500ms ease-out' : 'none',
                transform: `translateX(-${currentIndex * translatePercent}%)`,
              }}
            >
              {extendedTeams.map((team, idx) => (
                <div
                  key={`${team.id}-${idx}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <img
                      src={team.bgImage}
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-bold uppercase text-sm">
                        {team.name}
                      </p>
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
