"use client";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

export default function WhoWeAre() {
  return (
    <section className="relative w-full py-12 md:py-20 px-5 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/bg/WhoAre.png"
          alt="Court Texture"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          {/* Left spacer / image placeholder (hidden on mobile) */}
          <div className="hidden md:block md:w-1/3" />

          {/* Content */}
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Heading */}
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mb-2 flex-wrap">
              <h2 className="text-5xl sm:text-3xl md:text-7xl font-norch tracking-wide uppercase text-black">
                Who We Are
              </h2>
              <FaChevronRight className="text-[#3b3bb7] text-4xl sm:text-2xl md:text-4xl shrink-0" />
            </div>

            {/* Divider */}
            <div className="mr-20 w-30 md:w-50 h-1 bg-[#3b3bb7] mb-6 md:mb-8" />

            {/* Tagline */}
            <h3 className="text-base sm:text-lg md:text-xl font-semibold italic text-black/80 mb-5 md:mb-6">
              “Elevating Volleyball. Empowering Athletes.”
            </h3>

            {/* Paragraph */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base max-w-2xl text-left md:text-justify">
              The Delhi Pro Volleyball League (DPVL) is a professionally
              structured league designed to elevate volleyball in Delhi and NCR
              by combining high-level athletic competition with entertainment,
              community engagement, and modern sports management. It aims to
              transform volleyball into a major spectator sport while creating
              meaningful professional opportunities for local athletes. DPVL
              focuses on nurturing talent, promoting competitive excellence, and
              inspiring the next generation of players. Through structured
              competition and fan-centric experiences, the league strengthens
              the connection between the sport and its community. By fostering
              grassroots development and providing a clear pathway to
              professional play, DPVL contributes to the long-term growth of
              volleyball in the region.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
