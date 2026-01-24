'use client'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Pointstable from "@/components/pointstable"
import Image from "next/image"
import Heroo from "@/components/herosection"

const page = () => {

  const stats = [
  "Super Raids",
  "Raid Points",
  "All Out Points",
  "Super Tackles",
  "Tackle Points",
  "High 5s",
  "Successful Raids"
];
  return (
     <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
       <Heroo title="POINTS TABLE" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />
       <div className="relative w-full h-16 md:h-20 bg-[#f3f4f6] overflow-hidden border-y border-gray-200">
      
      
      <div className="absolute inset-0 z-0">
  
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50" />
        <Image
          src="/assets/footerimg.jpg"
          alt="Texture"
          fill
          className="object-cover opacity-5 mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center">

        <div className="flex whitespace-nowrap animate-marquee hover:pause">
          
      
          <div className="flex items-center">
            {stats.map((item, index) => (
              <StatItem key={`a-${index}`} text={item} />
            ))}
          </div>

         
          <div className="flex items-center">
            {stats.map((item, index) => (
              <StatItem key={`b-${index}`} text={item} />
            ))}
          </div>
          
      
           <div className="flex items-center">
            {stats.map((item, index) => (
              <StatItem key={`c-${index}`} text={item} />
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); } /* Move left by one full set width */
        }
      `}</style>
    </div>
      <Pointstable />
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
function StatItem({ text }: { text: string }) {
  return (
    <div className="flex items-center px-8 md:px-16">
      <span className="text-[#d66095] font-medium text-lg md:text-2xl tracking-wide">
        {text}
      </span>
    </div>
  );
}
