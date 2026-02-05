"use client";
import React from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";

export default function Footer() {
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Teams", href: "/teams" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Auction", href: "/dpvl-auction" },
    { name: "Points Table", href: "/points-table" },
    { name: "Gallery", href: "/gallery" },
    { name: "Dpvl Tv", href: "/dpvl-tv" },
    { name: "News", href: "/news" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <footer className="relative w-full text-white pt-16  pb-8 ">
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src="/assets/bg/Footer.png"
          alt="Footer Background"
          fill
          className="object-cover opacity-120"
          loading="lazy"
        />

        <div className="absolute inset-0 " />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12 text-center md:text-left">
          <div className="md:col-span-4 flex flex-col items-center justify-center md:items-start space-y-6">
            <div className=" relative w-70 h-40 md:w-80 md:h-40 md:-ml-13 ml-0 mb-20">
              <Image
                src="/assets/logos/white_logo.png"
                alt="DPVL Logo"
                width={450}
                height={250}
                loading="lazy"
                className="object-contain"
              />
            </div>
            <span className="text-lg italic absolute top-40">
              &quot;Where Delhi Rises.
              <br /> Where Champions Play.&quot;
            </span>
            <div className="flex flex-col items-center md:items-start w-full">
              <span className="text-lg font-medium border-b-2 border-white/30 pb-1 mb-4 inline-block">
                Follow us on
              </span>
              <div className="flex gap-3 justify-center md:justify-start">
                <Link href={"https://instagram.com/delhiprovolleyball"}>
                <SocialIcon icon={<FaInstagram />} />
                </Link>
                <Link href={"https://www.facebook.com/profile.php?id=61585847188129"}>
                <SocialIcon icon={<FaFacebookF />} />
                </Link>
                 <Link href={"https://www.youtube.com/@DPVLofficial"}>
                <SocialIcon icon={<FaYoutube />} />
                </Link>
       
              </div>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-medium mb-6 relative inline-block">
              Quick Links
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white/40"></span>
            </h3>
            <ul className="space-y-1 font-light text-white/90 text-sm md:text-base flex flex-col items-start w-full max-w-50 ml-30 md:mx-0 md:max-w-none">
              {footerLinks.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2 group w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[#d66095] transition-colors shrink-0" />

                  <Link
                    href={item.href}
                    className="block hover:text-pink-200 hover:translate-x-1 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-start gap-9.5">
            <div>
              <h3 className="text-xl font-medium mb-3 relative inline-block">
                Contact Info
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white/40"></span>
              </h3>

              <div className="flex flex-col gap-2  text-white/90 text-sm md:text-base">
                <a className="hover:text-pink-200 transition-colors">
                  +91 77999 88500


                </a>
                <a className="hover:text-pink-200 transition-colors">
                  +91 98119 79075
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3 relative inline-block">
                Address
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white/40"></span>
              </h3>

              <div className="flex flex-col gap-2 text-white/90 text-sm md:text-base md:pb-0 pb-2">
                <a className="hover:text-pink-200 transition-colors">
                  Delhi Pro Volleyball League Headquarters, New Delhi, India
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4 relative">
                Email Address
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white/40"></span>
              </h3>
              <a className="hover:text-pink-200 transition-colors">info@delhiprovolleyball.com</a>
            </div>
          </div>
        </div>

        <div className="w-full h-0.5 bg-[#D35CA7] my-6" />

        <div className="text-center text-xs md:text-sm font-light text-white/80">
          Copyright 2026 Delhi Pro Volleyball League, All Right Reserved
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-9 h-9 rounded-full bg-white text-[#d66095] flex items-center justify-center hover:bg-[#d66095] hover:text-white transition-all duration-300 shadow-sm"
    >
      <span className="text-base">{icon}</span>
    </a>
  );
}
