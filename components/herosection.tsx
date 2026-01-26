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
          src="/assets/bg/Banner.png" 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        
    
        
       
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

      </div>


     <Socials/>

    

    </section>
  );
}