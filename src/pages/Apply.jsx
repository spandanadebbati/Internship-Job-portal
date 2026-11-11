
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    resume: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:5000/api/applications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            opportunityId: id,
            ...formData
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Application submission failed');
      }

      alert('Application submitted successfully!');
      navigate('/applications');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">
                Apply for Opportunity
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="applicantName"
                    className="form-control"
                    value={formData.applicantName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Resume Link (Google Drive or other URL)
                  </label>
                  <input
                    type="url"
                    name="resume"
                    className="form-control"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Apply;
