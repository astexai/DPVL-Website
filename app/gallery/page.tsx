'use client'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Image from "next/image"
import { useState } from "react"
import Heroo from "@/components/herosection"

const page = () => {
  const galleryImages = [
  { id: 1, category: 'Opening Ceremony', src: '/assets/opening/image1.jpg' }, 
  { id: 2, category: 'Opening Ceremony', src: '/assets/opening/image2.jpg' }, 
  { id: 3, category: 'Opening Ceremony', src: '/assets/opening/image3.jpg' }, 
  { id: 4, category: 'Opening Ceremony', src: '/assets/opening/image4.jpg' }, 
  { id: 5, category: 'Opening Ceremony', src: '/assets/opening/image5.jpg' }, 
  { id: 6, category: 'Opening Ceremony', src: '/assets/opening/image6.jpg' }, 
  { id: 7, category: 'Opening Ceremony', src: '/assets/opening/image7.jpg' }, 
  { id: 7, category: 'Opening Ceremony', src: '/assets/opening/image9.jpg' }, 

];

const categories = ['Opening Ceremony','Auction', 'Trophy Launch', 'Match Day'];

  const [activeFilter, setActiveFilter] = useState('Opening Ceremony');

  const filteredImages = galleryImages.filter(img => img.category === activeFilter);
  return (
      <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
       <Heroo title="GALLERY" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />

       <section className="relative w-full min-h-screen pt-12 pb-20">
      
   
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 " />
    
        <Image
          src="/assets/bg/Gallery.png"
          alt="Texture"
          fill
          className="object-fit"
        />
        <FooterGrad variant="cropped" height={20}/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
  
        <div className="flex flex-wrap justify-center gap-4 mb-12 w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-8 py-2.5 rounded-full text-base md:text-lg font-medium tracking-wide transition-all duration-300
                ${activeFilter === category 
                  ? 'bg-[#3d3db5] text-white shadow-lg border border-[#3d3db5] scale-105' 
                  : 'bg-transparent text-white border border-white hover:bg-white/10' 
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-fadeIn">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative group w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src={image.src}
                alt={image.category}
                priority
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
          
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}

          {filteredImages.length === 0 && (
            <div className="col-span-full mt-20 text-center text-2xl text-white py-10">
              Coming Soon...
            </div>
          )}
        </div>

      </div>
    </section>
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
