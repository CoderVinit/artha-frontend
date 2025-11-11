import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Jobs.css';
import { BASE_URL } from '../config/constant';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    workMode: ''
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) queryParams.append(key, filters[key]);
      });

      const response = await axios.get(`${BASE_URL}/api/jobs?${queryParams}`);
      setJobs(response.data.data);
    } catch (error) {
      toast.error('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      workMode: ''
    });
  };

  return (
    <div className="jobs-page">
      <div className="container">
        <h1>Browse Jobs</h1>

        <div className="filters-section card">
          <div className="filters-grid">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={handleFilterChange}
            />

            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
            />

            <select
              name="jobType"
              className="form-control"
              value={filters.jobType}
              onChange={handleFilterChange}
            >
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>

            <select
              name="experienceLevel"
              className="form-control"
              value={filters.experienceLevel}
              onChange={handleFilterChange}
            >
              <option value="">Experience Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Lead">Lead</option>
              <option value="Executive">Executive</option>
            </select>

            <select
              name="workMode"
              className="form-control"
              value={filters.workMode}
              onChange={handleFilterChange}
            >
              <option value="">Work Mode</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <button onClick={clearFilters} className="btn btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs card">
            <p>No jobs found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map(job => (
              <div key={job._id} className="job-card card">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">📍 {job.location}</p>
                <div className="job-tags">
                  <span className="badge badge-primary">{job.jobType}</span>
                  <span className="badge badge-primary">{job.experienceLevel}</span>
                  <span className="badge badge-primary">{job.workMode}</span>
                </div>
                <p className="job-description">
                  {job.description.substring(0, 150)}...
                </p>
                <div className="job-footer">
                  <span className="text-muted">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
