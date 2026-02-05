import React from 'react';

// --- Types ---
interface DetailedPlayer {
  name: string;
  team: string;
  totalPoints: number;
  matches: number;
  // Detailed stats for the list view
  stats?: {
    spikes: number;
    blocks: number;
    serves: number;
    super: number;
  };
}

interface DetailedStatCategory {
  title: string;
  mainStatLabel: string;
  players: DetailedPlayer[];
}

// --- Reusable Detailed Card Component ---
export default function DetailedStatCard({ title, mainStatLabel, players }: DetailedStatCategory)  {
  const topPlayer = players[0];
  const listPlayers = players.slice(1);

  return (
    // Card Container
    <div className="w-full max-w-[450px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col mx-auto border border-gray-100">
      
      {/* 1. Header Button */}
      <div className="pt-8 pb-4 flex justify-center">
        <div className="bg-[#d159a3] text-white px-12 py-3 rounded-full text-base font-bold tracking-wide shadow-lg">
          {title}
        </div>
      </div>

      {/* 2. Top Player (Hero) Section */}
      <div className="px-8 pb-8 text-center border-b border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 mb-3">{topPlayer.name}</h2>
        
        {/* Number & Logo Cluster */}
         <div className="flex items-center justify-center gap-6 mb-3">
          {/* Big Stat Number */}
          <div className="flex flex-col items-center">
            <span className="text-[72px] leading-[1] font-black text-[#2563EB]">
              {topPlayer.totalPoints}
            </span>
            <span className="text-gray-500 text-sm font-bold uppercase mt-1 tracking-wider">
              {mainStatLabel}
            </span>
          </div>

          {/* Logo with Gold Ring */}
          <div className="relative">
             <div className="w-20 h-20 rounded-full border-[3px] border-orange-300 p-[3px]">
                <div className="w-full h-full bg-gray-50 rounded-full flex items-center justify-center shadow-inner">
                   <span className="text-xs font-bold text-gray-400">Logo</span>
                </div>
             </div>
          </div>
        </div>

        <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">
          Matches: {topPlayer.matches}
        </p>
      </div>

      {/* 3. Detailed List Section */}
      <div className="px-5 py-2">
        {listPlayers.map((player, index) => (
          <div 
            key={index} 
            className="flex flex-col py-4 border-b border-gray-50 last:border-0"
          >
            {/* Top Row: Name & Total Score */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 text-[14px] leading-tight">
                  {player.name}
                </span>
                <span className="text-gray-400 text-[11px] font-medium leading-tight mt-0.5">
                  {player.team}
                </span>
              </div>
              <span className="text-[22px] font-black text-[#2563EB] leading-none">
                {player.totalPoints}
              </span>
            </div>

            {/* Bottom Row: Detailed Stats Grid */}
            <div className="grid grid-cols-5 gap-1 bg-gray-50 rounded-lg py-2 px-1">
              {/* Matches */}
              <div className="flex flex-col items-center border-r border-gray-200 last:border-0">
                <span className="text-[#2563EB] font-bold text-[13px]">{player.matches}</span>
                <span className="text-gray-400 text-[9px] font-medium">Matches</span>
              </div>
              {/* Spikes */}
              <div className="flex flex-col items-center border-r border-gray-200 last:border-0">
                <span className="text-[#2563EB] font-bold text-[13px]">{player.stats?.spikes || 0}</span>
                <span className="text-gray-400 text-[9px] font-medium">Spikes</span>
              </div>
              {/* Blocks */}
              <div className="flex flex-col items-center border-r border-gray-200 last:border-0">
                <span className="text-[#2563EB] font-bold text-[13px]">{player.stats?.blocks || 0}</span>
                <span className="text-gray-400 text-[9px] font-medium">Blocks</span>
              </div>
              {/* Serves */}
              <div className="flex flex-col items-center border-r border-gray-200 last:border-0">
                <span className="text-[#2563EB] font-bold text-[13px]">{player.stats?.serves || 0}</span>
                <span className="text-gray-400 text-[9px] font-medium">Serves</span>
              </div>
              {/* Super */}
              <div className="flex flex-col items-center">
                <span className="text-[#2563EB] font-bold text-[13px]">{player.stats?.super || 0}</span>
                <span className="text-gray-400 text-[9px] font-medium">Super</span>
              </div>
            </div>

          </div>
        ))}
      </div>
      
      <div className="pb-2"></div>
    </div>
  );
};
