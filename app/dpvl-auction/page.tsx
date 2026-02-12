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
       
      />

     <section className="relative w-full py-10 px-5 md:px-12 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/assets/bg/Strip.png"
      alt="Auction background"
      fill
      className="object-cover"
    />
    {/* Optional: Add overlay for better text readability */}
    <div className="absolute inset-0" />
  </div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center">
    <h1 className="text-5xl md:text-7xl text-center font-norch uppercase mb-2 tracking-wide text-white">
      DPVL Mega Auction 2026
    </h1>
    <div className="w-50 md:w-100 h-1 bg-[#3B2DCD]" />
  </div>
</section>

      {/* SECTION 1: Auction Info Fix */}
      <section className="relative w-full py-16 px-6 md:px-8">
  {/* Background Image */}
  <Image
    src="/assets/bg/AuctionInfo.png"
    alt="Auction Venue Background"
    fill
    className="object-cover"
    loading="lazy"
  />

  {/* Content Wrapper */}
  <div className="relative z-10 max-w-7xl mx-auto">
    
    {/* --- NEW: COMING SOON SECTION --- */}
    <div className="w-full text-center mb-12 md:mb-8">
      <h1 className="font-norch text-5xl md:text-[64px] text-white uppercase tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
        Coming Soon
      </h1>
      <div className="w-24 md:w-50 h-1 bg-[#d65db1] mx-auto mt-2 md:mt-2 rounded-full"></div>
    </div>
    {/* -------------------------------- */}

    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      
      {/* Side Image */}
      <div className="w-full md:w-5/12 aspect-square relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
        <Image
          src="/assets/bg/coming.jpg"
          alt="Auction Venue"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Text Content */}
      <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <h2 className="text-xl md:text-[30px] font-semibold italic text-white/90">
          “Where Talent Meets the Big Stage.”
        </h2>
        <p className="text-white/80 leading-relaxed text-sm md:text-base font-robo">
          The DPVL Mega Auction is a flagship event of the Delhi Pro
          Volleyball League, bringing together franchise owners, coaches,
          and elite volleyball talent under one platform. Players from
          across the country participate in the auction, offering teams
          the opportunity to build competitive and balanced squads. The
          event follows a structured bidding process designed to ensure
          transparency, fairness, and strategic team formation, laying the
          foundation for an exciting league season.
        </p>

        <p className="text-white/80 leading-relaxed text-sm md:text-base font-robo">
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
      <FooterGrad />
      <Footer />
    </main>
  );
};

export default page;
