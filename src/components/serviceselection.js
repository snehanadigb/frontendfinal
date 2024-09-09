import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import logo from './Copy of T.png';
// Importing images for services
import highSpeedInternetImage from './1.jpg';
import unlimitedCallsImage from './2.jpg';
import tvStreamingImage from './3.jpg';
import mobileDataImage from './4.jpg';
import landlineImage from './5.jpg';
import cloudStorageImage from './6.jpg';
import './ServiceSelection.css'; // Import the CSS file

const ServiceSelection = () => {
  const [selectedService, setSelectedService] = useState(null); // To track the selected service
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleServiceSelection = (serviceName) => {
    setSelectedService(serviceName);
  };

  const confirmServiceSelection = async () => {
    try {
      const customerId = localStorage.getItem('customerId');
      const token = localStorage.getItem('authToken');

      // Send the selected service to the backend using Axios
      await axios.post(
        'http://localhost:5004/services/select-service',
        {
          serviceName: selectedService,
          customerId: parseInt(customerId),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include authorization token if needed
          },
        }
      );

      alert(`Service '${selectedService}' selected successfully!`);
      navigate('/thank-you');
    } catch (error) {
      alert('There was an error selecting the service.');
    }
  };

  // Navigate to /landing-page when Home button is clicked
  const handleHomeClick = () => {
    navigate('/landing-page');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="IndiTel Logo" className="logo-image" />
          <h1 className="company-name">Welcome to IndiTel</h1>
        </div>
        {/* Home button placed to the right */}
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
      </header>

      <h1 className="title">Telecom Services</h1>
      
      <div className="services-grid">
        {[{
          name: 'High-Speed Internet',
          description: 'Experience lightning-fast internet speeds for seamless browsing and streaming.',
          image: highSpeedInternetImage
        },
        {
          name: 'Unlimited Calls',
          description: 'Stay connected with your loved ones with unlimited local and international calls.',
          image: unlimitedCallsImage
        },
        {
          name: 'TV Streaming',
          description: 'Enjoy your favorite shows and movies with our high-quality TV streaming service.',
          image: tvStreamingImage
        },
        {
          name: 'Mobile Data',
          description: 'Get unlimited mobile data for all your devices with 5G coverage.',
          image: mobileDataImage
        },
        {
          name: 'Landline',
          description: 'Enjoy crystal-clear voice quality with our reliable landline services.',
          image: landlineImage
        },
        {
          name: 'Cloud Storage',
          description: 'Securely store your files in the cloud with our high-capacity storage plans.',
          image: cloudStorageImage
        }].map((service) => (
          <div
            key={service.name}
            className={`service-box ${selectedService === service.name ? 'service-box-selected' : ''}`}
            onClick={() => handleServiceSelection(service.name)}
          >
            <img src={service.image} alt={service.name} className="service-image" />
            <h2 className="service-title">{service.name}</h2>
            <p className="service-description">{service.description}</p>
            {selectedService === service.name && <span className="tick-mark">✔</span>}
          </div>
        ))}
      </div>

      {selectedService && (
        <button className="confirm-button" onClick={confirmServiceSelection}>
          Confirm Selection
        </button>
      )}
    </div>
  );
};

export default ServiceSelection;
