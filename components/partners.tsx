'use client';
import Image from 'next/image';


const sponsors = [
  { role: "CO-POWERED BY", name: "AA", style: "text-pink-600 font-bold text-3xl tracking-tighter" },
  { role: "HYDRATION PARTNER", name: "ACB", style: "text-black font-bold text-2xl border-2 border-black rounded-full p-2" },
  { role: "AUDIO PARTNER", name: "aab", style: "bg-[#1a237e] text-white px-2 py-1 font-bold italic" },
  { role: "ASSOCIATE PARTNER", name: "DBC", style: "text-red-600 font-black text-2xl" },
  { role: "ASSOCIATE PARTNER", name: "ABC", style: "text-orange-500 font-bold text-2xl tracking-widest" },
  { role: "ORGANIZING PARTNER", name: "AVA", style: "text-black font-bold text-2xl underline decoration-red-600" },
  { role: "KIT PARTNER", name: "BBB", style: "text-blue-600 font-bold text-2xl border-2 border-blue-600 rounded-full px-3" },
  { role: "JERSEY PARTNER", name: "abc", style: "bg-black text-red-500 rounded-full w-12 h-12 flex items-center justify-center font-bold" },
  { role: "HEALTHCARE PARTNER", name: "BVC", style: "text-black font-bold text-2xl flex items-center gap-1 border-l-4 border-red-600 pl-2" },
  { role: "ASSOCIATE PARTNER", name: "BVC", style: "bg-orange-500 text-white px-2 font-bold italic transform -skew-x-12" },
  { role: "ASSOCIATE PARTNER", name: "AAA", style: "text-black font-thin text-3xl italic" },
  { role: "EXPERIENCE PARTNER", name: "AA", style: "text-pink-600 font-bold text-3xl" },
  { role: "BALL & EQUIPMENT PARTNER", name: "ABC", style: "text-orange-500 font-bold text-2xl" },
  { role: "FM PARTNER", name: "AAA", style: "bg-black text-white rounded-full px-2 font-bold text-xl border-2 border-red-500" },
  { role: "MEDIA & MARKETING PARTNER", name: "AAA", style: "text-[#3b3bb7] font-bold text-2xl" },
  { role: "EDUCATION PARTNER", name: "CCC", style: "text-[#1a237e] font-bold text-2xl" },
];

export default function PartnersSponsors() {
  return (
    <section className="relative w-full py-16 bg-white overflow-hidden">
     
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/footerimg.jpg"
          alt="Texture"
          fill
          className="object-cover opacity-[0.03] pointer-events-none" 
        />
       
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-white to-blue-50/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-black mb-3" style={{ fontFamily: 'sans-serif' }}>
            Partners & Sponsors
          </h2>
          <div className="w-24 h-1 bg-[#d66095]" />
        </div>

  
        <div className="flex flex-col items-center justify-center mb-10">
          <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Title Sponsor
          </span>
          <div className="relative w-48 h-24 md:w-64 md:h-32 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          
             <div className="absolute inset-0 opacity-10">
                <Image src="/assets/footerimg.jpg" alt="tex" fill className="object-cover" />
             </div>
    
             <div className="relative z-10 flex items-center gap-1">
                <span className="text-5xl md:text-6xl font-black italic text-black tracking-tighter">AA</span>
                <span className="text-5xl md:text-6xl font-black italic text-red-600 tracking-tighter">B</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-5 md:gap-y-4 text-center">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex flex-col items-center justify-start h-full group">
             
              <span className="text-[9px] md:text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3 h-6 flex items-end">
                {sponsor.role}
              </span>

          
              <div className="relative w-full flex items-center justify-center py-2 px-2 hover:scale-105 transition-transform duration-300">
              
                <div className={`${sponsor.style} relative z-10`}>
                  {sponsor.name}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}