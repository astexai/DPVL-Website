import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import LatestVideos from "./latestvideos";
import Image from "next/image";

export default function ScheduleCard()
{
    return <div>
         <section className="relative z-30 w-full rounded-4xl md:rounded-[100px] pb-16 px-4 md:px-0 " 
  style={{ 
    backgroundImage: "url('/assets/bg/LatestVideo.png')", // Path to your footer image
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }}>
  
  {/* Optional Overlay to ensure text readability */}
  <div className="absolute inset-0  pointer-events-none" />

  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-20">
    <div className="relative mt-15 sm:mt-0 rounded-xl overflow-hidden shadow-2xl border-[3px] border-[#D159A3]">
      
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/assets/bg/Schedule.png" alt="bg" fill priority className="object-fit " />

      </div>

      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-1 text-white">
        <div className="flex flex-row items-center justify-center gap-4 md:gap-6 w-full mb-6">
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-right">
            <span className="text-lg md:text-2xl uppercase tracking-wider font-bebas">Team 1</span>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
              TBD
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image
            src={"/assets/others/Vs.png"}
            alt="vs"
            width={55}
            height={55}
            />
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
              TBD
            </div>
            <span className="text-lg md:text-2xl font-bebas uppercase tracking-wider">Team 2</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm md:text-lg font-bebas text-white mb-6 text-center">
          <div className="flex items-center gap-2">
            <FaCalendarAlt /> <span>JUNE 13, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt /> <span>VENUE EXAMPLE</span>
          </div>
        </div>

        <button className="bg-[#d66095] hover:bg-[#b54a7b] text-white px-6 py-2 rounded text-sm uppercase tracking-wide font-medium shadow-lg transition-colors">
          Match schedule
        </button>
      </div>
    </div>
  </div>

  <LatestVideos/>
</section>
    </div>
}