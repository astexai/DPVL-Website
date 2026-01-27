import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Image from "next/image";
import ShowStoppersAndGallery from "@/components/megaauction";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <Heroo
        title="AUCTION"
        subtitle="The league that fuels ambition, celebrates skills and brings Volleyball to life."
      />

      <section className="relative w-full py-10 px-5 md:px-12 bg-[#d66095]">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
            UPKL Mega Auction 2025
          </h1>
          <div className="w-32 md:w-150 h-1.5 bg-[#1a237e]" />
        </div>
      </section>

      {/* SECTION 1: Auction Info Fix */}
      <section className="relative w-full py-16 px-6 md:px-12">
        <Image
          src="/assets/bg/AuctionInfo.png"
          alt="Auction Venue Background"
          fill
          className="object-cover"
          priority // Added priority for faster LCP
        />

        {/* FIX: Use relative and z-10 to lift content above the absolute background image */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
            <div className="w-full md:w-5/12 aspect-square relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
              <Image
                src="/assets/bg/Dpvl.png"
                alt="Auction Venue"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold italic text-white/90">
                “Lorem ipsum dolor sit amet, consectetur”
              </h2>
              <p className="text-white/80 leading-relaxed text-sm md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Top Picks Fix */}
      <section className="relative w-full py-16 px-6 md:px-12 overflow-hidden">
        <Image
          src="/assets/bg/Blog.png"
          alt="Blog Background"
          fill
          className="object-cover"
        />

        {/* Optional: Dark overlay to make text pop against light backgrounds */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* FIX: Wrapper with relative z-10 for visibility */}
        <div className="relative z-10 max-w-7xl mx-auto text-white">
          <div className="flex flex-col md:flex-row items-center md:justify-between mb-10 gap-6 md:gap-0">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">
                Top Picks
              </h2>
              <div className="w-24 h-1 bg]" />
            </div>

            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <FaChevronLeft />
              </button>
              <button className="w-10 h-10 rounded-full bg-white text-[#d66095] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {[1, 2, 3,].map((item) => (
    <div
      key={item}
      className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#4a7acd] to-[#1a237e] rounded-sm overflow-hidden shadow-2xl group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
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
      </section>

      <ShowStoppersAndGallery />
      <FooterGrad />
      <Footer />
    </main>
  );
};

export default page;
