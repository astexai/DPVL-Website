'use client';
import Image from 'next/image';

const sponsors = [
  {
    role: "League Organiser",
    image: "/assets/sponsors/aces.png",
    alt: "Velvet",
    size: "large",
  },
  {
    role: "OFFICIAL BALL & KIT PARTNER",
    image: "/assets/sponsors/spartan.png",
    alt: "Spartan",
    size: "small",
  },
  
  {
    role: "OFFICIAL NUTRITION & DIET PARTNER",
    image: "/assets/sponsors/dt_sanjana.png",
    alt: "DT Sanjana",
    size: "large",
  },

];


export default function PartnersSponsors() {
  return (
    <section className="relative w-full py-16 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/bg/Partners.png"
          alt="Partners Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0  mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-norch uppercase text-black mb-3 tracking-wide">
            Partners & Sponsors
          </h2>
          <div className="w-60 md:w-96 h-1 bg-[#D159A3]" />
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-center">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex flex-col items-center group"
            >
              {/* Role */}
              <span className="text-[9px] md:text-[12px] uppercase font-medium text-black uppercase tracking-widest mb-3 h-6 flex items-end">
                {sponsor.role}
              </span>

           
{/* Logo */}
<div className="relative w-full h-32 md:h-40 flex items-center justify-center">
  <Image
    src={sponsor.image}
    alt={sponsor.alt}
    width={300}
    height={160}
    className={`
      object-contain w-auto transition-transform duration-300 group-hover:scale-110
      ${
        sponsor.size === "large"
          ? "max-h-28 md:max-h-50"
          : "max-h-20 md:max-h-35"
      },${
        sponsor.size === "small"
          ? "max-h-28 md:max-h-35"
          : "max-h-20 md:max-h-55"
      }
    `}
  />
</div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
