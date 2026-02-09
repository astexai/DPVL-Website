'use client';

import Image from 'next/image';
import { JSX, useEffect, useState } from 'react';

// Define the TeamData interface
interface TeamData {
  pos: number;
  name: string;
  logo: string;
  p: number; // matches played
  w: number; // wins
  l: number; // losses
  nrr: number; // set ratio
  forRuns: number; // points ratio
  pts: number; // points
  against: any[]; // against teams or matches
}

export default function PointsTable(): JSX.Element {
  const [teams, setTeams] = useState<TeamData[] | null>(null);

  const load = () => {
    let mounted = true;
    fetch('/api/admin/points')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data?.teams && Array.isArray(data.teams)) {
          const adapted = data.teams.map((t: any, idx: number) => ({
            pos: idx + 1,
            name: t.name,
            logo: t.logo ?? `/assets/teams/${t.name.replace(/\s+/g, "")}.jpg`,
            p: t.matches ?? 0,
            w: t.wins ?? 0,
            l: t.losses ?? 0,
            nrr: t.setRatio ?? 0,
            forRuns: t.pointRatio ?? 0,
            pts: t.points ?? 0,
            against: t.against ?? [],
          }));
          setTeams(adapted);
        } else {
          setTeams(null);
        }
      })
      .catch((err) => {
        console.error('Failed to load points table', err);
      });
    return () => { mounted = false; };
  };

  useEffect(() => {
    const cleanup = load();
    // react to storage events from admin tab
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'pointsUpdated') {
        load();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('storage', onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!teams) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div>Loading points table...</div>
      </div>
    );
  }

  return (
    <section className="relative w-full z-10 mt-[-5rem] min-h-[70vh] py-32 px-4 overflow-hidden bg-[#2634C8]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/bg/PointsTable.png"
          alt="Background Texture"
          fill
          className="object-cover"
          loading='lazy'
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-5xl md:text-7xl text-white font-norch uppercase mb-2 tracking-wide">
            Points Table
          </h2>
          <div className="md:w-50 w-38 h-1 bg-[#d66095] rounded-full" />
        </div>

        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full min-w-[1000px] border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-[#d66095] text-black uppercase text-sm md:text-md font-bold tracking-wider shadow-md">
                <th className="py-3 px-6 w-20 rounded-l-md text-center">POS</th>
                <th className="py-3 px-6 text-left min-w-[200px]">TEAM</th>
                <th className="py-3 px-6 w-24 text-center">Matches</th>
                <th className="py-3 px-6 w-24 text-center">Win</th>
                <th className="py-3 px-6 w-24 text-center">Loss</th>
                <th className="py-3 px-6 w-24 text-center">Points</th>
                <th className="py-3 px-6 w-28 text-center whitespace-nowrap">SET RATIO</th>
                <th className="py-3 px-6 w-28 text-center rounded-r-md whitespace-nowrap">POINTS RATIO</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.pos}
                  className="bg-white transition-all duration-200 shadow-sm hover:shadow-lg group"
                >
                  <td className="py-4 px-6 text-center font-bold md:text-xl text-sm border-l-4 border-transparent group-hover:border-[#d66095] rounded-l-md text-black">
                    {team.pos}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#d66095] flex-shrink-0">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold md:text-lg text-sm uppercase tracking-tight text-black whitespace-nowrap">
                        {team.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center font-semibold md:text-xl text-sm text-black">{team.p}</td>
                  <td className="py-4 px-6 text-center font-semibold md:text-xl text-sm text-black">{team.w}</td>
                  <td className="py-4 px-6 text-center font-semibold md:text-xl text-sm text-black">{team.l}</td>
                  <td className="py-4 px-6 text-center font-semibold md:text-xl text-sm text-black">{team.pts}</td>
                  <td className="py-4 px-6 text-center font-semibold md:text-xl text-sm text-black">{team.nrr.toFixed(2)}</td>
                  <td className="py-4 px-6 text-center font-semibold rounded-r-md md:text-xl text-sm text-black">{team.forRuns.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}