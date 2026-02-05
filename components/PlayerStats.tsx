import React from 'react';

// --- Types ---
interface Player {
  name: string;
  team: string;
  statValue: number;
  matches: number;
}

interface StatCategory {
  title: string;
  statLabel: string;
  players: Player[];
}

interface DetailedPlayer {
  name: string;
  team: string;
  totalPoints: number;
  matches: number;
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

// --- 1. Standard Stat Card (Top Setter, etc.) ---
const StatCard = ({ title, statLabel, players }: StatCategory) => {
  const topPlayer = players[0];
  const listPlayers = players.slice(1);

  return (
    <div className="w-full bg-white rounded-[32px] shadow-xl overflow-hidden flex flex-col border border-gray-100">
      
      {/* Header */}
      <div className="pt-6 pb-2 flex justify-center">
        <div className="bg-[#3B3BB7] text-white px-6 py-2 rounded-2xl text-base font-bold tracking-wide shadow-md">
          {title}
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 pb-6 text-center border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{topPlayer.name}</h2>
        <div className="flex items-center justify-center gap-5 mb-2">
          <div className="flex flex-col items-center">
            <span className="text-[56px] leading-[1] font-semibold text-[#2563EB]">
              {topPlayer.statValue}
            </span>
            <span className="text-gray-400 text-xs font-semibold uppercase mt-1">
              {statLabel}
            </span>
          </div>
          <div className="relative">
             <div className="w-20 h-20 rounded-full border-[3px] border-[#d159a3] p-[3px]">
                <div className="w-full h-full rounded-full flex items-center justify-center shadow-inner">
                   <span className="text-xs font-bold text-gray-400">Logo</span>
                </div>
             </div>
          </div>
        </div>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
          Matches: {topPlayer.matches}
        </p>
      </div>

      {/* List Section */}
      <div className="px-6 py-2 flex-grow">
        {listPlayers.map((player, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-900 text-[16px] leading-tight">{player.name}</span>
              <span className="text-gray-400 text-sm font-medium mt-0.5">{player.team}</span>
            </div>
            <div className="text-right pl-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 uppercase font-semibold mb-0.5">{statLabel}</span>
                <span className="text-2xl font-semibold text-[#2563EB] leading-none">{player.statValue}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold block mt-1">
                Matches: {player.matches}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2. Detailed Stat Card (MVP, Emerging, etc.) ---
const DetailedStatCard = ({ title, mainStatLabel, players }: DetailedStatCategory) => {
  const topPlayer = players[0];
  const listPlayers = players.slice(1);

  return (
    <div className="w-full bg-white rounded-[32px] shadow-xl flex flex-col overflow-hidden font-sans border border-gray-100">
      
      {/* Header */}
      <div className="pt-6 pb-2 flex justify-center">
        <div className="bg-[#3B3BB7] text-white px-6 py-2 rounded-2xl text-base font-bold tracking-wide shadow-md">
          {title}
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-6 pb-5 pt-4 text-center border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{topPlayer.name}</h2>
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center">
            <span className="text-[56px] leading-[1] font-semibold text-[#2563EB]">
              {topPlayer.totalPoints}
            </span>
            <span className="text-gray-400 text-xs font-semibold mt-1 uppercase">
              {mainStatLabel}
            </span>
          </div>
          <div className="relative -mt-2">
             <div className="w-20 h-20 rounded-full border-[3px] border-[#d159a3] p-[2px] bg-white shadow-sm flex items-center justify-center">
                <div className="flex items-center justify-center gap-1">
                   <div className="w-2 h-2 bg-gray-200 rounded-full"></div> 
                   <span className="text-[10px] font-bold text-orange-400">Logo</span>
                </div>
             </div>
          </div>
        </div>
        <p className="text-gray-400 text-xs font-semibold mt-3 uppercase">
          Matches: {topPlayer.matches}
        </p>
      </div>

      {/* Detailed List Section */}
      <div className="px-6 py-2">
        {listPlayers.map((player, index) => (
          <div 
            key={index} 
            className="flex flex-col py-4 border-b border-gray-50 last:border-0"
          >
            {/* Top Row: Name & Total Score */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col items-start">
                <span className="font-bold text-gray-900 text-[16px] leading-tight">
                  {player.name}
                </span>
                <span className="text-gray-400 text-sm font-medium leading-tight mt-1">
                  {player.team}
                </span>
              </div>
              <span className="text-3xl font-semibold text-[#2563EB] leading-none">
                {player.totalPoints}
              </span>
            </div>

            {/* Bottom Row: Detailed Stats Grid */}
            <div className="grid grid-cols-5 gap-0 bg-gray-50 rounded-xl py-2 divide-x px-0.5 divide-gray-200">
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2563EB] font-semibold text-sm">{player.matches}</span>
                <span className="text-gray-400 text-[8px] font-bold uppercase mt-1">Match</span>
              </div>
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2563EB] font-semibold text-sm">{player.stats?.spikes || 0}</span>
                <span className="text-gray-400 text-[8px] font-bold uppercase mt-1">Spike</span>
              </div>
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2563EB] font-semibold text-sm">{player.stats?.blocks || 0}</span>
                <span className="text-gray-400 text-[8px] font-bold uppercase mt-1">Block</span>
              </div>
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2563EB] font-semibold text-sm">{player.stats?.serves || 0}</span>
                <span className="text-gray-400 text-[8px] font-bold uppercase mt-1">Serve</span>
              </div>
              <div className="flex flex-col items-center px-1">
                <span className="text-[#2563EB] font-semibold text-sm">{player.stats?.super || 0}</span>
                <span className="text-gray-400 text-[8px] font-bold uppercase mt-1">Super</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function PlayerStatsBoard() {
  
  // Data: Standard Cards
  const settersData: StatCategory = {
    title: "Top Setter", statLabel: "Sets",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", statValue: 0, matches: 0 })
  };

  const liberosData: StatCategory = {
    title: "Top Libero", statLabel: "Receives",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", statValue: 0, matches: 0 })
  };

  const blockersData: StatCategory = {
    title: "Top Blocker", statLabel: "Blocks",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", statValue: 0, matches: 0 })
  };

  const hittersData: StatCategory = {
    title: "Top Outside Hitter", statLabel: "Spikes",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", statValue: 0, matches: 0 })
  };

  // Data: Detailed Cards
  const mvpData: DetailedStatCategory = {
    title: "Most Valuable Player", mainStatLabel: "Total Points",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", totalPoints: 0, matches: 0, stats: { spikes: 0, blocks: 0, serves: 0, super: 0 } })
  };

  const oppositeHitterData: DetailedStatCategory = {
    title: "Top Opposite Hitter", mainStatLabel: "Total Points",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", totalPoints: 0, matches: 0, stats: { spikes: 0, blocks: 0, serves: 0, super: 0 } })
  };

  const emergingPlayerData: DetailedStatCategory = {
    title: "Emerging Player", mainStatLabel: "Total Points",
    players: Array(5).fill({ name: "Player Name", team: "Team Name", totalPoints: 0, matches: 0, stats: { spikes: 0, blocks: 0, serves: 0, super: 0 } })
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="w-full max-w-[2500px] mx-auto space-y-8">
     
        {/* ROW 1: 4 Standard Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-stretch">
          <StatCard {...settersData} />
          <StatCard {...liberosData} />
          <StatCard {...blockersData} />
          <StatCard {...hittersData} />
        </div>

        {/* ROW 2: 3 Detailed Cards (Centered) */}
        {/* 'justify-center' centers the flex items. 
            'xl:w-[24%]' makes them the same width as the 4-column grid items (roughly 25%) */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-full md:w-[48%] xl:w-[24%]">
            <DetailedStatCard {...mvpData} />
          </div>
          <div className="w-full md:w-[48%] xl:w-[24%]">
            <DetailedStatCard {...oppositeHitterData} />
          </div>
          <div className="w-full md:w-[48%] xl:w-[24%]">
            <DetailedStatCard {...emergingPlayerData} />
          </div>
        </div>
        
      </div>
    </div>
  );
}