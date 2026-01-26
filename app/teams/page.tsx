import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import DPVLTeams from "@/components/dpvlteams"
import Socials from "@/components/socials";

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
                className="object-cover "
              />
            </div>
      
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between">
              
        
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-20 mt-20 md:mt-0">
                <h2 className="text-white font-mokoto font-bold text-4xl sm:text-5xl md:text-6xl tracking-widest mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  TEAMS
                </h2>
                <p className="text-white/90 text-sm md:text-lg font-light leading-relaxed mb-8 max-w-md">
                  The league that fuels ambition, celebrates skill, and brings volleyball to life.
                </p>
                
                
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
                  TEAMS
                </div>
      
                <div className="relative w-48 h-48 md:w-72 md:h-72 z-10 animate-float">
            
                  
                </div>
              </div>
      
            </div>
      
 
            <Socials/>
      
          </section>
          <DPVLTeams />
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
