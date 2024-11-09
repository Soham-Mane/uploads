import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SquadAPI from '../Api/squadapi';

const ParentComponent = () => {
  const [offsets, setOffsets] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://uploads-backend.onrender.com/api/series');
        if (response.data.length > 0) {
          // Log all the offset IDs from the response
          const fetchedOffsets = response.data.map((series) => {
            console.log('Offset ID:', series.offset);
            return series.offset;
          });

          // Set all offsets in state
          setOffsets(fetchedOffsets);
        }
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div>
      <h1>Match Squad for Series</h1>
      {offsets.length > 0 ? (
        offsets.map((offset, index) => (
          <div key={index}>
            <SquadAPI offset={offset} />
          </div>
        ))
      ) : (
        <p>Loading series...</p>
      )}
    </div>
  );
};

export default ParentComponent;
