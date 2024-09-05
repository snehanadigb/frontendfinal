import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Make sure the path to App.css is correct

const Registration = () => {
  const [f_name, setFName] = useState('');
  const [l_name, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState('register'); // 'register' or 'verify'
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNo = (phone_no) => {
    const regex = /^\d{10}$/; // Assuming phone number should be 10 digits
    return regex.test(phone_no);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhoneNo(phone_no)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5004/auth/register', {
        f_name,
        l_name,
        email,
        password,
        phone_no,
        address
      });
      if (response.status === 201) {
        setStage('verify');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { // Assuming OTP is 6 digits
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5004/auth/verify-email', {
        email,
        otp
      });
      if (response.status === 200) {
        alert('Email verified successfully!');
        window.location.href = '/upload-documents'; // Update this path as needed
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={stage === 'register' ? handleRegister : handleVerify}>
        <h2>{stage === 'register' ? 'Register' : 'Verify OTP'}</h2>
        {stage === 'register' ? (
          <>
            <input type="text" value={f_name} onChange={(e) => setFName(e.target.value)} placeholder="First Name" required />
            <input type="text" value={l_name} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type="text" value={phone_no} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Phone Number" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
          </>
        ) : (
          <>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
          </>
        )}
        <button type="submit" className="submit-button">{stage === 'register' ? 'Register' : 'Verify OTP'}</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
