import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import './PostJob.css';
import { BASE_URL } from '../config/constant';

const PostJob = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    jobType: 'Full-time',
    experienceLevel: 'Mid Level',
    workMode: 'On-site',
    requirements: '',
    responsibilities: '',
    skills: '',
    benefits: '',
    numberOfOpenings: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const jobData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      benefits: formData.benefits.split('\n').filter(b => b.trim())
    };

    try {
      await axios.post(`${BASE_URL}/api/jobs`, jobData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Job posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error posting job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="container">
        <div className="post-job-container">
          <h1>Post a New Job</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                name="description"
                className="form-control"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Openings</label>
                <input
                  type="number"
                  name="numberOfOpenings"
                  className="form-control"
                  min="1"
                  value={formData.numberOfOpenings}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Job Type *</label>
                <select
                  name="jobType"
                  className="form-control"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Experience Level *</label>
                <select
                  name="experienceLevel"
                  className="form-control"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Lead">Lead</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Work Mode *</label>
                <select
                  name="workMode"
                  className="form-control"
                  value={formData.workMode}
                  onChange={handleChange}
                  required
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Requirements (One per line)</label>
              <textarea
                name="requirements"
                className="form-control"
                rows="5"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience&#10;Strong problem-solving skills"
              />
            </div>

            <div className="form-group">
              <label>Responsibilities (One per line)</label>
              <textarea
                name="responsibilities"
                className="form-control"
                rows="5"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Develop and maintain web applications&#10;Collaborate with cross-functional teams&#10;Write clean, maintainable code"
              />
            </div>

            <div className="form-group">
              <label>Required Skills (Comma separated)</label>
              <input
                type="text"
                name="skills"
                className="form-control"
                value={formData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label>Benefits (One per line)</label>
              <textarea
                name="benefits"
                className="form-control"
                rows="4"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Health insurance&#10;Flexible working hours&#10;Professional development opportunities"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Posting Job...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
