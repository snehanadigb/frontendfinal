import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5003/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setServiceId(e.target.value);
  };

  const handleActivation = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5003/services/activate-service', {
        serviceId
      });

      alert('Service activated successfully.');
      // Optionally, refresh the list of services
    } catch (error) {
      alert('Activation failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleActivation}>
        <input type="text" value={serviceId} onChange={handleChange} placeholder="Service ID" required />
        <button type="submit">Activate Service</button>
      </form>
      <h3>Services List</h3>
      <ul>
        {services.map(service => (
          <li key={service.id}>{service.name} - {service.isActive ? 'Active' : 'Inactive'}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
