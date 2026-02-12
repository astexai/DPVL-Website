"use client";
import React from "react";
import Image from "next/image";

export default function MissionFounder() {
// State removed

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
      image: "/assets/others/Founder1.png",
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
      image: "/assets/others/Founder2.png",
      text1:
        "Jasoda Gulliya is a former  national volleyball player who has represented Delhi in over 20 national-level championships. At the international level, she won gold in volleyball at the European Masters Games in Italy, proudly representing India on a global stage. Her journey in sport reflects resilience, discipline, and a lifelong commitment to excellence.",
      text2:
        "She currently serves as the Chief Strategy Officer at Fynx Capital Ltd. and is a recognized leader in the financial sector. A powerhouse of intellect and passion, Jasoda has combines 17+ years of corporate leadership experience. She has been a panel speaker at multiple NBFC and banking forums and has been honored with the Women Leadership Award and Women Excellence Award for her professional and social impact.",
      text3:
        "She has also been featured on Zee HD’s “Leaders Today” show, highlighting her dual influence in sports and business.",
      tagline: "“Where professional discipline meets athletic excellence.”",
      role: "Director & Co-Founder | Corporate Leader",
    },
  ];

// Slider logic removed

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
              <p className="text-white/80 font-robo text-justify">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Founder Header */}
        <div className="flex flex-col items-center md:items-start mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-5xl md:text-7xl font-norch uppercase tracking-wide text-white">
              About Founder's
            </h2>
            
          </div>
          <div className="md:w-60 w-40 h-1 bg-[#d66095] mt-2" />
        </div>

        {founders.map((founder, index) => (
          <div 
            key={founder.name}
            className={`relative bg-gradient-to-br from-[#d66095] via-[#a259e6] to-[#7b1fa2] rounded-[30px] p-6 md:p-10 shadow-2xl overflow-hidden mb-12 last:mb-0`}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image
                src="/assets/bg/footerimg.jpg"
                alt="Texture"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[450px]">
              {/* Image Column - Order depends on index */}
              <div className={`w-full md:w-5/12 aspect-[3/4] md:h-[450px] relative rounded-lg overflow-hidden border-4 border-white/10 shadow-xl ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>

              {/* Text Column */}
              <div className={`flex-1 text-white text-center md:text-left flex flex-col ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="space-y-6">
                  <p className="font-robo text-justify">{founder.text1}</p>
                  <p className="font-robo text-justify">{founder.text2}</p>
                  <p className="font-robo text-justify">{founder.text3}</p>
                </div>

                <div className="mt-auto pt-8">
                  <p className="italic text-lg mb-4">
                    {founder.tagline}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase">
                    {founder.name}
                  </h3>
                  <p className="text-white font-bold text-lg">
                    {founder.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
