import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Image from "next/image";
import ShowStoppersAndGallery from "@/components/Stoppers";
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
          <h1 className="text-5xl md:text-7xl text-center font-norch uppercase mb-2 tracking-wide">
            DPVL Mega Auction 2025
          </h1>
          <div className="w-50 md:w-100 h-1 bg-[#3B2DCD]" />
        </div>
      </section>

      {/* SECTION 1: Auction Info Fix */}
      <section className="relative w-full py-16 px-6 md:px-12">
        <Image
          src="/assets/bg/AuctionInfo.png"
          alt="Auction Venue Background"
          fill
          className="object-cover"
          loading="lazy" // Added priority for faster LCP
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
              <h2 className="text-xl md:text-[30px] font-semibold italic text-white/90">
                “Where Talent Meets the Big Stage.”
              </h2>
              <p className="text-white/80 leading-relaxed text-sm md:text-base font-robo mb-4">
                The DPVL Mega Auction is a flagship event of the Delhi Pro
                Volleyball League, bringing together franchise owners, coaches,
                and elite volleyball talent under one platform. Players from
                across the country participate in the auction, offering teams
                the opportunity to build competitive and balanced squads. The
                event follows a structured bidding process designed to ensure
                transparency, fairness, and strategic team formation, laying the
                foundation for an exciting league season.
              </p>

              <p className="text-white/80 leading-relaxed text-sm md:text-base font-robo mb-4">
                As one of the most significant milestones of the league, the
                Mega Auction plays a vital role in shaping the competitive
                landscape of DPVL. It enables franchises to identify emerging
                talent alongside experienced players, using data-driven
                evaluations and tactical planning. This process not only
                strengthens team performance but also raises the overall
                standard of professional volleyball within the league.
              </p>

              <p className="text-white/80 leading-relaxed text-sm md:text-base font-robo">
                Beyond team selection, the DPVL Mega Auction represents a major
                career opportunity for athletes, providing national visibility
                and access to a structured professional ecosystem. It reflects
                DPVL’s commitment to modern sports management, competitive
                integrity, and long-term growth of the sport, while generating
                excitement among fans and stakeholders as the stage is set for
                an action-packed and competitive season ahead. The auction
                serves as the starting point where ambition, strategy, and
                talent come together to define the future of the league.
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
        <div className="absolute inset-0  z-0" />

        {/* FIX: Wrapper with relative z-10 for visibility */}
        <div className="relative z-10 max-w-7xl mx-auto text-white">
          <div className="flex flex-col md:flex-row items-center md:justify-between mb-10 gap-6 md:gap-0">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-5xl md:text-7xl font-norch uppercase tracking-wide">
                Top Picks
                 </h2>
                <div className="w-25 md:w-45 h-1 bg-[#3B2DCD] " />
             
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
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="relative w-full aspect-[4/5]  rounded-sm overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
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
