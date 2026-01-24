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
       <Heroo title="BLOG TITLE" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />
       <section className="relative w-full min-h-screen bg-white overflow-hidden font-sans text-gray-800">
      

      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#d66095]/10 to-transparent z-0 pointer-events-none" />
 
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#3b3bb7]/10 to-transparent z-0 pointer-events-none" />


      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center md:items-start">
        

        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8 text-black text-center md:text-left w-full">
          Blog Headline
        </h1>


        <p className="text-sm md:text-base leading-relaxed mb-8 text-center md:text-justify text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div className="relative w-full aspect-video md:aspect-[2/1] mb-8 rounded-sm overflow-hidden shadow-sm">
          <Image
            src="/assets/footerimg.jpg"
            alt="Volleyball on Court"
            fill
            className="object-cover"
          />
        </div>

  
        <p className="text-sm md:text-base leading-relaxed mb-6 text-center md:text-justify text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>

       
        <blockquote className="w-full text-lg md:text-xl font-bold italic mb-6 text-black text-center md:text-left">
          “eiusmod tempor incididunt ut labore et dolore magna aliqua.”
        </blockquote>

   
        <p className="text-sm md:text-base leading-relaxed mb-12 text-center md:text-justify text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
  )
}

export default page
