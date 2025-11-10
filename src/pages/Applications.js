import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import './Applications.css';

const Applications = () => {
  const { user, token } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const endpoint = user.role === 'jobseeker' 
        ? '/api/applications/my-applications'
        : '/api/applications/employer/all'; // You'd need to implement this endpoint

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data.data);
    } catch (error) {
      toast.error('Error fetching applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: 'badge-warning',
      reviewing: 'badge-primary',
      shortlisted: 'badge-success',
      rejected: 'badge-danger',
      accepted: 'badge-success'
    };
    return statusMap[status] || 'badge-primary';
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="applications-page">
      <div className="container">
        <h1>
          {user.role === 'jobseeker' ? 'My Applications' : 'Job Applications'}
        </h1>

        {applications.length === 0 ? (
          <div className="no-applications card">
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(app => (
              <div key={app._id} className="application-card card">
                <div className="application-header">
                  <div>
                    <h3>{app.job?.title || 'Job Title'}</h3>
                    <p className="company">{app.job?.company || 'Company Name'}</p>
                    <p className="location">📍 {app.job?.location || 'Location'}</p>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="application-details">
                  <p className="text-muted">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="cover-letter">
                    <h4>Cover Letter:</h4>
                    <p>{app.coverLetter}</p>
                  </div>

                  {app.notes && (
                    <div className="notes">
                      <h4>Notes:</h4>
                      <p>{app.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
