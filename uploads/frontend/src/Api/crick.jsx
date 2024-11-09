// src/App.js
import React, { useEffect, useState } from 'react';
 // Import the Tailwind CSS (if you're using it via CDN or through a build system)

function Crick() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "b5f0e764-4719-4d92-a87c-ff96e5bce7db";
  const apiUrl = `https://api.cricapi.com/v1/matches?apikey=${apiKey}&offset=0`;

  // Fetch matches data when the component loads
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'success') {
          setMatches(data.data); // Set the match data into the state
        } else {
          setError('Failed to fetch matches');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchMatches(); // Call the function when the component is mounted
  }, []); // Empty array means it runs only once when the component mounts

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Cricket Matches</h1>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error if there is any */}
      {!error && matches.length === 0 && <p className="text-gray-500 text-center">Loading matches...</p>} {/* Loading state */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.length > 0 && matches.map((match) => (
          <div key={match.id} className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all duration-300">
            <h3 className="text-xl font-semibold mb-2">{match.name}</h3>
            <p className="text-gray-700"><strong>Status:</strong> {match.status}</p>
            <p className="text-gray-700"><strong>Venue:</strong> {match.venue}</p>
            <p className="text-gray-700"><strong>Date:</strong> {match.date}</p>
            <p className="text-gray-700"><strong>Teams:</strong> {match.teams.join(' vs ')}</p>
            {match.score && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Scores:</h4>
                {match.score.map((inning, index) => (
                  <p key={index} className="text-gray-600">
                    {inning.inning}: {inning.r}/{inning.w} in {inning.o} overs
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crick;
