import React from 'react';
import Image from "next/image";

// --- Types ---
interface SquadPlayer {
  id: string;
  name: string;
  role: string;
  image?: string;
  isCaptain?: boolean;
}

type Player = { id: number; name: string; number?: number; position?: string; photo?: string };
type Team = { id: number; name: string; slug: string; logo?: string; squad: Player[] };

// --- Mock Data ---
const squadData: SquadPlayer[] = [
  { id: 'c1', name: 'Player Name', role: 'Captain / Attacker', isCaptain: true },
  { id: 'p1', name: 'Player Name', role: 'Setter' },
  { id: 'p2', name: 'Player Name', role: 'Attacker' },
  { id: 'p3', name: 'Player Name', role: 'Blocker' },
  { id: 'p4', name: 'Player Name', role: 'Setter' },
  { id: 'p5', name: 'Player Name', role: 'Attacker' },
  { id: 'p6', name: 'Player Name', role: 'Attacker' },
  { id: 'p7', name: 'Player Name', role: 'Universal' },
  { id: 'p8', name: 'Player Name', role: 'Libero' },
  { id: 'p9', name: 'Player Name', role: 'Blocker' },
  { id: 'p10', name: 'Player Name', role: 'Attacker' },
  { id: 'p11', name: 'Player Name', role: 'Opposite' },
  { id: 'p12', name: 'Player Name', role: 'Middle Blocker' },
  { id: 'p13', name: 'Player Name', role: 'Defender' },
  { id: 'p14', name: 'Player Name', role: 'All-Rounder' },
];

const TEAMS: Team[] = [
  {
    id: 1,
    name: "Eastern Eagles",
    slug: "eastern-eagles",
    logo: "/assets/teams/EasternEagles.jpg",
    squad: [],
  },
  {
    id: 2,
    name: "New Delhi Titans",
    slug: "new-delhi-titans",
    logo: "/assets/teams/Delhi.jpg",
    squad: [],
  },
  {
    id: 3,
    name: "Northern Ninjas",
    slug: "northern-ninjas",
    logo: "/assets/teams/NorthernNinjas.jpg",
    squad: [],
  },
  {
    id: 4,
    name: "Purani Dilli Panthers",
    slug: "purani-dilli-panthers",
    logo: "/assets/teams/PuraniDilli.jpg",
    squad: [],
  },
  {
    id: 5,
    name: "Southern Spikers",
    slug: "southern-spikers",
    logo: "/assets/teams/SouthernSpikers.jpg",
    squad: [],
  },
  {
    id: 6,
    name: "Western Warriors",
    slug: "western-warriors",
    logo: "/assets/teams/WesternWarriors.jpg",
    squad: [],
  },
];


export default function SquadPage({ slug }: { slug: string }) {
  const team = TEAMS.find((t) => t.slug === slug);
  const captain = squadData.find((p) => p.isCaptain);
  const players = squadData.filter((p) => !p.isCaptain);

  return (
    <div className="min-h-screen p-4 font-sans relative overflow-hidden flex flex-col justify-center bg-white">
      {/* Background */}
     

      <div className="relative z-10 max-w-6xl mx-auto w-full">
         
         {/* Title Header - Reduced text size */}
        <h1 className="text-3xl md:text-7xl font-norch text-[#d159a3] text-center mb-6 uppercase tracking-wider drop-shadow-sm">
          {team?.name}
        </h1>
 
         {/* Team Logo Badge - Reduced dimensions */}
         <div className="flex justify-center mb-8">
  <div className="
    w-24 h-24 
    md:w-32 md:h-32 
    lg:w-36 lg:h-36
    bg-white rounded-full border-4 border-[#d159a3]
    flex items-center justify-center shadow-lg
    relative z-10 overflow-hidden
  ">
    <Image
      src={team?.logo}
      alt="Team Logo"
      fill
      className="object-cover scale-130"
      priority
    />
    <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 -z-10"></div>
  </div>
</div>

 
         {/* Main Content Grid - Reduced Gaps */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
           
           {/* LEFT COLUMN: Captain (smaller, not baseline-aligned with players) */}
           <div className="lg:col-span-4 flex items-start">
             <div className="w-full max-w-[220px] bg-[#3B3BB7] rounded-xl border-2 border-[#d159a3] p-4 flex flex-col items-center shadow-2xl relative overflow-hidden mx-auto self-start">
               <div className="absolute top-0 right-0 w-20 h-20 bg-[#d159a3] opacity-6 rounded-full blur-2xl -mr-6 -mt-6"></div>

               {/* Smaller captain avatar */}
               <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-200 rounded-full border-4 border-white shadow-inner mb-3 flex items-center justify-center overflow-hidden">
                 <span className="text-gray-400 font-semibold text-xs md:text-sm">Captain</span>
               </div>

               {/* Compact text */}
               <h2 className="text-xl md:text-2xl font-extrabold text-white mb-0 text-center leading-tight">
                 {captain?.name}
               </h2>
               <p className="text-[#d159a3] font-bold tracking-widest uppercase text-xs md:text-sm mt-1">
                 {captain?.role}
               </p>
             </div>
           </div>
 
           {/* RIGHT COLUMN: Squad Grid */}
           <div className="lg:col-span-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {players.map((player) => (
                 <div
                   key={player.id}
                   className="bg-[#3d2db3] rounded-lg p-3 flex items-center shadow-lg hover:bg-[#3B3BB7] transition-colors duration-200"
                 >
                   {/* Reduced Player Image */}
                   <div className="w-14 h-14 bg-white rounded-full flex-shrink-0 border-2 border-gray-300 flex items-center justify-center mr-3 overflow-hidden">
                     <span className="text-[10px] text-gray-400 font-bold">Player</span>
                   </div>
                  
                  {/* Reduced Text Details */}
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg leading-tight">
                      {player.name}
                    </span>
                    <span className="text-[#d159a3] text-xs font-bold uppercase tracking-wide mt-0.5">
                      {player.role}
                    </span>
                  </div>
                </div>
               ))}
             </div>
           </div>
 
         </div>
       </div>
     </div>
   );
}