import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingpage.css';
import logo from './Copy of T.png'; // Replace with your actual logo image path
import movingImage from './one.jpg'; // Replace with your actual moving image path
import aboutImage from './two.jpeg'; // Replace with your actual About Us image path

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate('/register');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  const handleCustomerLogin = () => {
    navigate('/customer-login');
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="landing-header">
        <div className="logo">
          <img src={logo} alt="IndiTel Logo" className="logo-image" />
          <h1 className="company-name">IndiTel</h1>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li onClick={() => window.scrollTo(0, 0)}>Home</li>
            <li onClick={() => window.scrollTo(0, document.getElementById('about-section').offsetTop)}>About Us</li>
            <li onClick={() => window.scrollTo(0, document.getElementById('services-section').offsetTop)}>Services</li>
          </ul>
        </nav>
        <div className="login-buttons">
          <button className="admin-login" onClick={handleAdminClick}>Admin Login</button>
          <button className="customer-login" onClick={handleCustomerLogin}>Customer Login</button>
        </div>
      </header>

      {/* Moving Image Section */}
      <section className="moving-image-section">
        <img src={movingImage} alt="Moving Visual" className="moving-image" />
      </section>

      {/* About Us Section */}
      <section id="about-section" className="about-section">
        <div className="about-content">
          <div className="about-image-container">
            <img src={aboutImage} alt="About Us" className="about-image" />
          </div>
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              IndiTel is committed to providing reliable and affordable communication services. Our mission is to ensure seamless connectivity for all our customers, offering the best mobile and broadband solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="services-section">
        <h2>Our Services</h2>
        <div className="catalog">
          <div className="catalog-item">
            <h3>Mobile Plans</h3>
            <p>Choose from a variety of prepaid and postpaid plans that suit your needs.</p>
            <button onClick={handleCustomerClick}>Register</button>
          </div>
          <div className="catalog-item">
            <h3>Broadband Services</h3>
            <p>High-speed broadband services for homes and businesses.</p>
            <button onClick={handleCustomerClick}>Register</button>
          </div>
          <div className="catalog-item">
            <h3>Enterprise Solutions</h3>
            <p>Tailored communication solutions for businesses to stay connected.</p>
            <button onClick={handleCustomerClick}>Register</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@inditel.com</p>
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
