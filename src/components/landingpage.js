import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/register');
  };

  const handleAdminClick = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">Logo</div>
        <div className="menu-icon">&#9776;</div>
      </header>

      <main className="landing-main">
        <section className="landing-section admin-section">
          <h2>Admin</h2>
          <p>Manage your business with our powerful tools</p>
          <button onClick={handleAdminClick}>Login</button>
        </section>

        <section className="landing-section customer-section">
          <h2>Customer</h2>
          <p>Explore our products and services</p>
          <button onClick={handleCustomerClick}>Register</button>
          <button>Login</button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li><a href="#overview">Company Overview</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#vision">Mission and Vision</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@example.com</p>
          <p>Address: 123 Main St, City, Country</p>
        </div>

        <div className="footer-column">
          <h3>Terms and Conditions</h3>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
