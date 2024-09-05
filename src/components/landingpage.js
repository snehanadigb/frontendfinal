import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/register');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div>
      <h1>Welcome to the Telecom Onboarding System</h1>
      <button onClick={handleCustomerClick}>Register as Customer</button>
      <button onClick={handleAdminClick}>Admin Dashboard</button>
    </div>
  );
};

export default LandingPage;
