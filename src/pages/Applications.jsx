
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://job-portal-10g9.onrender.com/api/applications')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        return response.json();
      })
      .then((data) => setApplications(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          My Applications
        </h2>

        {loading ? (
          <p className="text-center">Loading applications...</p>
        ) : applications.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Opportunity</th>
                  <th>Company</th>
                  <th>Applicant Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Resume</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td>
                      {application.opportunityId?.title || 'N/A'}
                    </td>
                    <td>
                      {application.opportunityId?.company || 'N/A'}
                    </td>
                    <td>{application.applicantName}</td>
                    <td>{application.email}</td>
                    <td>{application.phone}</td>
                    <td>
                      {application.resume ? (
                        <a
                          href={application.resume}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Resume
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">
            You have not submitted any applications yet.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Applications;
