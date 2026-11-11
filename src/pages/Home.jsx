
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Jobcard from '../Components/Jobcard';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/opportunities')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        return response.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Welcome to Career Connect
          </h1>

          <p className="lead">
            Find internships and job opportunities to start your career.
          </p>

          <Link to="/opportunities" className="btn btn-light btn-lg mt-3">
            Explore Opportunities
          </Link>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">
          Latest Opportunities
        </h2>

        {loading ? (
          <p className="text-center">Loading opportunities...</p>
        ) : jobs.length > 0 ? (
          <div className="row">
            {jobs.slice(0, 3).map((job) => (
              <Jobcard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center">
            No opportunities available yet.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
