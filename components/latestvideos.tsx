"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LatestVideos() {
  const [activeTab, setActiveTab] = useState(0);
    const videoTabs = [
  [
    { img: "/assets/footerimg.jpg", title: "DPVL Set for Biggest Season Yet" },
    { img: "/assets/logo.jpg", badge: "1st Position" },
    { img: "/assets/footerimg.jpg" },
  ],
  [
    { img: "/assets/logo.jpg", title: "Season Highlights & Best Moments" },
    { img: "/assets/footerimg.jpg", badge: "Top Match" },
    { img: "/assets/logo.jpg" },
  ],
  [
    { img: "/assets/footerimg.jpg", title: "Finals Recap & Trophy Lift" },
    { img: "/assets/logo.jpg", badge: "Champion" },
    { img: "/assets/footerimg.jpg" },
  ],
];

  return (
    <div className="pt-48 md:pt-40 max-w-6xl mx-auto px-4 md:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center md:items-start mb-10 pt-10">
        <h2 className="text-3xl md:text-5xl text-white font-bold uppercase italic tracking-tighter mb-2">
          Latest Videos
        </h2>
        <div className="w-24 h-1 bg-white rounded-full" />
      </div>

      {/* Animated Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {videoTabs[activeTab].map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-black shadow-xl cursor-pointer"
            >
              <Image
                src={item.img}
                alt="Video"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              {item.title && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                      <FaPlay className="text-[#a259e6] text-2xl" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 text-white text-lg font-bold">
                    {item.title}
                  </div>
                </>
              )}

              {item.badge && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#efc94c] text-black px-4 py-1 rounded shadow font-bold text-xs uppercase">
                  {item.badge}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Bars */}
      <div className="flex justify-center mt-10 gap-2">
        {videoTabs.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-8 h-2 rounded-full transition-colors ${
              activeTab === index ? "bg-blue-800" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
