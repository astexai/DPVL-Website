'use client';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTimes } from 'react-icons/fa';
import Socials from './socials';



export default function Heroo({ 
  title = "GALLERY", 
  subtitle = "d" 
}) {
  return (
    <section className={`relative w-full h-[350px] md:h-[450px] overflow-hidden `}>
      
  
      <div className="absolute inset-0 w-full h-full z-0  bg-[#1a237e]">
      
        <Image
          src="/assets/footerimg.jpg" 
          alt="Background"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        
    
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a72]/95 opacity-80 via-[#1a237e]/80 to-[#4a148c]/60" />
        
       
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)' }} 
        />
      </div>

 
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between">
        
   
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg mt-10 md:mt-0">
          <h1 className="text-white font-sans font-bold  font-mokoto text-4xl sm:text-5xl md:text-6xl tracking-widest mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
            {title}
          </h1>
          <p className="text-white/90 text-base md:text-lg font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

       
        <div className="absolute bottom-4 right-4 md:right-20 md:bottom-10 w-32 h-32 md:w-64 md:h-64 animate-float">
          
           <div className="relative w-full h-full drop-shadow-2xl">
              <Image 
                src="/assets/footerimg.jpg" 
                alt="Volleyball"
                fill
                className="object-contain"
              />
           </div>
        </div>
      </div>


     <Socials/>

    

    </section>
  );
}