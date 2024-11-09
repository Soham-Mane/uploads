import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOverallSeries = () => {
  const [seriesName, setSeriesName] = useState('');
  const [overallId, setOverallId] = useState('');
  const [seriesList, setSeriesList] = useState([]);

  const fetchSeries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/overall-series');
      setSeriesList(res.data);
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const handleAddSeries = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/overall-series', {
        name: seriesName,
        overallId: overallId,
      });
      alert(`Series ${res.data.name} added with Overall ID ${res.data.overallId}`);
      fetchSeries();
    } catch (error) {
      console.error('Error adding series:', error);
    }
  };

  const handleDeleteSeries = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/overall-series/${id}`);
      alert('Series deleted');
      fetchSeries();
    } catch (error) {
      console.error('Error deleting series:', error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-center text-purple-700 mb-6">Add Overall Series</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Series Name"
          value={seriesName}
          onChange={(e) => setSeriesName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Overall ID"
          value={overallId}
          onChange={(e) => setOverallId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
        />
        <button
          onClick={handleAddSeries}
          className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
        >
          Add Series
        </button>
      </div>

      <h3 className="text-xl font-semibold text-purple-700 mt-8 mb-4">Overall Series List</h3>
      <ul className="space-y-3">
        {seriesList.map((series) => (
          <li key={series._id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <div>
              <span className="font-semibold text-gray-700">{series.name}</span> - 
              <span className="text-gray-500"> Overall ID: {series.overallId}</span>
            </div>
            <button
              onClick={() => handleDeleteSeries(series._id)}
              className="text-red-500 hover:text-red-600 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddOverallSeries;
