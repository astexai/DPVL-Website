'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Headline from "./headline";
import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
  name: string;
  href: string;
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Teams", href: "/teams" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Auction", href: "/dpvl-auction" },
    { name: "Points Table", href: "/points-table" },
    { name: "Gallery", href: "/gallery" },
    { name: "Dpvl TV", href: "/dpvl-tv" },
    { name: "News", href: "/news" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleScroll = (): void => { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (): void => setOpen((prev) => !prev);
  const closeMenu = (): void => setOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white border-t-4 border-[#3b3bb7] ${
        scrolled ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <Headline />

      <div className="w-full px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-22 w-full">
          
          {/* LEFT: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/Logo-final-1.png"
                alt="DPVL Logo"
                width={350}
                height={120}
                className="h-10 md:h-14 lg:h-16 xl:h-18 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8 xl:mx-12">
            <div className="flex items-center justify-center gap-x-2 xl:gap-x-3 2xl:gap-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group relative 
                    text-[15px] xl:text-[16px] 2xl:text-[17px]
                    font-roboto font-bold 
                    transition-all duration-200 
                    whitespace-nowrap
                    py-1 px-1.5 tracking-tight
                    ${isActive(item.href) 
                      ? "text-[#3b3bb7]" 
                      : "text-gray-900 hover:text-[#3b3bb7]"
                    }
                  `}
                >
                  {item.name}
                  <span
                    className={`
                      absolute -bottom-1 left-0 right-0
                      h-[2.5px] bg-[#D159A3] rounded-full 
                      transition-transform duration-300 origin-left
                      ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: Register Button - REDUCED SIZE */}
          <div className="flex-shrink-0 flex items-center">
            <div className="hidden lg:flex">
              <Link href="/register">
                <button
                  type="button"
                  className="
                    relative overflow-hidden
                    h-9 xl:h-10
                    px-5 xl:px-6
                    font-roboto font-bold
                    rounded-lg shadow-md
                    transition-all duration-200
                    text-[14px] xl:text-[15px]
                    bg-[#3b3bb7] text-white
                    hover:bg-[#2a2a8a] hover:shadow-lg active:scale-[0.98] cursor-pointer
                  "
                >
                  <span className="relative z-10">Register Now</span>
                </button>
              </Link>
            </div>

            {/* BURGER ICON */}
            <button
              type="button"
              className="lg:hidden flex flex-col gap-1 w-10 h-10 items-center justify-center focus:outline-none"
              onClick={toggleMenu}
            >
              <span className={`w-7 h-0.5 bg-[#3b3bb7] rounded-full transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-7 h-0.5 bg-[#3b3bb7] rounded-full ${open ? "opacity-0" : ""}`} />
              <span className={`w-7 h-0.5 bg-[#3b3bb7] rounded-full transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b-2 border-gray-100 overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-4 font-roboto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-xl ${isActive(item.href) ? "text-[#3b3bb7] font-bold" : "text-gray-800 font-medium"}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/register"
                onClick={closeMenu}
                className="bg-[#3b3bb7] text-white py-3 rounded-lg text-center font-bold text-xl"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;