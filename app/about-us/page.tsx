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
