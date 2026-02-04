import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TopPicks()
{
    return <div>
        <section className="relative w-full py-16 px-6 md:px-12 overflow-hidden">
      <Image
        src="/assets/bg/Blog.png"
        alt="Blog Background"
        fill
        className="object-cover"
      />

      {/* Optional: Dark overlay to make text pop against light backgrounds */}
      <div className="absolute inset-0 z-0" />

      {/* FIX: Wrapper with relative z-10 for visibility */}
      <div className="relative z-10 max-w-7xl mx-auto text-white">
        {/* Header Section - Desktop only shows buttons */}
        <div className="flex flex-col md:flex-row items-center md:justify-between mb-10 gap-6 md:gap-0">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-5xl md:text-7xl font-norch uppercase tracking-wide">
              Top Picks
            </h2>
            <div className="w-25 md:w-45 h-1 bg-[#3B2DCD]" />
          </div>

          {/* Navigation Buttons - Desktop only */}
          <div className="hidden md:flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <FaChevronLeft />
            </button>
            <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Grid - 1 card visible on mobile, 3 columns on desktop */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className={`relative w-full aspect-[4/5] rounded-sm overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300 ${
                  index > 0 ? 'hidden md:block' : ''
                }`}
              >
                {/* The Image - filling the card */}
                <Image
                  src="/assets/bg/TopPicks.png"
                  alt={`Top Pick Player ${item}`}
                  fill
                  className="object-cover object-center"
                />

                {/* Shadow overlay at the bottom so the image feels "grounded" */}
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Mobile only, below the grid */}
        <div className="flex md:hidden justify-center gap-3 mt-6">
          <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <FaChevronLeft />
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
    </div>
}