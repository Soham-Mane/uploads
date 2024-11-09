import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchInfoAPI from '../Api/matchinfoapi';

const ParentComponent = () => {
  const [offsetIds, setOffsetIds] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://uploads-backend.onrender.com/api/series');
        if (response.data.length > 0) {
          // Extract the offset IDs from the response
          const fetchedOffsets = response.data.map((series) => series.offset);
          setOffsetIds(fetchedOffsets); // Set the array of offset IDs
        }
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div>
      <h1>Match Info for Series</h1>
      {offsetIds.length > 0 ? (
        <MatchInfoAPI offsetIds={offsetIds} />
      ) : (
        <p>Loading match IDs...</p>
      )}
    </div>
  );
};

export default ParentComponent;
