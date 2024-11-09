import React, { useState } from 'react';
import axios from 'axios';

const AddTournament = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [matches, setMatches] = useState(0);
  const [points, setPoints] = useState(0);
  const [tournamentId, setTournamentId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tournamentImage, setTournamentImage] = useState(null); // Image state
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setTournamentImage(e.target.files[0]);
  };

  const createOrFetchTournament = async () => {
    try {
      const existingTournament = await axios.get(`http://localhost:5000/api/tournaments?name=${tournamentName}`);

      const matchedTournament = existingTournament.data.find(
        (tournament) => tournament.name.toLowerCase() === tournamentName.toLowerCase()
      );

      if (matchedTournament) {
        setTournamentId(matchedTournament._id);
        alert('Tournament already exists! You can add teams to it.');
      } else {
        const formData = new FormData();
        formData.append('name', tournamentName);
        formData.append('id', Math.floor(Math.random() * 10000));
        formData.append('sdate', new Date(startDate));
        formData.append('edate', new Date(endDate));
        if (tournamentImage) formData.append('image', tournamentImage);

        const res = await axios.post('http://localhost:5000/api/tournaments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setTournamentId(res.data._id);
        alert('Tournament created!');
      }
    } catch (err) {
      setError('An error occurred while processing your request.');
      console.error(err);
    }
  };

  const addTeam = async () => {
    if (!tournamentId) {
      alert('Please create or fetch a tournament first.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/tournaments/${tournamentId}/teams`, {
        name: teamName,
        wins,
        losses,
        matches,
        points,
      });
      alert('Team added!');
      setTeamName('');
      setWins(0);
      setLosses(0);
      setMatches(0);
      setPoints(0);
    } catch (err) {
      setError('An error occurred while adding the team.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">Create or Find Tournament</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Tournament Name"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={createOrFetchTournament}
          className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
        >
          Create or Fetch Tournament
        </button>
      </div>

      {tournamentId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Add Teams to Tournament</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Wins"
              value={wins}
              onChange={(e) => setWins(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Losses"
              value={losses}
              onChange={(e) => setLosses(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Matches"
              value={matches}
              onChange={(e) => setMatches(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Points"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={addTeam}
              className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Add Team
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default AddTournament;
