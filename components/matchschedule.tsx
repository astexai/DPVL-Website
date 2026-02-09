'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const fallbackMatches = [
  { id: 'MATCH 4', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00', winner: 'TEAM 1' },
  { id: 'MATCH 5', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00', winner: 'TEAM 2' },
  { id: 'MATCH 6', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00', winner: '' },
  { id: 'MATCH 7', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00', winner: '' },
  { id: 'MATCH 8', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00', winner: '' },
  { id: 'MATCH 9', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00', winner: '' },
];

export default function MatchSchedule() {
  const [matches, setMatches] = useState(fallbackMatches);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/winners');
        if (!res.ok) {
          console.warn('/api/winners returned', res.status);
          return;
        }
        const data = await res.json();
        if (!mounted) return;
        if (!data || !Array.isArray(data.matches)) {
          console.warn('/api/winners returned unexpected shape, using fallback');
          return;
        }
        const normalized = data.matches.map((m: any, idx: number) => ({
          id: m.matchNumber ? `MATCH ${m.matchNumber}` : `MATCH ${idx + 1}`,
          t1: m.team1 || 'TEAM 1',
          t2: m.team2 || 'TEAM 2',
          stadium: m.stadium || 'Stadium Name',
          time: m.time || '00:00 - 00:00',
          winner: m.winner || '',
        }));
        setMatches(normalized);
      } catch (err) {
        console.error('Failed to fetch /api/winners, using fallback', err);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="relative w-full py-10 md:py-12 px-4 md:px-6 bg-[#3b3bb7] min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/assets/bg/Fixtures.png"
          alt="Texture"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col items-center mb-6">

<h2 className="text-2xl md:text-7xl font-norch tracking-wide uppercase text-white mb-1 text-center">

Match Schedule

</h2>

<div className="w-20 md:w-32 h-0.5 bg-[#D159A3] mt-1" />

</div>
        {matches.map((match, index) => (
          <div 
            key={index} 
            className="w-full bg-white rounded-xl shadow-lg p-3 md:py-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0"
          >
            
            {/* LEFT SECTION: MATCH ID */}
            <div className="flex items-center justify-center md:justify-start flex-shrink-0">
              <span className=" text-xl md:text-xl  tracking-tighter">
                {match.id}
              </span>
            </div>

            {/* SEPARATOR 1 (Desktop) */}
            <div className="hidden md:block h-12 w-1.5 bg-[#3b3bb7] rounded-full mx-8"></div>

            {/* CENTER SECTION: TEAMS */}
            <div className="flex-1 flex items-center justify-center gap-2 md:gap-6 w-full">
              
              {/* Team 1 Group */}
              <div className="flex items-center gap-3 justify-end flex-1">
                <div className="flex flex-col items-end">
                  <span className="font-bold text-lg md:text-md uppercase text-gray-800 leading-tight mb-1">
                    {match.t1}
                  </span>
                  {/* Winner Badge Logic */}
                  {match.winner === match.t1 && (
                    <span className="text-[10px] bg-green-500 text-white px-1 rounded uppercase font-bold">Winner</span>
                  )}
                </div>
                {/* TBD Circle */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                   <span className="text-[10px] font-bold text-gray-500">TBD</span>
                </div>
              </div>

              {/* VS Logo */}
              <div className="flex-shrink-0 px-2">
                 <Image
                    src="/assets/bg/PurpleVs.png"
                    width={40}
                    height={40}
                    alt="VS"
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
              </div>

              {/* Team 2 Group */}
              <div className="flex items-center gap-3 justify-start flex-1">
                 {/* TBD Circle */}
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                   <span className="text-[10px] font-bold text-gray-500">TBD</span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-lg md:text-lg uppercase text-gray-800 leading-tight mb-1">
                    {match.t2}
                  </span>
                   {/* Winner Badge Logic */}
                   {match.winner === match.t2 && (
                    <span className="text-[10px] bg-green-500 text-white px-1 rounded uppercase font-bold">Winner</span>
                  )}
                </div>
              </div>
            </div>

            {/* SEPARATOR 2 (Desktop) */}
            <div className="hidden md:block h-12 w-1.5 bg-[#3b3bb7] rounded-full mx-6"></div>

            {/* RIGHT SECTION: STADIUM & LOGO */}
            <div className="flex items-center justify-center md:justify-between w-full md:w-auto gap-4 md:gap-8">
  
  {/* Stadium Info */}
  <div className="flex flex-col text-center md:text-left min-w-[140px]">
    <span className="font-bold text-base md:text-lg text-gray-900 leading-tight">
      {match.stadium}
    </span>
    <span className="text-gray-500 text-sm font-medium">
      (Match: {match.time})
    </span>
  </div>

  {/* DPVL Logo */}
  <div className="flex-shrink-0 hidden md:block">
    <Image 
      src="/assets/logos/Logo-final-1.png" 
      alt="DPVL" 
      width={80}
      height={40}
      className="object-contain h-10 w-auto"
    />
  </div>

</div>


          </div>
        ))}

      </div>
    </section>
  );
}