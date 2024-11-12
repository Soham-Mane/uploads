import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayTournamentH = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get('https://uploads-backend.onrender.com/api/tournaments');
        setTournaments(res.data);
        setError(null);

        // Debug: Log the tournaments data
        console.log('Tournaments fetched:', res.data);

        // Set IPL as the default tournament if available
        const iplTournament = res.data.find(tournament => tournament.name.toLowerCase() === 'ipl');
        if (iplTournament) {
          setSelectedTournament(iplTournament);
        }
      } catch (err) {
        setError('An error occurred while fetching tournaments.');
        console.error(err);
      }
    };

    fetchTournaments();
  }, []);

  const handleTournamentSelect = (event) => {
    const tournamentName = event.target.value;
    const tournament = tournaments.find((t) => t.name === tournamentName); // Match by name
    setSelectedTournament(tournament);
    console.log("Selected Tournament: ", tournament); // Debugging line
  };

  return (
    <div className="py-6 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Select Tournament</h2>
      {error && <p className="text-red-500">{error}</p>}

      <select
        onChange={handleTournamentSelect}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={selectedTournament ? selectedTournament.name : ''}
      >
        <option value="" disabled>
          -- Select Tournament --
        </option>
        {tournaments.map((tournament) => (
          <option key={tournament.name} value={tournament.name}>
            {tournament.name}
          </option>
        ))}
      </select>

      {selectedTournament ? (
        <div className="mt-6 bg-white  rounded-lg shadow-lg">
          <table className="w-full border-collapse table-auto overflow-x-auto">
            <thead>
              <tr className="bg-[#333333] text-white">
                <th className="border border-gray-300 p-3 text-left font-semibold">Team</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Wins</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Losses</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Matches</th>
                <th className="border border-gray-300 p-3 text-left font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {selectedTournament.teams
                .sort((a, b) => b.points - a.points)
                .map((team, index) => (
                  <tr
                    key={team.id || team.name}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="border border-gray-200 p-3">{team.name}</td>
                    <td className="border border-gray-200 p-3">{team.wins}</td>
                    <td className="border border-gray-200 p-3">{team.losses}</td>
                    <td className="border border-gray-200 p-3">{team.matches}</td>
                    <td className="border border-gray-200 p-3 font-semibold text-[#333333]">{team.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Please select a tournament to view its details.</p>
      )}
    </div>
  );
};

export default DisplayTournamentH;
