import React, { useState } from 'react';
import axios from 'axios';

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    console.log('Uploading file:', file);
    console.log('File name:', file?.name);

    try {
      const res = await axios.post('https://uploads-backend.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFilename(res.data.file.filename);
      alert('File uploaded successfully!');
    } catch (err) {
      console.error('Error uploading file:', err);
      alert(`Error uploading file: ${err.message}`); // Show error message
    }
  };

  const handleDownload = async () => {
    try {
      const res = await axios.get(`https://uploads-backend.onrender.com/api/file/${filename}`, {
        responseType: 'blob', // Ensure that the response is treated as a file
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading file:', err);
      alert(`Error downloading file: ${err.message}`); // Show error message
    }
  };

  return (
    <div>
      <h1>Upload Excel Sheet</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {filename && (
        <div>
          <h2>Uploaded File: {filename}</h2>
          <button onClick={handleDownload}>Download File</button>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
