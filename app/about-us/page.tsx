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
import Heroo from '@/components/herosection';

const page = () => {
  return (
     <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
      <section className={`relative w-full h-[300px] md:h-[430px] overflow-hidden bg-[#1a237e]`}>
      
     <Heroo title='ABOUT US'/>

     
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
