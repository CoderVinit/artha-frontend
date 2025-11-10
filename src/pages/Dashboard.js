import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Welcome, {user?.name}!</h1>
        <p className="text-muted">Role: {user?.role}</p>

        <div className="dashboard-grid">
          <Link to="/profile" className="dashboard-card card">
            <h3>👤 Profile</h3>
            <p>View and update your profile information</p>
          </Link>

          <Link to="/applications" className="dashboard-card card">
            <h3>📝 Applications</h3>
            <p>{user?.role === 'jobseeker' ? 'View your job applications' : 'Manage job applications'}</p>
          </Link>

          {user?.role === 'employer' && (
            <>
              <Link to="/post-job" className="dashboard-card card">
                <h3>✍️ Post Job</h3>
                <p>Create a new job posting</p>
              </Link>

              <Link to="/jobs" className="dashboard-card card">
                <h3>💼 My Jobs</h3>
                <p>View and manage your job postings</p>
              </Link>
            </>
          )}

          {user?.role === 'jobseeker' && (
            <Link to="/jobs" className="dashboard-card card">
              <h3>🔍 Browse Jobs</h3>
              <p>Find your next opportunity</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
