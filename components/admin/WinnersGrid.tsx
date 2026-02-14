"use client"
import { useState, useEffect } from "react";

interface Match {
  _id?: string;
  matchNumber: number;
  team1: string;
  team2: string;
  winner?: string;
  team1Score?: string;
  team2Score?: string;
  status: string;
}

export default function UpdateWinners() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [editingMatch, setEditingMatch] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    id: "",
    matchNumber: "",
    winner: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("WinnersGrid mounted");
    fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchMatches() {
    setFetching(true);
    setError("");
    try {
      console.log("Fetching /api/winners ...");
      const res = await fetch('/api/winners');
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to fetch matches", res.status, text);
        setError(`Failed to load matches (${res.status})`);
        setMatches([]);
        return;
      }
      const data = await res.json();
      console.log("Fetched matches:", data);
      setMatches(data.matches || []);
      if (!data.matches || data.matches.length === 0) {
        // helpful message for empty DB
        console.info("No matches found in database");
      }
    } catch (err) {
      console.error("Network fetch matches error:", err);
      setError("Network error while fetching matches");
    } finally {
      setFetching(false);
    }
  }

  const handleEditClick = (match: Match) => {
    setEditingMatch(match.matchNumber);
    setEditData({
      id: match._id ?? "",
      matchNumber: String(match.matchNumber ?? ""),
      winner: match.winner || '',
    });
  };

  const handleSaveWinner = async (matchNumber: number) => {
    if (!editData.winner.trim()) {
      alert('Please select a winner');
      return;
    }
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem('adminToken') : null;
      const res = await fetch('/api/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id: editData.id || undefined,
          matchNumber: Number(editData.matchNumber),
          winner: editData.winner,
          status: 'Completed',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to save winner");
        return;
      }

      // update local state from server response
      const updated = data.match;
      setMatches((prev) =>
        prev.map((m) => (String(m.matchNumber) === String(updated.matchNumber) ? updated : m))
      );
      setEditingMatch(null);
      setEditData({ id: "", matchNumber: "", winner: '' });
    } catch (err) {
      console.error("Save winner network error:", err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingMatch(null);
    setEditData({ id: "", matchNumber: "", winner: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWinnerSelect = (team: string) => {
    setEditData(prev => ({
      ...prev,
      winner: team
    }));
  };

  return (
    <div className="p-3 md:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-full">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Match Winners</h1>
        <p className="text-sm text-gray-600 mb-4 md:mb-6">
          Declare or update winners for specific matches
        </p>

        {/* Diagnostics / empty state */}
        {fetching && (
          <div className="text-sm text-gray-600 mb-4">Loading matches...</div>
        )}
        {!fetching && error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        {!fetching && !error && matches.length === 0 && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded text-sm">
            No matches available. Seed matches in the "matches" collection or run the seed script.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <div key={match._id ?? match.matchNumber} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#3B3BB7] uppercase tracking-wide">
                  Match #{match.matchNumber}
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  match.status === 'Completed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {match.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 text-center">
                    <div className={`font-medium text-gray-800 text-sm ${match.winner === match.team1 ? 'text-green-700 font-bold' : ''}`}>{match.team1}</div>
                    {match.status === 'Completed' && (
                      <div className="text-xs text-gray-500 mt-1">Score: {match.team1Score}</div>
                    )}
                  </div>
                  <div className="mx-2">
                    <span className="text-xs text-gray-500">vs</span>
                  </div>
                  <div className="flex-1 text-center">
                    <div className={`font-medium text-gray-800 text-sm ${match.winner === match.team2 ? 'text-green-700 font-bold' : ''}`}>{match.team2}</div>
                    {match.status === 'Completed' && (
                      <div className="text-xs text-gray-500 mt-1">Score: {match.team2Score}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`rounded-lg p-3 ${
                match.status === 'Completed' 
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-100' 
                  : 'bg-gray-50'
              }`}>
                {editingMatch === match.matchNumber ? (
                  // Edit Mode: only select winner
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 mb-2">Select Winner:</div>
                      <div className="flex justify-center space-x-3 mb-3">
                        <button
                          type="button"
                          onClick={() => handleWinnerSelect(match.team1)}
                          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                            editData.winner === match.team1
                              ? 'bg-[#3B3BB7] text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {match.team1}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWinnerSelect(match.team2)}
                          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                            editData.winner === match.team2
                              ? 'bg-[#3B3BB7] text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {match.team2}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 text-xs text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveWinner(match.matchNumber)}
                        className="px-3 py-1.5 text-xs text-white bg-[#3B3BB7] rounded hover:bg-purple-700 transition-colors"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    {match.status === 'Completed' ? (
                      <div className="flex items-center">
                        <span className="text-base mr-2">🏆</span>
                        <div className="flex-1">
                          <div className="text-xs text-gray-600 mb-1">Winner:</div>
                          <div className="font-bold text-green-700">{match.winner}</div>
                        </div>
                        <button
                          onClick={() => handleEditClick(match)}
                          className="ml-auto text-gray-400 hover:text-[#3B3BB7] transition-colors p-1"
                          title="Edit winner"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <div className="text-xs text-gray-500 mb-2">No winner declared</div>
                        <button
                          onClick={() => handleEditClick(match)}
                          className="px-3 py-1.5 text-xs text-white bg-[#3B3BB7] rounded hover:bg-purple-700 transition-colors"
                        >
                          Declare Winner
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}