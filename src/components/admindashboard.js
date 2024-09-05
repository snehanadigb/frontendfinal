import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5004/services/get-services');
            setServices(response.data);
        } catch (error) {
            console.error('Failed to fetch services', error);
        }
    };

    const handleActivateService = async (serviceId) => {
        try {
            await axios.post('http://localhost:5004/services/activate-service', { serviceId });
            fetchServices(); // Refresh the list after activation
        } catch (error) {
            console.error('Failed to activate service', error);
        }
    };

    return (
        <div>
            <h2>Service Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td>{service.customerId}</td>
                            <td>{service.isActive ? 'Active' : 'Inactive'}</td>
                            <td>
                                {!service.isActive && (
                                    <button onClick={() => handleActivateService(service.id)}>
                                        Activate Service
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
