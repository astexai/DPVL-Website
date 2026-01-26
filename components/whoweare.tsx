"use client";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

export default function WhoWeAre() {
  return (
    <section className="relative w-full py-16 px-6 md:px-12 bg-[#e3f2fd] overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-pink-100" />

        <Image
          src="/assets/bg/WhoAre.png"
          alt="Court Texture"
          fill
          className="object-cover "
        />

     
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-25">
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center relative"></div>

          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-1">
              <h2
                className="text-3xl md:text-5xl font-bold uppercase text-black tracking-tight"
                style={{ fontFamily: "sans-serif" }}
              >
                WHO WE ARE
              </h2>
              <FaChevronRight className="text-[#3b3bb7] text-2xl md:text-4xl stroke-[3px]" />
            </div>

            <div className="w-32 md:w-48 h-1 bg-[#3b3bb7] mb-8" />

            <h3 className="text-lg md:text-xl font-semibold italic text-black/80 mb-6">
              “Elevating Volleyball. Empowering Athletes.”
            </h3>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base  max-w-2xl text-justify">
              The Delhi Pro Volleyball League (DPVL) is a professionally
              structured league designed to elevate volleyball in Delhi and NCR
              by combining high-level athletic competition with entertainment,
              community engagement, and modern sports management. It aims to
              transform volleyball into a major spectator sport while creating
              meaningful professional opportunities for local athletes. DPVL
              focuses on nurturing talent, promoting competitive excellence, and
              inspiring the next generation of players. Through structured
              competition and fan-centric experiences, the league strengthens
              the connection between the sport and its community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
