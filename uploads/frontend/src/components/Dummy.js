import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a CSV file.');
      return;
    }

    // Create form data to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Post the CSV file to the backend
      const response = await axios.post('http://localhost:5000/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to upload CSV file. Please try again.');
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Upload CSV File</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition duration-200"
          >
            Upload
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CsvUpload;
