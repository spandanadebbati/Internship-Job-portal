import { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Opportunities() {

  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('All');

  const opportunities = [
    {
      id: 1,
      title: 'Java Developer Intern',
      company: 'ABC Technologies',
      location: 'Hyderabad',
      type: 'Internship',
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'XYZ Solutions',
      location: 'Remote',
      type: 'Internship',
    },
    {
      id: 3,
      title: 'Python Developer',
      company: 'Tech Solutions',
      location: 'Hyderabad',
      type: 'Full Time',
    },
    {
      id: 4,
      title: 'Data Analyst Intern',
      company: 'Bright Analytics',
      location: 'Bengaluru',
      type: 'Internship',
    },
    {
      id: 5,
      title: 'React Developer',
      company: 'WebTech Solutions',
      location: 'Chennai',
      type: 'Full Time',
    },
    {
      id: 6,
      title: 'Python Developer Intern',
      company: 'Innovate Technologies',
      location: 'Remote',
      type: 'Internship',
    },
  ];

  // Search and filter jobs
  const filteredOpportunities = opportunities.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      jobType === 'All' || job.type === jobType;

    return matchesSearch && matchesType;
  });

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">

        <h2 className="text-center">
          Explore Opportunities
        </h2>

        <p className="text-center">
          Find internships and jobs that match your skills.
        </p>

        {/* Search */}
        <input
          type="text"
          className="form-control mt-4 mb-3"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Job Type Filter */}
        <select
          className="form-select mb-4"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="All">All Opportunities</option>
          <option value="Internship">Internship</option>
          <option value="Full Time">Full Time</option>
        </select>

        {/* Opportunity Cards */}
        <div className="row">

          {filteredOpportunities.length > 0 ? (

            filteredOpportunities.map((job) => (

              <div className="col-md-4 mb-4" key={job.id}>
                <div className="card p-3 h-100">

                  <h5>{job.title}</h5>
                  <p>{job.company}</p>
                  <p>Location: {job.location}</p>
                  <p>Type: {job.type}</p>

                  <button className="btn btn-outline-primary">
                    View Details
                  </button>

                </div>
              </div>

            ))

          ) : (

            <p className="text-center text-danger">
              No opportunities found.
            </p>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Opportunities;
