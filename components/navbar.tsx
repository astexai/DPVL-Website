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
    { name: "Teams & Stats", href: "/teams-stats" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Auction", href: "/dpvl-auction" },
    { name: "Points Table", href: "/points-table" },
    { name: "Gallery", href: "/gallery" },
    { name: "DPVL TV", href: "/dpvl-tv" },
    { name: "News", href: "/news" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    // Disable body scroll when menu is open
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white border-t-4 border-[#3b3bb7] ${
          scrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <Headline />

        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-20 w-full">
            
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

            {/* CENTER: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
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
                    {isActive(item.href) && (
                      <span
                        className={`
                          absolute -bottom-1 left-0 right-0
                          h-[2.5px] bg-[#D159A3] rounded-full 
                          transition-transform duration-300 origin-left
                          scale-x-100
                        `}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: Register Button & Burger */}
            <div className="flex-shrink-0 flex items-center">
              <div className="hidden lg:flex">
                <Link href="/register">
                  <button
                    type="button"
                    className="
                      relative overflow-visible
                      h-10 xl:h-11
                      px-4 xl:px-5
                      font-roboto font-bold
                      rounded-lg cursor-pointer
                      transition-all duration-200
                      text-[15px] xl:text-[16px]
                      bg-[#3b3bb7] text-white
                      hover:bg-[#2a2a8a] hover:shadow-lg active:scale-[0.98]
                      group
                    "
                  >
                    <span className="relative z-10">Register Now</span>
                    <div className="
                      absolute -inset-1 rounded-lg
                      border border-[#d66095]
                      opacity-0
                      animate-pulse-outborder
                    "></div>
                  </button>
                </Link>
              </div>

              {/* BURGER ICON */}
              <button
                type="button"
                className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center focus:outline-none hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className={`w-6 h-0.5 bg-[#3b3bb7] rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-6 h-0.5 bg-[#3b3bb7] rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`w-6 h-0.5 bg-[#3b3bb7] rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU - WITH SCROLLING AND COMPACT ITEMS */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-xl"
            >
              {/* Changes here for Mobile: 
                  1. max-h-[80vh] and overflow-y-auto enable scrolling 
                  2. py-4 and gap-2 reduce vertical space 
              */}
              <div className="max-h-[80vh] overflow-y-auto px-6 py-4 flex flex-col gap-2 font-roboto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      text-[15px] px-4 py-2 rounded-lg transition-all duration-200
                      ${isActive(item.href) 
                        ? "text-[#3b3bb7] font-bold bg-blue-50 border-l-4 border-[#3b3bb7]" 
                        : "text-gray-800 font-medium hover:bg-gray-50 hover:pl-6"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="mt-2 bg-[#3b3bb7] text-white py-3 rounded-lg text-center font-bold text-base shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2a2a8a]"
                >
                  Register Now
                </Link>
                {/* Extra spacer at bottom so last item isn't cut off by screen edge */}
                <div className="h-6 shrink-0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Spacer */}
      <div className="h-24 md:h-28 lg:h-31" />
    </>
  );
};

export default Navbar;