import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Heroo from "@/components/herosection"
  import { FaChevronRight, FaArrowRight } from 'react-icons/fa';
import Image from "next/image"

const page = () => {


const newsItems = [
  { id: 1, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action." },
  { id: 2, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action." },
  { id: 3, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action." },
  { id: 4, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action." },
  { id: 5, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action." },
  { id: 6, title: "DPVL Set for Biggest Season Yet as Teams Gear Up for Action." },
];

  return (
     <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
       <Heroo title="NEWS" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />
       <FooterGrad variant="cropped" height={20}/>
      <section className="relative w-full py-16 px-4 md:px-8 bg-[#3b3bb7] overflow-hidden">
      
  
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 " />
     
        <Image
          src="/assets/bg/InfoBg.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-80 mix-blend-overlay rotate-180"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
       
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-10">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white italic tracking-tighter" style={{ fontFamily: 'sans-serif' }}>
              Latest News
            </h2>
    
            <FaChevronRight className="text-[#d66095] text-2xl md:text-4xl mt-1" />
          
          </div>
 <div className="w-40 md:w-70 h-1 bg-[#D159A3] mt-2 " />
          
        </div>

      
        <div className="relative w-full rounded-3xl p-6 md:p-10 overflow-hidden border border-white/10 shadow-2xl">
          
   
          <div className="absolute inset-0 z-0">
     
         <div className="absolute inset-0 " />
            <Image
              src="/assets/bg/LatestNews.png"
              alt="Inner Texture"
              fill
              className="object-cover "
            />
      
            
          </div>

          
    
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((item, index) => (
              <div 
                key={index} 
                className="group relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-lg cursor-pointer bg-black"
              >
             
                <Image
                  src="/assets/bg/footerimg.jpg" 
                  alt="News Thumbnail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                />
                
            
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

             
                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex flex-col justify-end h-full">
                  <p className="text-white text-sm md:text-base font-medium leading-snug">
                    <span className="font-extrabold text-white text-lg mr-1">DPVL</span> 
                    {item.title.replace('DPVL ', '')}
                  </p>
                  
               
                  <div className="self-end mt-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    <FaArrowRight className="text-white text-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
