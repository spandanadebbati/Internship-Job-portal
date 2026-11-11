// Backend address. Change it in one place, or set VITE_API_URL in a .env file
// in the project root, for example: VITE_API_URL=http://localhost:5000
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Domains offered in the Admin form and the Opportunities filter
export const DOMAINS = [
  'Web Development',
  'Java Development',
  'Python Development',
  'Data Analytics',
  'Artificial Intelligence',
  'Mobile App Development',
  'Cloud & DevOps',
  'UI/UX Design'
];

export const OPPORTUNITY_TYPES = ['Internship', 'Full Time'];

export const APPLICATION_STATUSES = ['Pending', 'Reviewed', 'Shortlisted', 'Rejected'];

// Bootstrap badge colour for each application status
export const STATUS_BADGE = {
  Pending: 'bg-warning text-dark',
  Reviewed: 'bg-info text-dark',
  Shortlisted: 'bg-success',
  Rejected: 'bg-danger'
};

// Sends a request to the backend and returns the JSON response.
// If the backend replies with an error, it throws an Error with the backend's message.
export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
  } catch {
    throw new Error('Cannot reach the server. Please make sure the backend is running.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status})`);
  }

  return data;
}

// Formats a date as "30 Dec 2026"
export function formatDate(value) {
  if (!value) return 'Not specified';
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
