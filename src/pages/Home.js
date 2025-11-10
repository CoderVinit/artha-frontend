import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Dream Job</h1>
            <p>Discover thousands of job opportunities with all the information you need.</p>
            <div className="hero-buttons">
              <Link to="/jobs" className="btn btn-primary btn-lg">Browse Jobs</Link>
              <Link to="/register" className="btn btn-secondary btn-lg">Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="text-center mb-3">Why Choose Artha Job Board?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔍 Easy Job Search</h3>
              <p>Find jobs that match your skills and preferences with our advanced filtering system.</p>
            </div>
            <div className="feature-card">
              <h3>💼 For Employers</h3>
              <p>Post jobs and connect with talented candidates quickly and efficiently.</p>
            </div>
            <div className="feature-card">
              <h3>📝 Simple Application</h3>
              <p>Apply to jobs with just a few clicks and track your applications easily.</p>
            </div>
            <div className="feature-card">
              <h3>🚀 Career Growth</h3>
              <p>Access opportunities that help you grow professionally and achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of job seekers and employers on Artha Job Board today.</p>
          <Link to="/register" className="btn btn-primary btn-lg">Create Account</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
