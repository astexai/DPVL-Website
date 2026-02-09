'use client';

import Image from 'next/image';
import { useState } from 'react';
import PlayerStats from './PlayerStats';
import MVPStatsBoard from './DetailedStat';
import Link from 'next/link';

// Updated interface to remove bgColor
interface Team {
  id: number;
  name: string;
  slug: string; // Added slug field
  bgImage: string;
}

interface DpvlTeamsProps {
  teamsData?: Team[];
}

export default function DpvlTeams({ teamsData }: DpvlTeamsProps) {
  const [activeTab, setActiveTab] = useState<'teams' | 'player-stats'>('teams');
  
  const teams = teamsData || [
    { id: 1, name: 'Team Eastern Eagles', slug: 'eastern-eagles', bgImage: '/assets/teams/EasternEagles.jpg' },
    { id: 2, name: 'Team New Delhi Titans', slug: 'new-delhi-titans', bgImage: '/assets/teams/Delhi.jpg' },
    { id: 3, name: 'Team Northern Ninjas', slug: 'northern-ninjas', bgImage: '/assets/teams/NorthernNinjas.jpg' },
    { id: 4, name: 'Team Purani Dilli Panthers', slug: 'purani-dilli-panthers', bgImage: '/assets/teams/PuraniDilli.jpg' },
    { id: 5, name: 'Team Southern Spikers', slug: 'southern-spikers', bgImage: '/assets/teams/SouthernSpikers.jpg' },
    { id: 6, name: 'Team Western Warriors', slug: 'western-warriors', bgImage: '/assets/teams/WesternWarriors.jpg' },
  ];

  // quick debug: confirm teams array and image paths
  // remove or comment out in production
  if (typeof window !== 'undefined') console.log('DPVL teams:', teams);

  return (
    <div className="w-full font-sans">
      {/* Teams Grid Section */}
      <section className="relative w-full py-16 px-4 md:px-8 overflow-hidden">
        {/* Main Background Texture */}
        <div className="absolute inset-0 w-full h-full z-0 bg-white"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Pink Buttons for Tabs - Added above the grid */}
          <div className="flex justify-center gap-4 mb-8 md:mb-12">
  <button
    onClick={() => setActiveTab('teams')}
    className={`
      px-6 py-2.5 md:px-8 md:py-3 rounded-2xl text-base md:text-lg font-medium 
      tracking-wide transition-all duration-300 border-3
      ${activeTab === 'teams' 
        ? 'bg-[#3B3BB7] text-white shadow-lg border-[#3B3BB7] scale-105' 
        : ' text-black/90 border-[#3B3BB7] hover:bg-[#d159a3] hover:scale-[1.02]'
      }
    `}
  >
    Teams
  </button>

  <button
    onClick={() => setActiveTab('player-stats')}
    className={`
      px-6 py-2.5 md:px-8 md:py-3 rounded-2xl text-base md:text-lg font-medium 
      tracking-wide transition-all duration-300 border-3
      ${activeTab === 'player-stats' 
        ? 'bg-[#3B3BB7] text-white shadow-lg border-[#3B3BB7] scale-105' 
        : ' text-black/90 border-[#3B3BB7] hover:bg-[#d159a3] hover:scale-[1.02]'
      }
    `}
  >
    Player Statistics
  </button>
</div>

            

          {/* Conditional Content Rendering */}
          {activeTab === 'teams' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center">
              {teams.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams-stats/${team.slug}`}
                  className="block w-full"
                >
                  <div
                    className="relative w-full aspect-square min-h-[220px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 group cursor-pointer bg-gray-100"
                  >
                    {/* Image (fills if available) */}
                    <div className="absolute inset-0">
                      <Image
                        src={team.bgImage}
                        alt={team.name}
                        fill
                        className="object-cover"
                        // fallback: keep even if image fails
                        onError={() => console.warn('Image load failed:', team.bgImage)}
                      />
                    </div>
                    {/* Visible overlay so card is obvious even if image missing */}
                   
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <PlayerStats/>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}