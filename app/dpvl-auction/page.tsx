import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Image from "next/image";
import ShowStoppersAndGallery from "@/components/megaauction";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <Heroo
        title="AUCTION"
        subtitle="The league that fuels ambition, celebrates skills and bring Volleyball to life."
      />
        <section className="relative w-full py-10 px-5 md:px-12 bg-[#d66095]">
      <div className="flex flex-col items-center  ">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
          UPKL Mega Auction 2025
        </h1>
      
        <div className="w-32 md:w-150 h-1.5 bg-[#1a237e]" />
      </div>
      </section>

      <section className="relative w-full py-16 px-6 md:px-12 bg-gradient-to-br from-[#3b3bb7] to-[#c96793]">
        <div className="max-w-7xl mx-auto">
       
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
    
            <div className="w-full md:w-5/12 aspect-square relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="/assets/footerimg.jpg" 
                alt="Auction Venue"
                fill
                className="object-cover"
              />
           
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

         
            <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold italic text-white/90">
                “Lorem ipsum dolor sit amet, consectetur”
              </h2>

              <p className="text-white/80 leading-relaxed text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p className="text-white/80 leading-relaxed text-sm md:text-base hidden md:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="relative w-full py-16 px-6 md:px-12 overflow-hidden ">
    
        <Image
          src={"/assets/bg/Blog.png"}
          alt="image"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 mix-blend-multiply" />

        <div className="relative z-10 max-w-7xl mx-auto">
    
          <div className="flex flex-col md:flex-row items-center md:justify-between mb-10 gap-6 md:gap-0">
     
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">
                Top Picks
              </h2>
              <div className="w-24 h-1 bg-[#3b3bb7]" />
            </div>

  
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <FaChevronLeft />
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <FaChevronRight />
              </button>
            </div>
          </div>

     
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#4a7acd] to-[#1a237e] rounded-sm overflow-hidden shadow-2xl group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
       
                <div className="absolute top-4 left-0 w-full flex flex-col items-center opacity-10 leading-none pointer-events-none select-none">
                  <span className="text-5xl font-black uppercase">
                    Top Picks
                  </span>
                  <span className="text-5xl font-black uppercase">
                    Top Picks
                  </span>
                  <span className="text-5xl font-black uppercase">
                    Top Picks
                  </span>
                </div>

               
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="relative w-full h-[80%]">
                    <Image
                      src="/assets/footerimg.jpg" 
                      alt="Top Pick Players"
                      fill
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

<ShowStoppersAndGallery />

      <FooterGrad />
      <Footer />
    </main>
  );
};

export default page;
