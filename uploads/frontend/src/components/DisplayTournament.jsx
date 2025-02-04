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
              className="flex items-center justify-between py-3 border-b border-gray-300 w-full text-left cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center">
                <img
                  src={`https://uploads-backend.onrender.com/${tournament.image}`}
                  alt={tournament.name}
                  className="h-12 w-12 rounded-lg mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-lg text-black">{tournament.name}</p>
                  <p className="text-[#6C6C6C] text-xs">
                    {new Date(tournament.sdate).toLocaleDateString()} -{' '}
                    {new Date(tournament.edate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.37656 6L2.37656 12L0.976562 10.6L5.55156 6L0.976562 1.4L2.37656 -6.11959e-08L8.37656 6Z"
                  fill="#1C1B1F"
                ></path>
              </svg>
            </button>

            {activeTournament === tournament.id && (
              <div className="mt-6  p-6 rounded-lg ">
                <table className="table-auto border-collapse text-[#6C6C6C] w-full">
                  <thead>
                    <tr className="text-lg  gap-2">
                      <th className="py-[10px] px-2 text-start">Team</th>
                      <th className="py-[10px]">M</th>
                      <th className="py-[10px]">W</th>
                      <th className="py-[10px]">L</th>
                      <th className="py-[10px]">P</th>
                    </tr>
                  </thead>
                  <tbody className="text-center ">
                    {tournament.teams
                      .sort((a, b) => b.points - a.points)
                      .map((team, index) => (
                        <tr
                          key={team.id || team.name}
                          className={`${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          } hover:bg-gray-100 transition duration-200 text-lg`}
                        >
                          <td className="pr-1 py-[10px] w-[70%]">
                            <div className="flex items-center">
                              {/* Team Image */}
                              <img
                                src={team.image ? `https://uploads-backend.onrender.com/${team.image}` : 'default-logo.png'}
                                alt={`${team.name} logo`}
                                className="m-1 rounded-full h-[30px] w-[30px]"
                              />
                              <div className="flex flex-col text-start">
                                <span className="md:min-h-4 min-h-[11px] min-w-12 text-[#000000] font-semibold">
                                  {team.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-[10px]">{team.matches || 0}</td>
                          <td className="px-2 py-[10px]">{team.wins || 0}</td>
                          <td className="px-2 py-[10px]">{team.losses || 0}</td>
                          <td className="px-2 py-[10px]">{team.points || 0}</td>
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

