import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      <Heroo
        title="DETAILED BLOG"
        subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life."
      />
      <section className="relative w-full min-h-screen bg-white overflow-hidden font-sans text-gray-800">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#d66095]/10 to-transparent z-0 pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#3b3bb7]/10 to-transparent z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 text-black text-center md:text-left w-full">
            The League That Fuels Ambition, Celebrates Skill, and Brings
            Volleyball to Life
          </h1>

          <p className="text-sm md:text-base leading-relaxed mb-8 text-center md:text-justify text-gray-700">
            The Delhi Pro Volleyball League stands as a powerful platform
            dedicated to transforming the landscape of volleyball by blending
            passion, professionalism, and purpose. Designed to uplift the sport
            at every level, the league provides aspiring athletes with an
            opportunity to showcase their talent on a competitive stage while
            inspiring fans through high-energy matches and unforgettable
            moments. More than just a tournament, the league represents a
            movement that believes in nurturing ambition and rewarding
            dedication. By creating a professionally managed environment, the
            league ensures that players, coaches, and teams are supported with
            modern infrastructure, structured competition, and transparent
            systems. This approach not only enhances performance but also builds
            confidence among athletes who dream of representing volleyball at
            higher levels.
          </p>

          <div className="relative w-full aspect-video md:aspect-[2/1] mb-8 rounded-sm overflow-hidden shadow-sm">
            <Image
              src="/assets/bg/footerimg.jpg"
              alt="Volleyball on Court"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-sm md:text-base leading-relaxed mb-6 text-center md:text-justify text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </p>

          <blockquote className="w-full text-lg md:text-xl font-bold italic mb-6 text-black text-center md:text-left">
            “A league built on ambition, driven by talent, and powered by the
            spirit of volleyball.”
          </blockquote>

          <p className="text-sm md:text-base leading-relaxed mb-12 text-center md:text-justify text-gray-700">
            The Delhi Pro Volleyball League is not just about winning matches —
            it is about shaping the future of volleyball. By providing a clear
            pathway for talent development and promoting professionalism at
            every level, the league plays a vital role in strengthening the
            sport’s ecosystem. It inspires young players to dream bigger, trains
            them to compete better, and gives them a platform where effort meets
            opportunity. As the league continues to grow, it aims to redefine
            how volleyball is perceived, watched, and played. With ambition at
            its heart and skill as its foundation, the league truly brings
            volleyball to life for players, fans, and the sporting community
            alike.
          </p>

          <Link href="/blogs">
            <button className="flex items-center gap-2 text-[#4a148c] font-bold text-lg hover:translate-x-[-5px] transition-transform duration-300">
              <FaArrowLeft className="text-xl" />
              <span>Back</span>
            </button>
          </Link>
        </div>
      </section>
      <FooterGrad />
      <Footer />
    </main>
  );
};

export default page;
