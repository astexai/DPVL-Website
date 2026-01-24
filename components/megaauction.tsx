'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

      <section className="relative w-full py-16 px-6 md:px-12 bg-gradient-to-r from-[#2a2a72] to-[#009ffd] overflow-hidden">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
              Show Stoppers of the Mega Auction
            </h2>
      
            <div className="w-64 h-1 bg-[#ef4444] mb-8" />

            <p className="text-white/90 leading-relaxed mb-6 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <p className="text-white/90 leading-relaxed text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

      
          <div className="flex-1 relative w-full h-[300px] md:h-[400px]">

            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <Image 
                src="/assets/footerimg.jpg" 
                alt="Venue" 
                fill 
                className="object-cover"
              />
   
              <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a72] via-transparent to-transparent" />
            </div>
            
        
            <div className="absolute bottom-4 right-4 w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl animate-float">
               <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                 <Image 
                   src="/assets/footerimg.jpg" 
                   alt="Ball" 
                   fill 
                   className="object-cover"
                 />
               </div>
            </div>
          </div>

        </div>
      </section>


      <section className="relative w-full py-16 px-6 md:px-12 bg-[#1a237e] overflow-hidden">
        
 
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 10px)' }}
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
                style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
              >
                {galleryImages.map((img, index) => (
                  <div 
                    key={index}
                    className="shrink-0 relative rounded-xl overflow-hidden shadow-xl border border-white/10"
                    style={{ 
                      flexBasis: `calc(${100 / cardsPerView}% - ${(cardsPerView > 1 ? 12 : 0)}px)`,
                      aspectRatio: '3/4' 
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