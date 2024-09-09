import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import logo from './Copy of T.png';

const AdminDashboard = () => {
    const [pendingCustomers, setPendingCustomers] = useState([]);
    const [verifiedCustomers, setVerifiedCustomers] = useState([]);
    const [activeCustomers, setActiveCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');
    const [currentSection, setCurrentSection] = useState('pending'); // Track the current section
    const adminName = "Admin"; // You can dynamically fetch this from an API or state if needed
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetchPendingCustomers();
        fetchVerifiedCustomers();
        fetchActiveCustomers();
        fetchServices();
    }, []);

    const fetchPendingCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5004/services/get-pending-customers',{
                headers: { 'Authorization': `Bearer ${token}` }
              });
            setPendingCustomers(response.data);
        } catch (error) {
            setError('Failed to fetch pending customers');
            console.error('Error fetching pending customers:', error);
        }
    };

    const fetchVerifiedCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5004/services/get-verified-customers', {
                headers: { 'Authorization': `Bearer ${token}` }
              });
            setVerifiedCustomers(response.data);
        } catch (error) {
            setError('Failed to fetch verified customers');
            console.error('Error fetching verified customers:', error);
        }
    };

    const fetchActiveCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5004/services/get-activated-customers', {
                headers: { 'Authorization': `Bearer ${token}` }
              });
            setActiveCustomers(response.data);
        } catch (error) {
            setError('Failed to fetch activated customers');
            console.error('Error fetching activated customers:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5004/services/get-services');
            setServices(response.data);
        } catch (error) {
            setError('Failed to fetch services');
            console.error('Error fetching services:', error);
        }
    };

    const handleActivateService = async (serviceId) => {
        try {
            await axios.post('http://localhost:5004/services/activate-service', { serviceId });

            // After activation, update the verified customers' state
            setVerifiedCustomers(prevCustomers =>
                prevCustomers.map(customer => ({
                    ...customer,
                    services: customer.services.map(service =>
                        service.id === serviceId ? { ...service, isActive: true } : service
                    )
                }))
            );
        } catch (error) {
            setError('Failed to activate service');
            console.error('Error activating service:', error);
        }
    };

    const handleLogout = () => {
       
            localStorage.removeItem('token');
          
        window.location.href = '/landing-page'; // Redirect to admin login page
    };

    return (
        <div className="dashboard-container">
            {/* Navbar with Logo, Admin Name, and Logout */}
            <nav className="admin-navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="logo" /> {/* Ensure you have the logo file */}
                    <span className="admin-name">Welcome, {adminName}</span>
                </div>
                <div className="navbar-right">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            {/* Submenu Navbar */}
            <nav className="submenu-navbar">
                <button onClick={() => setCurrentSection('pending')} className={currentSection === 'pending' ? 'active' : ''}>Pending Customers</button>
                <button onClick={() => setCurrentSection('verified')} className={currentSection === 'verified' ? 'active' : ''}>Verified Customers</button>
                <button onClick={() => setCurrentSection('activated')} className={currentSection === 'activated' ? 'active' : ''}>Activated Customers</button>
                <button onClick={() => window.location.href = '/admin-register'}>Register New Admin</button>
            </nav>

            {/* Conditional Rendering Based on Current Section */}
            {currentSection === 'pending' && (
                <div className="dashboard-section">
                    
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Document Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>Pending</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {currentSection === 'verified' && (
                <div className="dashboard-section">
                    
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Document Status</th>
                                <th>Service Name</th>
                                <th>Service Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {verifiedCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.documents.map(doc => doc.verificationStatus).join(', ')}</td>
                                    <td>{customer.services.map(service => service.name).join(', ')}</td>
                                    <td>
                                        {customer.services.map(service => (
                                            <span key={service.id}>
                                                {service.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        {customer.services.some(service => !service.isActive) && (
                                            customer.services
                                                .filter(service => !service.isActive)
                                                .map(service => (
                                                    <button
                                                        className="activate-btn"
                                                        key={service.id}
                                                        onClick={() => handleActivateService(service.id)}
                                                    >
                                                        Activate Service
                                                    </button>
                                                ))
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {currentSection === 'activated' && (
                <div className="dashboard-section">
                   
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Document Status</th>
                                <th>Service Name</th>
                                <th>Service Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.documents.map(doc => doc.verificationStatus).join(', ')}</td>
                                    <td>{customer.services.map(service => service.name).join(', ')}</td>
                                    <td>
                                        {customer.services.map(service => (
                                            <span key={service.id}>
                                                {service.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

           {/* // {error && <p className="error-message">{error}</p>} */}
        </div>
    );
};

export default AdminDashboard;
