
'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Headline from "./headline";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "OUR TEAMS", href: "/teams" },
    { name: "NEWS", href: "/news" },
    { name: "BLOGS", href: "/blogs" },
    { name: "GALLERY", href: "/gallery" },
    // new links
    { name: "FIXTURES", href: "/fixtures" },
    {name:"AUCTION", href:"/dpvl-auction" },
    {name:"POINTSTAB", href:"/points-table" },
    {name:"DPVLTV", href:"/dpvl-tv" },

  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white border-t-4 border-[#3b3bb7] shadow ${scrolled ? 'shadow-md' : ''}`}
        aria-label="Main Navigation"
      >
    <Headline />
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 w-full">
            
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/assets/logo.jpg"
                alt="DPVL Logo"
                width={90}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>
          
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-1 text-[15px] font-bold uppercase text-black hover:text-[#3b3bb7] transition-colors duration-200 tracking-wide group"
                >
                  {item.name}
                  <span className="block h-[2.5px] mt-1 bg-[#a259e6] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 rounded-full" />
                </Link>
              ))}
            </div>
          
            <div className="hidden lg:flex">
              <Link href="/contact-us">
                <button className="ml-6 px-5 py-2 bg-[#3b3bb7] text-white font-semibold rounded-md shadow hover:bg-[#2a2a8a] transition-colors duration-200 text-[15px] uppercase">
                  Contact Us
                </button>
              </Link>
            </div>
          
            <button
              className="lg:hidden ml-auto relative w-10 h-10 flex items-center justify-center focus:outline-none z-50"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 w-6 h-0.5 bg-[#3b3bb7] transition-all duration-300 ${open ? 'rotate-45 top-2.5' : 'top-0'}`} />
                <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-[#3b3bb7] transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 w-6 h-0.5 bg-[#3b3bb7] transition-all duration-300 ${open ? '-rotate-45 top-2.5' : 'top-5'}`} />
              </div>
            </button>
          </div>
        </div>

      
        <div
          className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', touchAction: 'none' }}
          onClick={closeMenu}
        />
        <div
          className={`lg:hidden fixed inset-0 z-[101] flex transition-all duration-300 ease-out ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}
          style={{ pointerEvents: open ? 'auto' : 'none', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}
        >
          <div className="w-full h-full flex items-start mt-24 justify-center mx-2">
            <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-transform duration-300 ease-out overflow-y-auto">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 rounded-t-2xl bg-[#3b3bb7]">
                
                <Link href="/" className="shrink-0" onClick={closeMenu}>
                  <Image
                    src="/assets/logo.jpg"
                    alt="DPVL Logo"
                    width={70}
                    height={32}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
             
                <button
                  className="w-9 h-9 flex items-center justify-center focus:outline-none relative"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <span className="block w-6 h-0.5 bg-white rotate-45 absolute"></span>
                  <span className="block w-6 h-0.5 bg-white -rotate-45 absolute"></span>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="flex flex-col justify-start items-start gap-2 py-8 px-5">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="block text-base font-bold text-black hover:text-[#3b3bb7] uppercase py-2 px-1 w-full text-left tracking-wide"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link href="/contact-us" onClick={closeMenu} className="w-full mt-2">
                  <button className="w-full px-4 py-2 bg-[#3b3bb7] text-white font-semibold rounded-md shadow hover:bg-[#2a2a8a] transition-colors duration-200 text-[15px] uppercase">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
