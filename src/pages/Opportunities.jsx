
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Jobcard from '../Components/Jobcard';

function Opportunities() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.domain || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          Internship & Job Opportunities
        </h2>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, company or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading opportunities...</p>
        ) : filteredJobs.length > 0 ? (
          <div className="row">
            {filteredJobs.map((job) => (
              <Jobcard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center">
            No matching opportunities found.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Opportunities;
