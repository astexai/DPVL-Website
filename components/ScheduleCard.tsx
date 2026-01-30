import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import LatestVideos from "./latestvideos";
import Image from "next/image";
import Link from "next/link";

export default function ScheduleCard() {
  return (
    <div>
      <section
        className="relative z-30 w-full rounded-xl md:rounded-[85px] pb-16 px-4 md:px-0"
        style={{
          backgroundImage: "url('/assets/bg/LatestVideo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* CARD WRAPPER */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-20 md:pt-0 pt-20">
          {/* 🔒 FIXED HEIGHT CARD */}
          <div className="relative h-65 md:h-67  rounded-xl overflow-hidden shadow-2xl border-[3px] border-[#D159A3]">

            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/assets/bg/Schedule.png"
                alt="bg"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* CONTENT (ABSOLUTE → WON'T RESIZE CARD) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-2 text-white">
              
              {/* Teams */}
              <div className="flex items-center justify-center gap-6 w-full mb-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="text-lg md:text-2xl uppercase tracking-wider font-bebas">
                    Team 1
                  </span>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    TBD
                  </div>
                </div>

                <Image
                  src="/assets/others/Vs.png"
                  alt="vs"
                  width={55}
                  height={55}
                  loading="lazy"
                />

                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="text-lg md:text-2xl uppercase tracking-wider font-bebas">
                    Team 2
                  </span>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    TBD
                  </div>
                </div>
              </div>

              {/* Date & Venue */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-8 text-sm md:text-lg font-bebas text-white mb-6 text-center">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>JUNE 13, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <span>VENUE EXAMPLE</span>
                </div>
              </div>
<Link href={"/fixtures"}>
              {/* Button */}
              <button className="bg-[#d66095] hover:bg-[#b54a7b] text-white px-6 py-2 rounded text-sm uppercase tracking-wide font-medium shadow-lg transition-colors">
                Match schedule
              </button>
              </Link>
            </div>
          </div>
        </div>

        <LatestVideos />
      </section>
    </div>
  );
}
