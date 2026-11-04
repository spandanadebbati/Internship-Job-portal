import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card p-4 text-center">
              <h5>Total Opportunities</h5>
              <h2>6</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4 text-center">
              <h5>Total Applications</h5>
              <h2>0</h2>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4 text-center">
              <h5>Active Opportunities</h5>
              <h2>6</h2>
            </div>
          </div>

        </div>

        <h4 className="mt-5">Manage Opportunities</h4>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/opportunities')}
        >
          Manage Opportunities
        </button>

        <button
          className="btn btn-warning mt-3 ms-2"
          onClick={() => alert('Edit feature will be added soon!')}
        >
          Edit Opportunity
        </button>

        <button
          className="btn btn-danger mt-3 ms-2"
          onClick={() => alert('Delete feature will be added soon!')}
        >
          Delete Opportunity
        </button>

      </div>

      <Footer />
    </>
  );
}

export default Admin;
