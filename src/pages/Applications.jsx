import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Applications() {
  const applications = [];

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">
          My Applications
        </h2>

        {applications.length > 0 ? (
          <div className="row">
            {applications.map((application) => (
              <div className="col-md-6 mb-3" key={application.id}>
                <div className="card p-3">
                  <h5>{application.jobTitle}</h5>
                  <p>Company: {application.company}</p>
                  <p>Status: {application.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-5">
            <h5>No Applications Yet!</h5>
            <p>You have not applied for any jobs or internships.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Applications;
