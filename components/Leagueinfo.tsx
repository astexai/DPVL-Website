import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LeagueInfoSection = () => {
  return (
    <section className="w-full py-16 px-4 flex justify-center items-center min-h-[500px] relative overflow-hidden">
      <Image
      fill
      src={"/assets/bg/TeamBg.png"}
      alt='League Information'
      className='object-cover opacity-80'
      />
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }}>
      </div>

      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center">
        

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-6xl font-norch text-[#3B3BB7] uppercase tracking-wide mb-2 ">
            DELHI PRO VOLLEYBALL LEAGUE
          </h1>
        
          <div className="h-[3px] w-32 md:w-48 bg-[#d159a3] mx-auto mt-1"></div>
        </div>

       
        <div className="relative w-full max-w-4xl mx-auto text-center">
          
          
            
            <div className="space-y-4 text-gray-900 font-medium text-base md:text-lg font-sans">
              <p>
                Delhi Pro Volleyball League (DPVL) is Capital's first-ever professional volleyball league created to build a strong platform for emerging and elite players.
              </p>
              
              <p>
                The DPVL is an initiative by former national volleyball players, Ms. Neeti Rawat and Ms. Jasoda Gulliya and it is well supported by the Delhi Volleyball Association.
              </p>
              
              <p>
                The league aims to revive volleyball at the grassroots level, promote volleyball talent, and build a sustainable sports ecosystem while offering brands and fans a dynamic, high-energy sporting experience.
              </p>
            </div>

          </div>
          
        
          <div className="flex justify-center pt-8">
            <Link href="/about-us">
          <button className="bg-[#3B3BB7] hover:bg-[#2A2A8A] cursor-pointer text-white px-10 py-3 rounded-lg font-bold tracking-widest text-sm transition-all shadow-lg hover:scale-105 active:scale-95">
            View More
          </button>
        </Link>
          </div>
        

      </div>
    </section>
  );
};

export default LeagueInfoSection;