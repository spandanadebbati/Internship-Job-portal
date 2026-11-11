
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Admin() {
  const initialForm = {
    title: '',
    company: '',
    domain: '',
    location: '',
    type: '',
    experience: '',
    description: '',
    stipend: '',
    skills: '',
    deadline: '',
    applicationLink: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchOpportunities = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/opportunities'
      );
      const data = await response.json();
      setOpportunities(data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/applications'
      );
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchOpportunities();
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:5000/api/opportunities/${editingId}`
      : 'http://localhost:5000/api/opportunities';

    try {
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      alert(
        editingId
          ? 'Opportunity updated successfully!'
          : 'Opportunity added successfully!'
      );

      setFormData(initialForm);
      setEditingId(null);
      fetchOpportunities();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title || '',
      company: job.company || '',
      domain: job.domain || '',
      location: job.location || '',
      type: job.type || '',
      experience: job.experience || '',
      description: job.description || '',
      stipend: job.stipend || '',
      skills: job.skills || '',
      deadline: job.deadline || '',
      applicationLink: job.applicationLink || ''
    });

    setEditingId(job._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this opportunity?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/opportunities/${id}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      alert('Opportunity deleted successfully!');
      fetchOpportunities();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Status update failed');
      }

      alert('Application status updated!');
      fetchApplications();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          Admin Dashboard
        </h2>

        <div className="card shadow p-4 mb-5">
          <h4 className="mb-4">
            {editingId ? 'Update Opportunity' : 'Add New Opportunity'}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {[
                ['title', 'Job Title'],
                ['company', 'Company'],
                ['domain', 'Domain'],
                ['location', 'Location'],
                ['type', 'Type'],
                ['experience', 'Experience'],
                ['stipend', 'Stipend'],
                ['skills', 'Skills'],
                ['deadline', 'Application Deadline'],
                ['applicationLink', 'Application Link']
              ].map(([name, label]) => (
                <div className="col-md-6 mb-3" key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type="text"
                    name={name}
                    className="form-control"
                    value={formData[name]}
                    onChange={handleChange}
                    required={['title', 'company', 'location', 'type'].includes(name)}
                  />
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editingId ? 'Update Opportunity' : 'Add Opportunity'}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setFormData(initialForm);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <h4 className="mb-3">Manage Opportunities</h4>

        <div className="table-responsive mb-5">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {opportunities.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(job)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {opportunities.length === 0 && (
            <p className="text-center">No opportunities available.</p>
          )}
        </div>

        <h4 className="mb-3">Manage Applications</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Applicant</th>
                <th>Opportunity</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{application.applicantName}</td>
                  <td>{application.opportunityId?.title || 'N/A'}</td>
                  <td>{application.email}</td>
                  <td>{application.phone}</td>
                  <td>
                    <select
                      className="form-select"
                      value={application.status}
                      onChange={(e) =>
                        handleStatusChange(application._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {applications.length === 0 && (
            <p className="text-center">No applications received yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Admin;
