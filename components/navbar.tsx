'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Headline from "./headline";
import { AnimatePresence, motion } from "framer-motion";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

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
    { name: "Our Teams", href: "/teams-stats" },
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white border-t-4 border-[#3b3bb7] ${
          scrolled ? "shadow-xl" : "shadow-md"
        }`}
      >
        <Headline />

        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-20 w-full">
            
            {/* LEFT: Logo - Adjusted size and spacing */}
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

            {/* CENTER: Navigation Links - Optimized font sizes and spacing */}
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
        {/* Pink underline - ONLY when active */}
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

            {/* RIGHT: Register Button - Better proportioned */}
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
    rounded-lg
    transition-all duration-200
    text-[15px] xl:text-[16px]
    bg-[#3b3bb7] text-white
    hover:bg-[#2a2a8a] hover:shadow-lg active:scale-[0.98]
    group
  "
>
  <span className="relative z-10">Register Now</span>
  
  {/* Single compact pulse effect */}
  <div className="
    absolute -inset-1 rounded-lg  /* Reduced spread */
    border border-[#d66095]  /* Single border */
    opacity-0
    animate-pulse-outborder
  "></div>
</button>
   
    

                </Link>
              </div>

              {/* BURGER ICON - Improved styling */}
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

        {/* MOBILE MENU - Enhanced styling */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-xl"
            >
              <div className="px-6 py-8 flex flex-col gap-4 font-roboto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      text-lg px-4 py-3 rounded-lg transition-all duration-200
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
                  className="mt-4 bg-[#3b3bb7] text-white py-3.5 rounded-lg text-center font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2a2a8a]"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* FIXED: Spacer with correct height calculation */}
      {/* Navbar height (h-16 md:h-20) + Headline height (estimated h-8) */}
      <div className="h-24 md:h-28 lg:h-31" />
    </>
  );
};

export default Navbar;