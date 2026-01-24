import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Heroo from "@/components/herosection"
import Image from "next/image"
import {FaPlay} from 'react-icons/fa'

const page = () => {

const videos = [
  {
    id: 1,
    title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action.",
    image: "/assets/footerimg.jpg",
  },
  {
    id: 2,
    title: "", 
    image: "/assets/footerimg.jpg",
  },
  {
    id: 3,
    title: "",
    image: "/assets/footerimg.jpg",
  },
  {
    id: 4,
    title: "",
    image: "/assets/footerimg.jpg",
  },
  {
    id: 5,
    title: "DPVL Health & Fitness Guidelines",
    image: "/assets/footerimg.jpg",
  },
];

  return (
     <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
       <Heroo title="DPVL TV" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />
       <section className="relative w-full py-16 px-4 bg-[#3b3bb7] overflow-hidden">
   
      <div className="absolute inset-0 w-full h-full z-0">
  
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a148c] via-[#3b3bb7] to-[#1a237e]" />
        
     
        <Image
          src="/assets/footerimg.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-30 mix-blend-overlay"
        />
   
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
            backgroundSize: '100px 100px' 
          }} 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
      
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-white mb-2 tracking-tight" style={{ fontFamily: 'sans-serif' }}>
            DPVL TV
          </h2>
         
          <div className="w-20 h-1 bg-[#d9534f] shadow-[0_0_10px_#d9534f]" />
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center items-start">
          
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="relative group w-full aspect-[4/5] p-2 bg-gradient-to-br from-[#d66095] to-[#7b1fa2] rounded-xl shadow-2xl hover:scale-[1.02] transition-transform duration-300"
            >
          
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-black">
                
         
                <Image
                  src={video.image}
                  alt="Video Thumbnail"
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <FaPlay className="text-black text-xl md:text-2xl" />
                  </div>
                </div>

                
                {video.title && (
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                    <p className="text-white text-sm md:text-base font-medium leading-snug drop-shadow-md">
                      {video.title}
                    </p>
                  </div>
                )}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
