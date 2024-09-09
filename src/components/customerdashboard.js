import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerDashboard.css';
import logo from './Copy of T.png'; // Import the custom CSS file

const CustomerDashboard = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [documentStatus, setDocumentStatus] = useState(null);
  const [services, setServices] = useState([
    { id: 1, name: 'Broadband' },
    { id: 2, name: 'Mobile' },
    { id: 3, name: '5G' },
    { id: 4, name: 'corporate' }
  ]); // Hardcoded list of services
  const [customerId, setId] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const customeremail = localStorage.getItem('customerEmail');
  const token = localStorage.getItem('authToken');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serviceSelectionError, setServiceSelectionError] = useState(''); // State for service selection error

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/customers/email/${customeremail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const customer = response.data;
        setCustomerDetails(customer);
        setId(customer.id);

        if (customer.documents && customer.documents.length > 0) {
          setDocumentStatus(customer.documents[0].verificationStatus);
          setVerificationStatus(customer.documents[0].verificationStatus || 'Not Uploaded');
        } else {
          setVerificationStatus('Not Uploaded');
        }

        // No need to fetch services since they are hardcoded
        // setServices(customer.services || []);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [customeremail, token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFilePreviewUrl(previewUrl);
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setFilePreviewUrl(null);
      setErrorMessage('Please select a valid image file (PNG, JPEG, etc.)');
    }
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile);
    try {
      await axios.post(`http://localhost:5004/documents/upload?customerId=${customerId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlertMessage('Document uploaded successfully');
      setVerificationStatus('Verified');
      setFilePreviewUrl(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleServiceSelection = async (e) => {
    e.preventDefault();
    if (!services.find(service => service.name === serviceName)) {
      setServiceSelectionError('Please select a valid service.');
      return;
    }
    try {
      await axios.post('http://localhost:5004/services/select-service', {
        serviceName,
        customerId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlertMessage('Service selected successfully');
      setServiceSelectionError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error selecting service:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customerEmail');
    localStorage.removeItem('authToken');
    window.location.href = '/landing-page';
  };

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          {/* <img src={logo} alt="Logo" className="logo" /> */}
          <div className="ml-auto d-flex">
            <span className="navbar-text text-white mr-3">Welcome, {customerDetails.first_name}</span>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {/* Customer Details Card */}
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4>Customer Details</h4>
              </div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>{customerDetails.first_name} {customerDetails.last_name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{customerDetails.email}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{customerDetails.phone_no}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h4>Document Upload</h4>
              </div>
              <div className="card-body">
                {verificationStatus === 'Verified' ? (
                  <div className="alert alert-success">Your document is verified!</div>
                ) : (
                  <form onSubmit={handleDocumentUpload}>
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">Upload your document (Image only)</label>
                      <input className="form-control" type="file" id="formFile" onChange={handleFileChange} accept="image/*" required />
                    </div>

                    {/* File Preview */}
                    {filePreviewUrl && (
                      <div className="mb-3">
                        <label>Preview:</label>
                        <img src={filePreviewUrl} alt="Document Preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                      </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <button type="submit" className="btn btn-primary">Upload Document</button>
                  </form>
                )}
                {verificationStatus && <p className="mt-3">Verification Status: <strong>{verificationStatus}</strong></p>}
              </div>
            </div>
          </div>

          {/* Service Selection Section */}
          <div className="col-md-12 mb-4">
            <div className="card">
              <div className="card-header bg-info text-white">
                <h4>Service Selection</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleServiceSelection}>
                  <div className="mb-3">
                    <label htmlFor="serviceSelect" className="form-label">Select a Service</label>
                    <select className="form-select" id="serviceSelect" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required>
                      <option value="">--Select--</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Service Selection Error */}
                  {serviceSelectionError && <div className="alert alert-danger">{serviceSelectionError}</div>}
                  <button type="submit" className="btn btn-success">Select Service</button>
                </form>
              </div>
            </div>
          </div>

          {/* Success Alert */}
          {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
