import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayTournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);
  const [activeTournament, setActiveTournament] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get('https://uploads-backend.onrender.com/api/tournaments');
        setTournaments(res.data);
        setError(null);
      } catch (err) {
        setError('An error occurred while fetching tournaments.');
        console.error(err);
      }
    };

    fetchTournaments();
  }, []);

  const toggleTournament = (tournamentId) => {
    setActiveTournament(activeTournament === tournamentId ? null : tournamentId);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Tournaments</h2>
      {error && <p className="text-red-500">{error}</p>}

      {tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <div key={tournament.id} className="mb-4">
            <button
              onClick={() => toggleTournament(tournament.id)}
              className="flex items-center justify-between py-3 border-b border-gray-300 w-full text-left cursor-pointer"
            >
              <div className="flex items-center">
                {/* Display the tournament image */}
                <img
                  src={`https://uploads-backend.onrender.com/${tournament.image}`} // Path to the tournament image
                  alt={tournament.name}
                  className="h-12 w-12 rounded-lg mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold lg:text-lg sm:text-sm">{tournament.name}</p>
                  <p className="text-[#91949B] text-xs">
                    {new Date(tournament.sdate).toLocaleDateString()} -{' '}
                    {new Date(tournament.edate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.37656 6L2.37656 12L0.976562 10.6L5.55156 6L0.976562 1.4L2.37656 -6.11959e-08L8.37656 6Z"
                    fill="#1C1B1F"
                  ></path>
                </svg>
              </div>
            </button>

            {activeTournament === tournament.id && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#333333] text-white">
                      <th className="border border-gray-300 p-3 text-left font-semibold">Team Name</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Wins</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Losses</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Matches</th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tournament.teams
                      .sort((a, b) => b.points - a.points)
                      .map((team, index) => (
                        <tr
                          key={team.id || team.name}
                          className={`${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-gray-100 transition duration-200`}
                        >
                          <td className="border border-gray-200 p-3 text-[#333333]">{team.name}</td>
                          <td className="border border-gray-200 p-3 text-[#333333]">{team.wins}</td>
                          <td className="border border-gray-200 p-3 text-[#333333]">{team.losses}</td>
                          <td className="border border-gray-200 p-3 text-[#333333]">{team.matches}</td>
                          <td className="border border-gray-200 p-3 font-semibold text-[#333333]">{team.points}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No tournaments available</p>
      )}
    </div>
  );
};

export default DisplayTournament;
