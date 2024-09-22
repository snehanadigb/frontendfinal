import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './Copy of T.png';
import './ServiceSelection.css'; // Import the CSS file

const ServiceSelection = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(null); // To track the selected plan's id
  const [serviceType, setServiceType] = useState('All'); // State for filtering by Prepaid/Postpaid/All
  const [plans, setPlans] = useState([]); // Store plans fetched from the backend
  const [filteredPlans, setFilteredPlans] = useState([]); // Store filtered plans based on selection
  const navigate = useNavigate();

  // Fetch plans from the backend when the component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5004/services/getplans');
        setPlans(response.data); // Store the plans from the backend
        setFilteredPlans(response.data); // Initially, show all plans
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();

    // Retrieve the selected planId from localStorage (if any)
    const savedPlanId = localStorage.getItem('selectedPlanId');
    if (savedPlanId) {
      setSelectedPlanId(parseInt(savedPlanId));
    }
  }, []);

  // Filter plans based on the selected service type
  useEffect(() => {
    if (serviceType === 'All') {
      setFilteredPlans(plans);
    } else {
      setFilteredPlans(plans.filter(plan => plan.planType === serviceType));
    }
  }, [serviceType, plans]);

  // Handle service selection and save it in localStorage
  const handleServiceSelection = (planId,planName) => {
    setSelectedPlanId(planId);
    localStorage.setItem('selectedPlanId', planId);
    localStorage.setItem('selectedName',planName); // Save selected planId in localStorage
  };

  // Confirm the selected service and send the information to the backend
  const confirmServiceSelection = async () => {
    try {
      const customerId = localStorage.getItem('customerId');
      const name=localStorage.getItem('selectedName')
      const token = localStorage.getItem('authToken');

      await axios.post(
        'http://localhost:5004/services/select-service',
        {
          planId: selectedPlanId,  // Send planId instead of serviceName
          customerId: parseInt(customerId),
          name:name
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Service with Plan ID '${name}' selected successfully!`);
      localStorage.removeItem('customerEmail');
    localStorage.removeItem('authToken');
    localStorage.removeItem('selectedName')
      navigate('/thank-you');
    } catch (error) {
      alert('There was an error selecting the service.');
    }
  };

  // Navigate to the landing page
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
        <button className="home-button" onClick={handleHomeClick}>
          Home
        </button>
      </header>

      <h1 className="title">Telecom Services</h1>

      {/* Dropdown for filtering between Prepaid, Postpaid, and All */}
      <select
        className="service-filter"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Prepaid">Prepaid</option>
        <option value="Postpaid">Postpaid</option>
      </select>

      <div className="services-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <div
              key={plan.id} // Use plan ID as the unique key
              className={`service-box ${selectedPlanId === plan.id ? 'service-box-selected' : ''}`}
              onClick={() => handleServiceSelection(plan.id,plan.name)} // Handle selection by plan ID
            >
              <img src={plan.image} alt={plan.name} className="service-image" />
              <h2 className="service-title">{plan.name}</h2>
              <p className="service-description">{plan.description}</p>
              {selectedPlanId === plan.id && <span className="tick-mark">✔</span>}
            </div>
          ))
        ) : (
          <p>No plans available.</p>
        )}
      </div>

      {selectedPlanId && (
        <button className="confirm-button" onClick={confirmServiceSelection}>
          Confirm Selection
        </button>
      )}
    </div>
  );
};

export default ServiceSelection;
