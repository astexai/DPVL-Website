import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTimes } from "react-icons/fa";
import Image from "next/image";
import DPVLTeams from "@/components/dpvlteams";
import Socials from "@/components/socials";

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <section
        className={`relative w-full h-[350px] md:h-[510px] overflow-hidden `}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/assets/bg/Banner.png"
            alt="Background Texture"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between">
          <div className="flex flex flex-col items-center md:items-start text-center md:text-left z-20 mt-20 md:mt-0">
            <h2
              className="text-white font-mokoto font-bold text-4xl sm:text-5xl md:text-6xl tracking-widest mb-4"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              TEAMS
            </h2>
            <p className="text-white/90 text-sm md:text-lg font-light leading-relaxed mb-8 max-w-md">
              The league that fuels ambition, celebrates skill, and brings
              volleyball to life.
            </p>
          </div>
        </div>

        <Socials />
      </section>
      <DPVLTeams />
      <FooterGrad />
      <Footer />
    </main>
  );
};

export default page;
