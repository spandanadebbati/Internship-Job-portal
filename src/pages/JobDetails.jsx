
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://job-portal-10g9.onrender.com/api/opportunities/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Opportunity not found');
        }
        return response.json();
      })
      .then((data) => setJob(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="container my-5">
        {loading ? (
          <p className="text-center">Loading job details...</p>
        ) : job ? (
          <div className="card shadow p-4">
            <h2 className="fw-bold text-primary">{job.title}</h2>

            <h5 className="mb-3">{job.company}</h5>

            <p><strong>Domain:</strong> {job.domain || 'Not specified'}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Experience:</strong> {job.experience || 'Not specified'}</p>
            <p><strong>Stipend:</strong> {job.stipend || 'Not specified'}</p>
            <p><strong>Skills:</strong> {job.skills || 'Not specified'}</p>
            <p><strong>Deadline:</strong> {job.deadline || 'Not specified'}</p>

            <hr />

            <h5>Description</h5>
            <p>{job.description}</p>

            <div className="mt-3">
              <Link
                to={`/apply/${job._id}`}
                className="btn btn-success me-2"
              >
                Apply Now
              </Link>

              <Link
                to="/opportunities"
                className="btn btn-secondary"
              >
                Back
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-danger">
            Opportunity not found.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default JobDetails;
