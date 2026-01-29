"use client";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTimes } from "react-icons/fa";
import Socials from "./socials";

export default function Heroo({ title = "GALLERY", subtitle = "d" }) {
  return (
    <section
      className={`relative w-full h-[300px] md:h-[430px] overflow-hidden `}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/assets/bg/Banner.png"
          alt="Background"
          fill
          priority
          className=" object-cover"
          
        />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center">
  <div className="text-left w-full">
    <h1 className="text-white font-norch text-4xl sm:text-5xl md:text-9xl tracking-wide">
      {title}
    </h1> 
  </div>
</div>

      <Socials />
    </section>
  );
}
