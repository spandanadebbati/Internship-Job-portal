
import { Link } from 'react-router-dom';

function Jobcard({ job }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            {job.title}
          </h5>

          <h6 className="text-primary mb-3">
            {job.company}
          </h6>

          <p className="card-text">
            <strong>Location:</strong> {job.location}
          </p>

          <p className="card-text">
            <strong>Type:</strong> {job.type}
          </p>

          <p className="card-text">
            <strong>Stipend:</strong> {job.stipend || 'Not specified'}
          </p>

          <Link
            to={`/job/${job._id}`}
            className="btn btn-primary mt-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Jobcard;
