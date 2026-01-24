"use client";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

export default function MissionFounder() {
  const content = [
    {
      title: "MISSION",
      text: "DPVL aims to establish a competitive, sustainable, and community-driven volleyball ecosystem in Delhi by creating professional opportunities for athletes, growing fan engagement, improving volleyball infrastructure, encouraging youth participation, and delivering high-quality content and broadcast experiences.",
    },
    {
      title: "VISION",
      text: "DPVL aspires to become India’s most admired, culturally integrated, and dynamic volleyball league by setting national benchmarks in professionalism, fan experience, talent development, broadcast storytelling, and community involvement. Through this vision, DPVL builds a lasting volleyball legacy in Delhi.",
    },
  ];

  return (
    <div className="relative w-full py-16 px-6 md:px-12 bg-[#3b3bb7] overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a72] via-[#3b3bb7] to-[#1a237e]" />
        <Image
          src="/assets/footerimg.jpg"
          alt="Texture"
          fill
          className="object-cover opacity-10 mix-blend-overlay"
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 10px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-2 tracking-tight">
            Our Mission & Vision
          </h2>
          <div className="w-48 h-1 bg-[#d66095] shadow-[0_0_10px_#d66095]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20">
          {content.map((item) => (
            <div
              key={item.title}
              className="relative bg-[#1a237e]/40 backdrop-blur-sm border border-[#D159A3] rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:bg-[#1a237e]/60 transition-colors"
            >
              <h3 className="text-2xl font-bold uppercase text-white mb-4 tracking-wider">
                {item.title}
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white italic tracking-tighter">
              Founder’s Note
            </h2>
            <FaChevronRight className="text-[#d66095] text-2xl md:text-4xl mt-1" />
          </div>
          <div className="w-48 md:w-64 h-1 bg-[#d66095] mt-2 shadow-[0_0_10px_#d66095]" />
        </div>

        <div className="relative w-full bg-gradient-to-br from-[#d66095] via-[#a259e6] to-[#7b1fa2] rounded-[30px] p-6 md:p-10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
            <Image
              src="/assets/footerimg.jpg"
              alt="tex"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-5/12 aspect-[3/4] md:aspect-auto md:h-[450px] relative rounded-lg overflow-hidden border-4 border-white/10 shadow-xl shrink-0">
              <Image
                src="/assets/footerimg.jpg"
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left text-white space-y-6">
              <p className="leading-relaxed text-sm md:text-base opacity-95">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p className="leading-relaxed text-sm md:text-base opacity-95">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <p className="leading-relaxed text-sm md:text-base opacity-95">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="mt-4 w-full">
                <p className="text-lg md:text-xl font-medium italic mb-4 opacity-100">
                  “Lorem ipsum dolor sit amet, consectetur adipiscing aliqua.”
                  (Tagline)
                </p>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                  FOUNDER’S NAME
                </h3>
                <p className="text-[#2a2a72] font-bold text-lg">
                  Founder, DPVL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
