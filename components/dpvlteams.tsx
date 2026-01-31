'use client';

import Image from 'next/image';

// Updated interface to remove bgColor
interface Team {
  id: number;
  name: string;
  bgImage: string;
}

interface DpvlTeamsProps {
  teamsData?: Team[]; 
}

export default function DpvlTeams({ teamsData }: DpvlTeamsProps) {
  // Default data without bgColor
  const teams = teamsData || [
    { id: 1, name: 'Team Eastern Eagles', bgImage: '/assets/teams/EasternEagles.jpeg' },
    { id: 2, name: 'Team New Delhi Titans', bgImage: '/assets/teams/NewDelhi.jpeg' },
    { id: 3, name: 'Team Northern Ninjas', bgImage: '/assets/teams/NorthernNinjas.jpeg' },
    { id: 4, name: 'Team Purani Dilli Panthers', bgImage: '/assets/teams/PuraniDilli.jpeg' },
    { id: 5, name: 'Team Southern Spikers', bgImage: '/assets/teams/SouthernSpiker.jpeg' },
    { id: 6, name: 'Team Western Warriors', bgImage: '/assets/teams/WesternWarriors.jpeg' },
  ];

  return (
    <div className="w-full font-sans">
      {/* Header Section */}
      <section className="relative w-full py-12 px-6 bg-[#f5f5f5] text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-norch uppercase tracking-wide text-black mb-2 ">
            DPVL TEAMS
          </h2>
          <div className="md:w-55 w-30 h-1 bg-[#D159A3] mb-6" />
          <p className="text-gray-700 text-sm md:text-lg font-semibold italic">
            Skilled. United. Competitive.
          </p>
        </div>
      </section>

      {/* Teams Grid Section */}
      <section className="relative w-full py-16 px-4 md:px-8 overflow-hidden">
        {/* Main Background Texture */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/assets/bg/Teams.png" 
            alt="Texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center">
            {teams.map((team) => (
              <div 
                key={team.id}
                className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 group cursor-pointer"
                /* Removed inline style background color */
              >
                {/* Team Mascot/Logo as the primary visual */}
                <div className="absolute inset-0">
                  <Image 
                    src={team.bgImage} 
                    alt={team.name}
                    fill
                    className="object-fit" /* Changed to object-cover to fill the card space */
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-white font-norch uppercase tracking-wider text-xs md:text-4xl mb-2">
                    {team.name}
                  </span>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}