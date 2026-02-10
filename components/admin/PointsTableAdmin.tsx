"use client"
import { useState, useEffect } from "react";

interface Team {
  id: number;
  name: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
  setRatio: number;
  pointRatio: number;
  setsWon: number;
  setsLost: number;
  pointsFor: number;
  pointsAgainst: number;
}

export default function PointsTableee() {
  const [teams, setTeams] = useState<Team[]>([
    { 
      id: 1, 
      name: 'Southern Spikers', 
      matches: 0, 
      wins: 0, 
      losses: 0, 
      points: 0, 
      setRatio: 0.0, 
      pointRatio: 0.0,
      setsWon: 0,
      setsLost: 0,
      pointsFor: 0,
      pointsAgainst: 0
    },
    { 
      id: 2, 
      name: 'Eastern Eagles', 
      matches: 0, 
      wins: 0, 
      losses: 0, 
      points: 0, 
      setRatio: 0.0, 
      pointRatio: 0.0,
      setsWon: 0,
      setsLost: 0,
      pointsFor: 0,
      pointsAgainst: 0
    },
    { 
      id: 3, 
      name: 'Western Warriors', 
      matches: 0, 
      wins: 0, 
      losses: 0, 
      points: 0, 
      setRatio: 0.0, 
      pointRatio: 0.0,
      setsWon: 0,
      setsLost: 0,
      pointsFor: 0,
      pointsAgainst: 0
    },
    { 
      id: 4, 
      name: 'Northern Ninjas', 
      matches: 0, 
      wins: 0, 
      losses: 0, 
      points: 0, 
      setRatio: 0.0, 
      pointRatio: 0.0,
      setsWon: 0,
      setsLost: 0,
      pointsFor: 0,
      pointsAgainst: 0
    },
    { 
      id: 5, 
      name: 'Purani Dilli Panthers', 
      matches: 0, 
      wins: 0, 
      losses: 0, 
      points: 0, 
      setRatio: 0.0, 
      pointRatio: 0.0,
      setsWon: 0,
      setsLost: 0,
      pointsFor: 0,
      pointsAgainst: 0
    },
    { 
      id: 6, 
      name: 'New Delhi Titans', 
      matches: 0, 
      wins: 0, 
      losses: 0, 
      points: 0, 
      setRatio: 0.0, 
      pointRatio: 0.0,
      setsWon: 0,
      setsLost: 0,
      pointsFor: 0,
      pointsAgainst: 0
    },
  ]);

  const [team1, setTeam1] = useState('Southern Spikers');
  const [team2, setTeam2] = useState('Eastern Eagles');
  const [team1Sets, setTeam1Sets] = useState({ s1: '', s2: '', s3: '' });
  const [team2Sets, setTeam2Sets] = useState({ s1: '', s2: '', s3: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPointsTable();
  }, []);

  const loadPointsTable = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/points');
      if (!response.ok) {
        const text = await response.text();
        console.error('Failed to fetch points table:', response.status, text);
        setError(`Failed to load points table: ${response.status}`);
        return;
      }
      
      const data = await response.json();
      console.log('Loaded points data:', data);
      
      if (data?.teams && Array.isArray(data.teams)) {
        const normalizedTeams = data.teams.map((team: any, index: number) => ({
          id: team.id || index + 1,
          name: team.name || `Team ${index + 1}`,
          matches: team.matches || 0,
          wins: team.wins || 0,
          losses: team.losses || 0,
          points: team.points || 0,
          setRatio: team.setRatio || 0,
          pointRatio: team.pointRatio || 0,
          setsWon: team.setsWon || 0,
          setsLost: team.setsLost || 0,
          pointsFor: team.pointsFor || 0,
          pointsAgainst: team.pointsAgainst || 0
        }));
        setTeams(normalizedTeams);
      } else {
        console.log('No teams data found in response, using default teams');
      }
    } catch (err) {
      console.error('Error loading points table:', err);
      setError('Network error while loading points table');
    }
  };

  const handleUpdateTable = async () => {
    // Validate team selection
    if (team1 === team2) {
      alert("Please select two different teams");
      return;
    }

    // compute set wins from entered set points
    const sA = [team1Sets.s1, team1Sets.s2, team1Sets.s3].map(v => v === '' ? null : Number(v));
    const sB = [team2Sets.s1, team2Sets.s2, team2Sets.s3].map(v => v === '' ? null : Number(v));
    
    let setsWonA = 0, setsWonB = 0, ptsA = 0, ptsB = 0;
    for (let i = 0; i < 3; i++) {
      const a = sA[i], b = sB[i];
      if (a == null || b == null) continue;
      if (Number.isNaN(a) || Number.isNaN(b)) continue;
      if (a > b) setsWonA++; 
      else if (b > a) setsWonB++;
      ptsA += a; 
      ptsB += b;
    }

    // Validate at least one set was entered
    if (setsWonA === 0 && setsWonB === 0) {
      alert("Please enter valid set scores for at least one set");
      return;
    }

    // determine match points using your rule (simple version)
    let matchPointsA = 0, matchPointsB = 0;
    if (setsWonA === 3 && setsWonB === 0) { 
      matchPointsA = 4; 
      matchPointsB = 0; 
    }
    else if (setsWonB === 3 && setsWonA === 0) { 
      matchPointsB = 4; 
      matchPointsA = 0; 
    }
    else if (setsWonA === 2 && setsWonB === 1) { 
      matchPointsA = 2; 
      matchPointsB = 1; 
    }
    else if (setsWonB === 2 && setsWonA === 1) { 
      matchPointsB = 2; 
      matchPointsA = 1; 
    }
    else { 
      if (setsWonA > setsWonB) matchPointsA = 3; 
      else if (setsWonB > setsWonA) matchPointsB = 3; 
    }

    const winner = setsWonA > setsWonB ? team1 : (setsWonB > setsWonA ? team2 : '');

    // update local teams array
    const updated = teams.map(t => {
      if (t.name === team1 || t.name === team2) {
        const isA = t.name === team1;
        const isWinner = winner === t.name;
        const matchesNew = t.matches + 1;
        const winsNew = t.wins + (isWinner ? 1 : 0);
        const lossesNew = t.losses + (isWinner ? 0 : 1);
        const pointsNew = t.points + (isA ? matchPointsA : matchPointsB);
        const setsWonNew = t.setsWon + (isA ? setsWonA : setsWonB);
        const setsLostNew = t.setsLost + (isA ? setsWonB : setsWonA);
        const setRatioNew = setsLostNew > 0 ? Number((setsWonNew / setsLostNew).toFixed(2)) : setsWonNew;
        
        // Calculate point ratio (total points scored / total points conceded)
        const pointsForNew = t.pointsFor + (isA ? ptsA : ptsB);
        const pointsAgainstNew = t.pointsAgainst + (isA ? ptsB : ptsA);
        const pointRatioNew = pointsAgainstNew > 0 ? Number((pointsForNew / pointsAgainstNew).toFixed(2)) : pointsForNew;

        return {
          ...t,
          matches: matchesNew,
          wins: winsNew,
          losses: lossesNew,
          points: pointsNew,
          setsWon: setsWonNew,
          setsLost: setsLostNew,
          pointsFor: pointsForNew,
          pointsAgainst: pointsAgainstNew,
          setRatio: setRatioNew,
          pointRatio: pointRatioNew,
        };
      }
      return t;
    });

    // Sort teams by points, then set ratio, then point ratio
    const sortedUpdated = [...updated].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.setRatio !== a.setRatio) return b.setRatio - a.setRatio;
      return b.pointRatio - a.pointRatio;
    });

    setTeams(sortedUpdated);
    setLoading(true);

    // Reset set inputs
    setTeam1Sets({ s1: '', s2: '', s3: '' });
    setTeam2Sets({ s1: '', s2: '', s3: '' });

    // persist to backend
    try {
      const res = await fetch('/api/admin/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams: sortedUpdated }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        console.error('Save failed:', data);
        throw new Error(data?.error || `Save failed with status: ${res.status}`);
      }
      
      // notify other tabs/components
      try {
        localStorage.setItem('pointsUpdated', String(Date.now()));
      } catch {}
      alert('Table updated and saved successfully!');
      await loadPointsTable(); // Reload from server to confirm
    } catch (err: any) {
      console.error('Failed to save points:', err);
      alert(`Failed to save to server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 md:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-full">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">League Standings</h1>
        <p className="text-sm text-gray-600 mb-4 md:mb-6">
          Enter set points to calculate rankings
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Enter Match Result - Compact Version */}
        <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Enter Match Result</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 items-center">
            {/* Team 1 - Compact */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Team 1
                </label>
                <select
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Set Points
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="S1"
                    value={team1Sets.s1}
                    onChange={(e) => setTeam1Sets({ ...team1Sets, s1: e.target.value })}
                    className="px-2 py-1.5 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="S2"
                    value={team1Sets.s2}
                    onChange={(e) => setTeam1Sets({ ...team1Sets, s2: e.target.value })}
                    className="px-2 py-1.5 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="S3"
                    value={team1Sets.s3}
                    onChange={(e) => setTeam1Sets({ ...team1Sets, s3: e.target.value })}
                    className="px-2 py-1.5 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* VS Divider - Always centered */}
            <div className="flex justify-center">
              <span className="text-lg md:text-xl font-bold text-gray-400">VS</span>
            </div>

            {/* Team 2 - Compact */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Team 2
                </label>
                <select
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Set Points
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="S1"
                    value={team2Sets.s1}
                    onChange={(e) => setTeam2Sets({ ...team2Sets, s1: e.target.value })}
                    className="px-2 py-1.5 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="S2"
                    value={team2Sets.s2}
                    onChange={(e) => setTeam2Sets({ ...team2Sets, s2: e.target.value })}
                    className="px-2 py-1.5 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="S3"
                    value={team2Sets.s3}
                    onChange={(e) => setTeam2Sets({ ...team2Sets, s3: e.target.value })}
                    className="px-2 py-1.5 text-sm border border-gray-300 rounded text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* League Table - Compact */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">Pos</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">Team</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">M</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">W</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">L</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">Pts</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">Set R</th>
                  <th className="py-2 px-2 text-left font-medium text-xs uppercase">Pnt R</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teams.map((team, index) => (
                  <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-2">
                      <div
                        className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                            ? 'bg-gray-400'
                            : index === 2
                            ? 'bg-amber-700'
                            : 'bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-2 px-2 font-medium text-gray-900 truncate max-w-[120px]">
                      {team.name}
                    </td>
                    <td className="py-2 px-2 text-gray-700">{team.matches}</td>
                    <td className="py-2 px-2 text-gray-700">{team.wins}</td>
                    <td className="py-2 px-2 text-gray-700">{team.losses}</td>
                    <td className="py-2 px-2 font-bold text-purple-600">{team.points}</td>
                    <td className="py-2 px-2 text-gray-700">{team.setRatio.toFixed(2)}</td>
                    <td className="py-2 px-2 text-gray-700">{team.pointRatio.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleUpdateTable}
          disabled={loading}
          className={`bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Saving...' : 'Update Table'}
        </button>
      </div>
    </div>
  );
}