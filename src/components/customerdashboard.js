import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = ({ location }) => {
  const [customerData, setCustomerData] = useState({});
  const [services, setServices] = useState([]);
  const [documents, setDocuments] = useState([]);

  const customerId = new URLSearchParams(location.search).get('customerId');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/customers/${customerId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCustomerData(response.data.customer);
        setDocuments(response.data.documents);
        setServices(response.data.services);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <h3>Your Details</h3>
      <p>Name: {customerData.first_name} {customerData.last_name}</p>
      <p>Email: {customerData.email}</p>
      <p>Phone Number: {customerData.phone_no}</p>
      <p>Address: {customerData.address}</p>

      <h3>Your Documents</h3>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>{doc.filePath} - {doc.verificationStatus}</li>
        ))}
      </ul>

      <h3>Your Services</h3>
      <ul>
        {services.map(service => (
          <li key={service.id}>{service.name} - {service.isActive ? 'Active' : 'Inactive'}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDashboard;
