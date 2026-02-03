'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Headline from "./headline";

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
    { name: "ABOUT US", href: "/about-us" },
    { name: "OUR TEAMS", href: "/teams" },
    { name: "FIXTURES", href: "/fixtures" },
    { name: "AUCTION", href: "/dpvl-auction" },
    { name: "POINTS TABLE", href: "/points-table" },
    { name: "GALLERY", href: "/gallery" },
    { name: "DPVL TV", href: "/dpvl-tv" },
    { name: "NEWS", href: "/news" },
    { name: "BLOGS", href: "/blogs" },
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (): void => setOpen((prev) => !prev);
  const closeMenu = (): void => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white border-t-4 border-[#3b3bb7] ${
          scrolled ? "shadow-md" : "shadow"
        }`}
        aria-label="Main Navigation"
      >
        <Headline />

        <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center h-16 md:h-23 w-full">
            {/* LEFT */}
            <div className="flex justify-start">
              <Link href="/" className="shrink-0 flex items-center">
                <Image
                  src="/assets/logos/Logo-final-1.png"
                  alt="DPVL Logo"
                  width={160}
                  height={120}
                  className="h-14 md:h-25 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* CENTER */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center gap-3 xl:gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-1 text-2xl xl:text-[26px] font-bebas uppercase transition-colors duration-200 tracking-tight group whitespace-nowrap
                    ${
                      isActive(item.href)
                        ? "text-[#3b3bb7]"
                        : "text-black hover:text-[#3b3bb7]"
                    }
                  `}
                >
                  {item.name}
                  <span
                    className={`block h-[3px] mt-0 bg-[#D159A3] rounded-full transition-transform duration-200 origin-left
                      ${
                        isActive(item.href)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />
                </Link>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-end">
              <div className="hidden lg:flex">
                <Link href="/contact-us">
                  <button
                    type="button"
                    className="px-8 py-3 bg-[#3b3bb7] text-white font-bebas rounded-md shadow-lg hover:bg-[#2a2a8a] transition-all duration-200 text-2xl xl:text-[23px] uppercase active:scale-95"
                  >
                    Contact Us
                  </button>
                </Link>
              </div>

              {/* BURGER */}
              <button
                type="button"
                className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-[110]"
                onClick={toggleMenu}
              >
                {!open && (
                  <div className="relative w-6 h-6">
                    <span className="absolute left-0 top-0 w-6 h-0.5 bg-[#3b3bb7]" />
                    <span className="absolute left-0 top-2.5 w-6 h-0.5 bg-[#3b3bb7]" />
                    <span className="absolute left-0 top-5 w-6 h-0.5 bg-[#3b3bb7]" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden fixed inset-0 z-[101] flex items-center justify-center px-4 transition-all duration-300 ease-out ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#3b3bb7] p-6 flex justify-between items-center">
              <span className="text-white font-bebas text-3xl">MENU</span>
              <button
                type="button"
                onClick={closeMenu}
                className="text-white text-4xl"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col p-8 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-3xl font-bebas uppercase border-b border-gray-100
                    ${
                      isActive(item.href)
                        ? "text-[#3b3bb7]"
                        : "text-black hover:text-[#3b3bb7]"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="text-3xl leading-6 font-bebas bg-[#3b3bb7] text-white uppercase border-b border-gray-100 py-2.5 rounded-md hover:opacity-80 text-center"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16 md:h-28" />
    </>
  );
};

export default Navbar;
