import Image from 'next/image';
import React from 'react';

const DelhiVolleyball = () => {

  return (
    <section className="relative w-full min-h-full text-white overflow-hidden font-sans">
      <Image
      src={"/assets/bg/AucGallery.png"}
      fill
      alt='Excellence'
      />
      {/* Background Texture Overlay (Optional: Add your volleyball net image here) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{
             backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%)',
           }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">
        
        {/* Main Header Section */}
        <div className="mb-16">
         <div className="flex flex-row md:flex-row gap-3 md:gap-3 mb-2 items-center md:items-stretch">
  {/* 'DEHLI' - Mobile: text-6xl (safer for phones) | Laptop: text-8xl (preserved) */}
  <h1 className="font-norch text-6xl sm:text-7xl md:text-8xl uppercase leading-[0.8] tracking-wide text-center md:text-left">
    DELHI
  </h1>
  
  {/* Tagline - Mobile: Bigger & Centered | Laptop: Matches Height (preserved) */}
  <div className="flex flex-col justify-between md:justify-between tracking-wide gap-1.5 md:gap-0">
    <h2 className="font-norch text-xl md:text-base lg:text-[35px] uppercase leading-none text-white/90 text-left md:text-left whitespace-nowrap">
      The Perfect Stage For
    </h2>
    <h2 className="font-norch text-xl md:text-base lg:text-[35px] uppercase leading-none text-white/90 text-left md:text-left whitespace-nowrap">
      Volleyball Excellence
    </h2>
  </div>
</div>

          {/* Pink Underline */}
          <div className="w-[200px] md:w-[350px] h-1.5 bg-[#d65db1] mb-8"></div>

          {/* Main Description */}
          <p className="text-lg md:text-xl font-medium max-w-3xl leading-relaxed opacity-90">
            Delhi is emerging as the epicenter of India’s volleyball transformation, 
            uniting professional ambition with raw street-level passion.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          
            <div className="flex flex-col gap-3">
              <h3 className="font-norch text-3xl md:text-4xl uppercase tracking-wider">
                Thriving Ecosystem
              </h3>
              <p className="text-lg font-medium leading-relaxed opacity-90">
                Delhi’s volleyball scene is booming with school championships, college tournaments, and professional training programs.

              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-norch text-3xl md:text-4xl uppercase tracking-wider">
                Powerful Player Ecosystem
              </h3>
              <p className="text-lg font-medium leading-relaxed opacity-90">
                Home to top volleyball academies, national players, and institutional teams, Delhi has become a true talent engine for the sport.

              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-norch text-3xl md:text-4xl uppercase tracking-wider">
                World-Class Infrastructure
              </h3>
              <p className="text-lg font-medium leading-relaxed opacity-90">
                State-of-the-art venues like Indira Gandhi Indoor Stadium and Thyagaraj Sports Complex make Delhi the perfect host city.

              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-norch text-3xl md:text-4xl uppercase tracking-wider">
                Fan-Driven Market
              </h3>
              <p className="text-lg font-medium leading-relaxed opacity-90">
                Delhi’s youth engagement and strong digital audience make it the ideal launchpad for the Delhi Pro Volleyball League (DPVL).
              </p>
            </div>

        </div>

      </div>
    </section>
  );
};

export default DelhiVolleyball;