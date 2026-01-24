'use client';

import Image from 'next/image';
import { JSX } from 'react';

type MatchResult = 'W' | 'L';

interface Team {
  pos: number;
  name: string;
  p: number;
  w: number;
  l: number;
  nrr: number;
  forRuns: number;
  against: MatchResult[];
  pts: number;
}

export default function PointsTable(): JSX.Element {
  const teams: Team[] = Array.from({ length: 8 }, (_, index) => ({
    pos: index + 1,
    name: 'TEAM NAME',
    p: 0,
    w: 0,
    l: 0,
    nrr: 0,
    forRuns: 0,
    against: ['W', 'W', 'L', 'W'],
    pts: 0,
  }));

  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden bg-[#3b3bb7]">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a7acdf5] via-[#3b3bb7] to-[#a259e6] opacity-60" />
        <Image
          src="/assets/footerimg.jpg"
          alt="Background Texture"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col items-center">
    
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl md:text-5xl text-white font-bold uppercase tracking-tight mb-2">
            Points Table
          </h2>
          <div className="w-24 h-1 bg-[#d66095] rounded-full" />
        </div>

        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-[#d66095] text-black uppercase text-sm md:text-base font-bold tracking-wider shadow-md">
                <th className="py-3 px-4 w-16 rounded-l-md text-center">POS</th>
                <th className="py-3 px-4 text-left">TEAM</th>
                <th className="py-3 px-2 w-16 text-center">P</th>
                <th className="py-3 px-2 w-16 text-center">W</th>
                <th className="py-3 px-2 w-16 text-center">L</th>
                <th className="py-3 px-2 w-20 text-center">NRR</th>
                <th className="py-3 px-2 w-16 text-center">FOR</th>
                <th className="py-3 px-4 w-40 text-center">AGAINST</th>
                <th className="py-3 px-4 w-20 rounded-r-md text-center">PTS</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.pos}
                  className="bg-white transition-all duration-200 shadow-sm hover:shadow-lg group"
                >
                  <td className="py-3 px-4 text-center font-bold text-xl border-l-4 border-transparent group-hover:border-[#d66095] rounded-l-md">
                    {team.pos}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-[#d66095] flex items-center justify-center text-[10px] font-bold text-[#d66095]">
                        TBD
                      </div>
                      <span className="font-bold text-lg uppercase tracking-tight text-black">
                        {team.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-2 text-center font-semibold text-lg">{team.p}</td>
                  <td className="py-3 px-2 text-center font-semibold text-lg">{team.w}</td>
                  <td className="py-3 px-2 text-center font-semibold text-lg">{team.l}</td>
                  <td className="py-3 px-2 text-center font-semibold text-lg">{team.nrr}</td>
                  <td className="py-3 px-2 text-center font-semibold text-lg">{team.forRuns}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      {team.against.map((result, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full flex items-center justify-center
                            text-white font-bold text-sm
                            ${result === 'W' ? 'bg-[#2ca045]' : 'bg-[#dc3545]'}`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center rounded-r-md relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-gray-300" />
                    <span className="font-bold text-xl text-black">{team.pts}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
