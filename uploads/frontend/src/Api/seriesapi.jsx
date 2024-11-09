import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeriesAPI = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://api.cricapi.com/v1/series', {
          params: {
            apikey: 'b2c13310-df73-4fb7-aff3-c8f046de4acf',
            offset: 0
          }
        });

        setSeries(response.data.data); // Assuming `response.data.data` holds the series array
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div>
      <h1>Cricket Series</h1>
      {series.length > 0 ? (
        <ul>
          {series.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> (Start Date: {item.startDate}, End Date: {item.endDate}) -
              <p>ODIs: {item.odi}</p>
            <p>T20s: {item.t20}</p>
            <p>Tests: {item.test}</p>
            <p>Matches: {item.matches}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SeriesAPI;
