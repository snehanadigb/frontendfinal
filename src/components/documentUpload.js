import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const customerId = localStorage.getItem('customerId');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file); // Ensure this matches the backend field name

    try {
      await axios.post('http://localhost:5004/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: { customerId }
      });
      alert('Document uploaded successfully. Awaiting verification.');
      navigate(`/select-service?customerId=${customerId}`);
    } catch (error) {
      console.error('Error during document upload:', error);
      alert('Document upload failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Document</h2>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default DocumentUpload;
