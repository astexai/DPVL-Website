import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTimes } from "react-icons/fa";
import Image from "next/image";
import DPVLTeams from "@/components/dpvlteams";
import Socials from "@/components/socials";
import Heroo from "@/components/herosection";

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <section
        className={`relative w-full h-[300px] md:h-[430px] overflow-hidden `}
      >
        <Heroo title="TEAMS & STATS"/>

        <Socials />
      </section>
      <DPVLTeams />
      <FooterGrad />
      <Footer />
    </main>
  );
};

export default page;
