import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Home() {
  const featuredJobs = [
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

  return (
    <>
      <Navbar />

      {/* Welcome Section */}
      <div className="container mt-5 text-center">
        <h1>Welcome to Career Connect</h1>

        <p className="lead mt-3">
          Find the right internship and job opportunities
          to start your career.
        </p>

        <button className="btn btn-primary mt-3">
          Explore Opportunities
        </button>
      </div>

      {/* Featured Jobs */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">
          Featured Opportunities
        </h2>

        <div className="row">
          {featuredJobs.map((job) => (
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
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
