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
    <div className="py-6 px-3container ">
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
        <div className="mt-6 px-4  rounded-lg ">
          <div className="overflow-auto">
            <table className="table-auto border-collapse text-[#6C6C6C] w-full">
              <thead>
                <tr className="text-xs font-light gap-2">
                  <th className="py-[10px] px-2 text-start">Team</th>
                  <th className="py-[10px]">M</th>
                  <th className="py-[10px]">W</th>
                  <th className="py-[10px]">L</th>
                  <th className="py-[10px]">T</th>
                  <th className="py-[10px]">PT</th>
                  
                </tr>
              </thead>
              <tbody className="md:text-xs text-[11px] text-center">
                {selectedTournament.teams.map((team, index) => (
                  <tr
                    key={team.id || team.name}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="pr-1 py-[10px]">
                      <div className="flex items-center">
                        <img
                          src={team.logo || 'default-logo.png'} // Replace with your default logo path if no logo is available
                          alt={`${team.name} logo`}
                          className="m-1 rounded-full h-[30px] w-[30px]"
                        />
                        <div className="flex flex-col text-start">
                          <span className="md:min-h-4 min-h-[11px] min-w-12 text-[#000000] text-xs font-semibold">
                            {team.shortName || team.name}
                          </span>
                          <span className="text-[8px] w-[65%] font-semibold text-wrap min-h-2  min-w-24">{team.fullName || ''}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-[10px]">{team.matches || 0}</td>
                    <td className="px-2 py-[10px]">{team.wins || 0}</td>
                    <td className="px-2 py-[10px]">{team.losses || 0}</td>
                    <td className="px-2 py-[10px]">{team.ties || 0}</td>
                    <td className="px-2 py-[10px]">{team.points || 0}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Please select a tournament to view its details.</p>
      )}
    </div>
  );
};

export default DisplayTournamentH;

