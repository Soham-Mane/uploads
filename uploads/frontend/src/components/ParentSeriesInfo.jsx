import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeriesInfo from '../Api/seriinfoapi';  // Import the SeriesInfo component

const ParentSeriesInfo = () => {
  const [overallSeries, setOverallSeries] = useState([]);

  useEffect(() => {
    const fetchOverallSeries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/overall-series');  // Fetch overall series data from the backend
        setOverallSeries(response.data);  // Set the overall series data to state
      } catch (error) {
        console.error('Error fetching overall series:', error);
      }
    };

    fetchOverallSeries();
  }, []);

  return (
    <div>
      <h1>Overall Series Info</h1>
      {overallSeries.length > 0 ? (
        overallSeries.map(series => (
          <div key={series._id}>
            <h2>{series.name}</h2>
            {/* Pass the overallId to the SeriesInfo component */}
            <SeriesInfo seriesId={series.overallId} />
          </div>
        ))
      ) : (
        <p>Loading overall series info...</p>
      )}
    </div>
  );
};

export default ParentSeriesInfo;
