'use client'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Image from "next/image"
import { useState } from "react"
import Heroo from "@/components/herosection"

const page = () => {
  const galleryImages = [
  { id: 1, category: 'Auction', src: '/assets/footerimg.jpg' }, 
  { id: 2, category: 'Auction', src: '/assets/footerimg.jpg' },
  { id: 3, category: 'Auction', src: '/assets/footerimg.jpg' },
  { id: 4, category: 'Auction', src: '/assets/footerimg.jpg' },
  { id: 5, category: 'Auction', src: '/assets/footerimg.jpg' },
  { id: 6, category: 'Auction', src: '/assets/footerimg.jpg' },
  { id: 7, category: 'Auction', src: '/assets/footerimg.jpg' },
  { id: 8, category: 'Auction', src: '/assets/footerimg.jpg' },

  { id: 9, category: 'Match Day', src: '/assets/footerimg.jpg' },
  { id: 10, category: 'Trophy Launch', src: '/assets/footerimg.jpg' },
];

const categories = ['Auction', 'Trophy Launch', 'Match Day'];

  const [activeFilter, setActiveFilter] = useState('Auction');

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
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
          
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}

          {filteredImages.length === 0 && (
            <div className="col-span-full text-center text-white/70 py-10">
              No images available for {activeFilter}
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
