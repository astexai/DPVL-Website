"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function MissionFounder() {
  const [founderIndex, setFounderIndex] = useState(0);

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

const founders = [
  {
    name: "Ms. Neeti Rawat",
    image: "/assets/founder2.jpg",
    text1: "A former Gold Medalist at the European Masters Games and a trusted national sports anchor, Neeti brings unparalleled authenticity to DPVL. Her voice has shaped Indian sports storytelling for years.",
    text2: "With a Postgraduate degree in Physical Education & Sports Science, she blends athletic insight with broadcast expertise to set national benchmarks in sports presentation.",
    text3: "She is dedicated to creating a professional platform that honors the legacy of volleyball while inspiring the next generation of athletes.",
    tagline: "“Building an authentic legacy for Indian Volleyball.”",
    role: "Director & Co-Founder | Sports Presenter",
  },
{
    name: "Ms. Jasoda Gulliya",
    image: "/assets/founder1.jpg",
    text1: "A powerhouse in sports and corporate strategy, Jasoda has represented Delhi in 20+ national tournaments and won Gold at the European Masters Games, Torino.",
    text2: "Recognized as Women Leader of the Year 2024 and a CIO Trendsetter, she applies executive discipline to build a sustainable, world-class sports property.",
    text3: "Her leadership ensures DPVL bridges the gap between professional corporate standards and raw athletic excellence.",
    tagline: "“Where professional discipline meets athletic excellence.”",
    role: "Director & Co-Founder | Corporate Leader"
  }
];

  const toggleFounder = () => {
    setFounderIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="relative w-full py-16 px-6 md:px-12 bg-[#3b3bb7] overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/assets/bg/InfoBg.png" alt="Texture" fill className="object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Mission/Vision Section */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-2 tracking-tight">
            Our Mission & Vision
          </h2>
          <div className="w-48 h-1 bg-[#d66095] shadow-[0_0_10px_#d66095]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20">
          {content.map((item) => (
            <div key={item.title} className="relative bg-[#1a237e]/40 backdrop-blur-sm border border-[#D159A3] rounded-xl p-8 flex flex-col items-center text-center shadow-lg transition-colors">
              <h3 className="text-2xl font-bold uppercase text-white mb-4 tracking-wider">{item.title}</h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Founder's Note Header */}
        <div className="flex flex-col items-center md:items-start mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white italic tracking-tighter">
              Founder’s Note
            </h2>
            <FaChevronRight className="text-[#d66095] text-2xl md:text-4xl mt-1" />
          </div>
          <div className="w-48 md:w-64 h-1 bg-[#d66095] mt-2 shadow-[0_0_10px_#d66095]" />
        </div>

        {/* Founder Card Wrapper */}
        <div className="relative w-full bg-gradient-to-br from-[#d66095] via-[#a259e6] to-[#7b1fa2] rounded-[30px] p-6 md:p-10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply">
            <Image src="/assets/footerimg.jpg" alt="tex" fill className="object-cover" />
          </div>

          {/* Current Founder Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[450px]">
            <div className="w-full md:w-5/12 aspect-[3/4] md:aspect-auto md:h-[450px] relative rounded-lg overflow-hidden border-4 border-white/10 shadow-xl shrink-0">
              <Image
                src={founders[founderIndex].image}
                alt="Founder"
                fill
                className="object-cover transition-opacity duration-500"
              />
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left text-white space-y-6">
              <p className="leading-relaxed text-sm md:text-base opacity-95">{founders[founderIndex].text1}</p>
              <p className="leading-relaxed text-sm md:text-base opacity-95">{founders[founderIndex].text2}</p>
              <p className="leading-relaxed text-sm md:text-base opacity-95">{founders[founderIndex].text3}</p>

              <div className="mt-4 w-full">
                <p className="text-lg md:text-xl font-medium italic mb-4 opacity-100">{founders[founderIndex].tagline}</p>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">{founders[founderIndex].name}</h3>
                <p className="text-[#2a2a72] font-bold text-lg">Director & Co-Founder, DPVL</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Placed at the Bottom Right/Center */}
          <div className="relative z-20 flex justify-center md:justify-end items-center gap-4 mt-8 md:mt-[-20px]">
            <button 
              onClick={toggleFounder}
              className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all shadow-lg"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={toggleFounder}
              className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all shadow-lg"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}