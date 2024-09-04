import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ServiceSelection = () => {
  const [serviceName, setServiceName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const customerId = new URLSearchParams(location.search).get('customerId');

  const handleChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5003/services/select-service', {
        serviceName,
        customerId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Service selected and activation in progress.');
      navigate(`/customer-dashboard?customerId=${customerId}`);
    } catch (error) {
      alert('Service selection failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Service</h2>
      <input type="text" value={serviceName} onChange={handleChange} placeholder="Service Name" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ServiceSelection;
