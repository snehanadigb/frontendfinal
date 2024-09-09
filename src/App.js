import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage';
import Registration from './components/Register';
import DocumentUpload from './components/documentUpload';
import ServiceSelection from './components/serviceselection';
//import CustomerDashboard from './components/customerdashboard';
import AdminDashboard from './components/admindashboard';
import AdminLogin from './components/adminlogin';
import Thankyou from './components/thankyou';
import CustomerLogin from './components/customerlogin';
import CustomerDashboard from './components/customerdashboard';
import AdminRegister from './components/adminregister';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/upload-documents" element={<DocumentUpload />} />
        <Route path="/select-service" element={<ServiceSelection />} />
       
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/confirm" element={<Thankyou />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-login" element={<CustomerLogin/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/thank-you" element={<Thankyou/>}/>
      </Routes>
    </Router>
  );
};

export default App;
