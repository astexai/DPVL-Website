'use client';
import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

export default function Footer() {
  return (

    <footer className="relative w-full text-white pt-16 opacity-100 pb-8 bg-gradient-to-r from-[#a364df] to-[#3e3ec5]">
      
    
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">

        <Image
          src="/assets/footerimg.jpg"
          alt="Footer Background"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
  
        <div className="absolute inset-0 bg-[#3b3bb7]/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12 text-center md:text-left">
          
 
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-6">
            <div className="relative w-32 h-20 md:w-40 md:h-24">
              <Image 
                src="/assets/logo.jpg" 
                alt="DPVL Logo" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white/90 font-light leading-relaxed max-w-sm text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
            </p>
            
            <div className="flex flex-col items-center md:items-start w-full">
              <span className="text-lg font-medium border-b-2 border-white/30 pb-1 mb-4 inline-block">
                Follow us on
              </span>
              <div className="flex gap-3 justify-center md:justify-start">
                <SocialIcon icon={<FaInstagram />} />
                <SocialIcon icon={<FaFacebookF />} />
                <SocialIcon icon={<FaTwitter />} />
                <SocialIcon icon={<FaYoutube />} />
                <SocialIcon icon={<FaWhatsapp />} />
              </div>
            </div>
          </div>

       
          <div className="md:col-span-3 md:col-start-6 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-medium mb-6 relative inline-block">
              Quick Links
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white/40"></span>
            </h3>
            <ul className="space-y-2 font-light text-white/90 text-sm md:text-base w-full md:w-auto">
              {['Home', 'Schedule', 'Our Team', 'News', 'Blog', 'Gallery', 'Contact Us'].map((item) => (
                <li key={item} className="flex items-center justify-center md:justify-start gap-2 group cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[#d66095] transition-colors"></span>
                  <a href="#" className="hover:text-pink-200 hover:translate-x-1 transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

     
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-medium mb-6 relative inline-block">
              Contact Info
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white/40"></span>
            </h3>
            
            <div className="flex flex-col gap-2 mb-8 text-white/90 text-sm md:text-base">
              <a href="tel:+91-XXXXXXXXXX" className="hover:text-pink-200 transition-colors">+91-XXXXXXXXXX</a>
              <a href="tel:+91-XXXXXXXXXX" className="hover:text-pink-200 transition-colors">+91-XXXXXXXXXX</a>
            </div>

            <h3 className="text-xl font-medium mb-4">Email Address</h3>
            
        
            <form className="w-full max-w-sm flex items-center bg-[#d66095] rounded-full p-1 shadow-lg">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="flex-1 bg-transparent px-6 py-2 text-white placeholder-white/80 outline-none text-sm"
              />
              <button 
                type="submit" 
                className="bg-white text-[#d66095] w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
              >
                <HiArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

      
        <div className="w-full h-0.5 bg-[#D35CA7] my-6" />
        
        <div className="text-center text-xs md:text-sm font-light text-white/80">
          Copyright 2025 GoodLayers, All Right Reserved
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a 
      href="#" 
      className="w-9 h-9 rounded-full bg-white text-[#d66095] flex items-center justify-center hover:bg-[#d66095] hover:text-white transition-all duration-300 shadow-sm"
    >
      <span className="text-base">{icon}</span>
    </a>
  );
}
