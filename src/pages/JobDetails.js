import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import './JobDetails.css';
import { BASE_URL } from '../config/constant';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/jobs/${id}`);
      setJob(response.data.data);
    } catch (error) {
      toast.error('Error fetching job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.info('Please login to apply');
      navigate('/login');
      return;
    }

    if (user.role !== 'jobseeker') {
      toast.error('Only job seekers can apply for jobs');
      return;
    }

    setApplying(true);

    try {
      await axios.post(`${BASE_URL}/api/applications`, 
        { job: id, coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
      setCoverLetter('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="job-details-page">
      <div className="container">
        <div className="job-details card">
          <div className="job-header">
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
            <div className="job-meta">
              <span>📍 {job.location}</span>
              <span>💼 {job.jobType}</span>
              <span>👔 {job.experienceLevel}</span>
              <span>🏠 {job.workMode}</span>
            </div>
            {job.salary && (
              <div className="salary">
                💰 {job.salary.currency} {job.salary.min?.toLocaleString()} - {job.salary.max?.toLocaleString()} / {job.salary.type}
              </div>
            )}
          </div>

          <div className="job-content">
            <section>
              <h3>Description</h3>
              <p>{job.description}</p>
            </section>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h3>Responsibilities</h3>
                <ul>
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <section>
                <h3>Requirements</h3>
                <ul>
                  {job.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {job.skills && job.skills.length > 0 && (
              <section>
                <h3>Required Skills</h3>
                <div className="skills-list">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="badge badge-primary">{skill}</span>
                  ))}
                </div>
              </section>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h3>Benefits</h3>
                <ul>
                  {job.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <p className="text-muted">
                Posted on {new Date(job.createdAt).toLocaleDateString()} • {job.views} views
              </p>
            </section>
          </div>

          {user && user.role === 'jobseeker' && (
            <div className="apply-section">
              {!showApplicationForm ? (
                <button 
                  onClick={() => setShowApplicationForm(true)} 
                  className="btn btn-primary btn-lg"
                >
                  Apply Now
                </button>
              ) : (
                <form onSubmit={handleApply} className="application-form">
                  <h3>Submit Your Application</h3>
                  <div className="form-group">
                    <label>Cover Letter *</label>
                    <textarea
                      className="form-control"
                      rows="6"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell us why you're a great fit for this position..."
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn btn-primary" disabled={applying}>
                      {applying ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setShowApplicationForm(false)} 
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
