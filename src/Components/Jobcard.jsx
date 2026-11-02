function JobCard({ job }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">

        <h5 className="card-title">
          {job.title}
        </h5>

        <h6 className="text-primary">
          {job.company}
        </h6>

        <p className="card-text">
          {job.description}
        </p>

        <p className="mb-2">
          <strong>Location:</strong> {job.location}
        </p>

        <p className="mb-3">
          <strong>Type:</strong> {job.type}
        </p>

        <button className="btn btn-primary">
          View Details
        </button>

      </div>
    </div>
  );
}

export default JobCard;
