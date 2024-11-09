import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScorecardAPI from '../Api/Scorecardapi';

const ParentScore = () => {
  const [offsets, setOffsets] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://uploads-backend.onrender.com/api/series');
        if (response && response.data && Array.isArray(response.data)) {
          const offsetIds = response.data.map(series => series.offset);
          console.log('Offset IDs:', offsetIds);
          setOffsets(offsetIds);
        } else {
          console.error('No valid data returned from API.');
        }
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div>
      <h1>Match Scorecards for Series</h1>
      {offsets.length > 0 ? (
        offsets.map((offset, index) => (
          <div key={index}>
            <ScorecardAPI offsetIds={[offset]} />
          </div>
        ))
      ) : (
        <p>Loading series...</p>
      )}
    </div>
  );
};

export default ParentScore;
