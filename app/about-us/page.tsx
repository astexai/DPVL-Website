'use client';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTimes } from 'react-icons/fa';
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import PartnersSponsors from "@/components/partners"
import WhoWeAre from '@/components/whoweare';
import Image from 'next/image';
import MissionFounder from '@/components/mission';
import { FaXTwitter } from 'react-icons/fa6';
import Socials from '@/components/socials';

const page = () => {
  return (
     <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
      <section className={`relative w-full h-[500px] md:h-[450px] overflow-hidden bg-[#1a237e]`}>
      
     
      <div className="absolute inset-0 w-full h-full z-0">
   
        <div className="absolute inset-0 " />
      
        <Image
          src="/assets/bg/Banner.png"
          alt="Background Texture"
          fill
          className="object-cover"
        />

      
        <div 
          className="absolute top-0 left-0 w-1/3 h-full opacity-30" 
          style={{ 
            background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(214, 96, 149, 0.3) 2px, rgba(214, 96, 149, 0.3) 4px)' 
          }}
        />
      </div>

     
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between">
        
    
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-20 mt-20 md:mt-0">
          <h2 className="text-white font-mokoto font-bold text-4xl sm:text-5xl md:text-6xl tracking-widest mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
            ABOUT US
          </h2>
          <p className="text-white/90 text-sm md:text-lg font-light leading-relaxed mb-8 max-w-md">
            The league that fuels ambition, celebrates skill, and brings volleyball to life.
          </p>
          
          <button className="border border-white text-white bg-transparent hover:bg-white hover:text-[#2a2a72] rounded-full px-8 py-2.5 font-medium transition-all duration-300">
            Join Us
          </button>
        </div>

        <div className="flex-1 relative w-full h-full flex items-end justify-center md:justify-end pb-8 md:pb-12">
          
          <div 
            className="absolute bottom-4 md:bottom-8 right-0 md:right-10 text-[100px] md:text-[140px] font-black text-white/10 leading-none select-none pointer-events-none"
            style={{ 
              transform: 'perspective(500px) rotateX(60deg) scaleY(1.5)', 
              fontFamily: 'sans-serif',
              transformOrigin: 'bottom center'
            }}
          >
            ABOUT
          </div>

     
          
        </div>

      </div>

<Socials/>

    </section>
    <WhoWeAre />
    <MissionFounder />
      <PartnersSponsors />
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
