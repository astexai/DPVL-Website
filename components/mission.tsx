"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function MissionFounder() {
  const [founderIndex, setFounderIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
      image: "/assets/others/Founder2.jpg",
      text1:
        "A former Gold Medalist at the European Masters Games and a respected national sports anchor, Neeti brings unmatched authenticity and credibility to DPVL through her deep-rooted connection with Indian sports.",
      text2:
        "With a Postgraduate degree in Physical Education & Sports Science, she combines elite athletic understanding with broadcast excellence to define new national standards in sports presentation.",
      text3:
        "She is committed to building a professional platform that honors volleyball’s legacy while inspiring future athletes. Her vision focuses on elevating Indian volleyball globally through credibility, storytelling, and athlete-first values.",
      tagline: "“Building an authentic legacy for Indian Volleyball.”",
      role: "Director & Co-Founder | Sports Presenter",
    },
    {
      name: "Ms. Jasoda Gulliya",
      image: "/assets/others/Founder1.jpg",
      text1:
        "A leader in sports performance and corporate strategy, Jasoda has represented Delhi in over 20 national tournaments, bringing first-hand experience of elite competition into DPVL’s foundation.",
      text2:
        "Recognized as Women Leader of the Year 2024 and a CIO Trendsetter, she applies executive discipline and strategic rigor to develop a sustainable, transparent, and world-class sports league.",
      text3:
        "Her leadership bridges professional corporate governance with high-performance sport. She is driven to create long-term institutional strength while empowering athletes through structured growth and opportunity.",
      tagline: "“Where professional discipline meets athletic excellence.”",
      role: "Director & Co-Founder | Corporate Leader",
    },
  ];

  const toggleFounder = (direction = "next") => {
    setIsVisible(false);
    setTimeout(() => {
      setFounderIndex((prev) =>
        direction === "next"
          ? (prev + 1) % founders.length
          : (prev - 1 + founders.length) % founders.length
      );
      setIsVisible(true);
    }, 250);
  };

  return (
    <div className="relative w-full py-16 px-6 md:px-12 bg-[#3b3bb7] overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/bg/InfoBg.png"
          alt="Texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Mission / Vision */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-5xl md:text-7xl text-center font-norch tracking-wide uppercase text-white mb-2">
            Our Mission & Vision
          </h2>
          <div className="md:w-90 w-55 h-1 bg-[#D159A3]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-20">
          {content.map((item) => (
            <div
              key={item.title}
              className="bg-[#1a237e]/40 backdrop-blur-sm border border-[#D159A3] rounded-xl p-8 text-center shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_5px_rgba(209,89,163,0.4)]"
            >
              <h3 className="text-2xl font-bold font-robo uppercase text-white mb-4">
                {item.title}
              </h3>
              <p className="text-white/80 font-robo">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Founder Header */}
        <div className="flex flex-col items-center md:items-start mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-5xl md:text-7xl font-norch uppercase tracking-wide text-white">
              Founder’s Note
            </h2>
            
          </div>
          <div className="md:w-60 w-40 h-1 bg-[#d66095] mt-2" />
        </div>

        {/* Founder Card */}
        <div className="relative bg-gradient-to-br from-[#d66095] via-[#a259e6] to-[#7b1fa2] rounded-[30px] p-6 md:p-10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image
              src="/assets/bg/footerimg.jpg"
              alt="Texture"
              fill
              className="object-cover"
            />
          </div>

          {/* Animated Content */}
          <div
            className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[450px]
              transition-all duration-300 ease-in-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {/* Image */}
            <div className="w-full md:w-5/12 aspect-[3/4] md:h-[450px] relative rounded-lg overflow-hidden border-4 border-white/10 shadow-xl">
              <Image
                key={founders[founderIndex].image}
                src={founders[founderIndex].image}
                alt="Founder"
                fill
                loading="lazy"
                className="object-cover "
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-white text-center md:text-left flex flex-col">
              <div className="space-y-6">
                <p className="font-robo">{founders[founderIndex].text1}</p>
                <p className="font-robo">{founders[founderIndex].text2}</p>
                <p className="font-robo">{founders[founderIndex].text3}</p>
              </div>

              {/* Bottom-aligned Name */}
              <div className="mt-auto pt-8">
                <p className="italic text-lg mb-4">
                  {founders[founderIndex].tagline}
                </p>
                <h3 className=" text-2xl md:text-3xl font-bold uppercase">
                  {founders[founderIndex].name}
                </h3>
                <p className="text-[#3b3bb7] font-bold text-lg">
                  Director & Co-Founder, DPVL
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="relative z-20 flex justify-center md:justify-end gap-4 mt-8">
            <button
              onClick={() => toggleFounder("prev")}
              className="inline-flex justify-center items-center w-12 h-12 rounded-full border-2 border-white/50 text-white hover:bg-white/20 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => toggleFounder("next")}
              className="inline-flex justify-center items-center w-12 h-12 rounded-full border-2 border-white/50 text-white hover:bg-white/20 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
