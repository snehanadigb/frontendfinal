import React, { useState } from 'react';
import axios from 'axios';

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

  const handleRegister = async (e) => {
    e.preventDefault();
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
    try {
      const response = await axios.post('http://localhost:5004/auth/verify-email', {
        email,
        otp
      });
      if (response.status === 200) {
        alert('Email verified successfully!');
        // Redirect to document upload page
        window.location.href = '/upload-documents'; // Update this path as needed
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <form onSubmit={stage === 'register' ? handleRegister : handleVerify}>
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
      <button type="submit">{stage === 'register' ? 'Register' : 'Verify OTP'}</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Registration;
