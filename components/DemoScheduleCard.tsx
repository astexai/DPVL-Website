import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import LatestVideos from "./latestvideos";
import Image from "next/image";

export default function ScheduleCard() {
  return (
    <div>
      <section
        className="relative z-30 w-full rounded-4xl md:rounded-[85px] pb-16 px-4 md:px-0"
        style={{
          backgroundImage: "url('/assets/bg/LatestVideo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* CARD WRAPPER */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-20">
          {/* 🔒 FIXED HEIGHT CARD */}
          <div className="relative h-[260px] md:h-[268px] rounded-3xl overflow-hidden shadow-2xl">

            {/* Gradient Background - matching the image */}
  
              {/* Diagonal pattern overlay */}
             
              
              {/* Stadium/field background subtle overlay */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/bg/Schedule.png"
                  alt="bg"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
          

            {/* CONTENT */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-8 text-white">
              
              {/* Main horizontal layout */}
              <div className="flex items-center justify-between w-full max-w-3xl">
                
                {/* TEAM 1 - Left Side */}
                <div className="flex flex-col items-center gap-3 md:gap-4">
                  <span className="text-lg md:text-4xl uppercase tracking-wider font-bebas">Team 1</span>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-gray-600 font-bold text-xl md:text-2xl shadow-xl">
                    TBD
                  </div>
                </div>

                {/* CENTER COLUMN - VS, Date, Venue, Button */}
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4 px-4 md:px-8">
                  
                  {/* VS Icon */}
                  <div className="relative">
                    <Image
                      src="/assets/others/Vs.png"
                      alt="vs"
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-white">
                    <FaCalendarAlt className="text-lg md:text-xl" />
                    <span className="text-base md:text-lg uppercase tracking-wide font-medium whitespace-nowrap">
                      JUNE 13, 2025
                    </span>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center gap-2 text-white">
                    <FaMapMarkerAlt className="text-lg md:text-xl" />
                    <span className="text-base font-bebas md:text-lg uppercase tracking-wide font-medium whitespace-nowrap">
                      VENUE EXAMPLE
                    </span>
                  </div>

                  {/* Button */}
                  <button className="mt-2 bg-gradient-to-r from-[#E74C8C] to-[#D946A6] hover:from-[#D43D7D] hover:to-[#C8368F] text-white px-6 md:px-8 py-2 md:py-2.5 rounded-md text-sm md:text-base capitalize tracking-wide font-medium shadow-lg transition-all duration-300 hover:shadow-xl">
                    Match schedule
                  </button>
                </div>

                {/* TEAM 2 - Right Side */}
                <div className="flex flex-col items-center gap-3 md:gap-4">
                  <span className="text-lg md:text-4xl uppercase tracking-wider font-bebas">Team 2</span>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-gray-600 font-bold text-xl md:text-2xl shadow-xl">
                    TBD
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <LatestVideos />
      </section>
    </div>
  );
}

