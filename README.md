# CareerConnect – Internship & Job Listing Portal

CareerConnect is a full-stack web application where students can find internships and jobs, apply online and track the status of their applications. Recruiters (admins) can post, edit and delete opportunities and review the applications they receive.

It was built as an internship project with **React**, **Express**, **Node.js** and **MongoDB**.

---

## Features

### For students (user side)
- **Home page** with real counts of opportunities, internships, full-time jobs and companies, quick search, browse-by-domain tiles and the latest opportunities
- **Opportunities page** with:
  - search by title, company, domain, location or skill
  - filter by **domain** (Web Development, Java Development, Python Development, Data Analytics, Artificial Intelligence, …)
  - filter by **type** (Internship / Full Time)
  - filters saved in the URL, so a filtered page can be shared or bookmarked
- **Job details page** showing domain, location, type, experience, stipend, deadline, skills and the company's own application link
- **Apply** form with validation and an on-screen **confirmation**
- **My Applications** page showing each application and its colour-coded status, filterable by email

### For recruiters (admin side)
- Dashboard cards: total opportunities, total applications and counts for each status
- **Add**, **edit** and **delete** opportunities
- View all applications with applicant contact details and resume link
- **Update application status**: Pending, Reviewed, Shortlisted, Rejected
- Filter applications by status

### Backend
- REST API built with Express and Mongoose
- Validation of required fields, allowed values, email, phone number and links
- Clear error messages with correct HTTP status codes (400, 404, 409, 500)
- Prevents the same email from applying twice to the same opportunity

---

## Technology Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, Vite, React Router DOM, Bootstrap 5, CSS |
| Backend   | Node.js, Express 5                              |
| Database  | MongoDB Atlas, Mongoose                          |
| Tools     | ESLint, Git, GitHub, VS Code                    |

---

## Folder Structure

```
Internship-Job-Portal/
├── backend/                         # Express + MongoDB API
│   ├── models/
│   │   ├── Opportunity.js           # Opportunity schema
│   │   └── applications.js          # Application schema
│   ├── routes/
│   │   ├── opportunityRoutes.js     # /api/opportunities
│   │   └── applicationRoutes.js     # /api/applications
│   ├── scripts/
│   │   └── updateExistingOpportunities.js  # one-time data fix (safe to re-run)
│   ├── utils/
│   │   └── handleError.js           # turns Mongoose errors into clear responses
│   ├── .env.example                 # template for your own .env (no secrets)
│   ├── package.json
│   └── server.js                    # app entry point
├── docs/
│   ├── DATABASE.md                  # database structure
│   └── PROJECT_REPORT.md            # project report
├── public/                          # static files (favicon)
├── src/                             # React frontend
│   ├── Components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Jobcard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Opportunities.jsx
│   │   ├── JobDetails.jsx
│   │   ├── Apply.jsx
│   │   ├── Applications.jsx
│   │   └── Admin.jsx
│   ├── api.js                       # backend URL, shared lists and fetch helper
│   ├── App.jsx                      # routes
│   ├── index.css                    # theme and global styles
│   └── main.jsx                     # React entry point
├── index.html
├── package.json                     # frontend dependencies and scripts
└── vite.config.js
```

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer (developed with Node 24)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB server)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/spandanadebbati/Internship-Job-portal.git
cd Internship-Job-portal
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

---

## MongoDB Configuration

1. In MongoDB Atlas, create a cluster and a database user.
2. Under **Network Access**, add your current IP address (or `0.0.0.0/0` for testing only).
3. Click **Connect → Drivers** and copy the connection string.
4. In the `backend` folder, copy the example file:
   ```bash
   cp .env.example .env
   ```
5. Open `backend/.env` and replace the placeholders with your own connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
   PORT=5000
   ```

> **Never commit `backend/.env`.** It is already listed in `.gitignore`.

---

## Running the Project

Open **two terminals**.

**Terminal 1: backend** (http://localhost:5000)
```bash
cd backend
npm run dev      # restarts automatically when you save a backend file
# or: npm start  # plain start without auto-restart
```
You should see `MongoDB Connected Successfully!` and `Server is running on http://localhost:5000`.

**Terminal 2: frontend** (http://localhost:5173)
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Other commands
| Command | Where | What it does |
|---|---|---|
| `npm run build` | root | Builds the frontend into `dist/` |
| `npm run lint` | root | Checks frontend and backend code with ESLint |
| `npm run update-records` | backend | Fills missing `domain`/`experience` on the original sample records (never deletes data) |

### Using a different backend address
The frontend reads the backend URL from `src/api.js`. To change it without editing code, create a `.env` file in the project root:
```
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

Base URL: `http://localhost:5000`

### Opportunities

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/opportunities` | Get all opportunities (newest first) |
| GET | `/api/opportunities?domain=Web Development&type=Internship&search=react` | Filter by domain, type and/or search text (all optional) |
| GET | `/api/opportunities/:id` | Get one opportunity |
| POST | `/api/opportunities` | Create an opportunity |
| PUT | `/api/opportunities/:id` | Update an opportunity |
| DELETE | `/api/opportunities/:id` | Delete an opportunity |

Example request body for POST / PUT:
```json
{
  "title": "React Developer Intern",
  "company": "AI Tech gen Technologies",
  "domain": "Web Development",
  "location": "Hyderabad",
  "type": "Internship",
  "experience": "Fresher",
  "description": "Work on React development projects",
  "stipend": "15000",
  "skills": ["React", "JavaScript", "HTML", "CSS"],
  "deadline": "2026-12-30",
  "applicationLink": "https://company.com/careers"
}
```
Required: `title`, `company`, `domain`, `location`, `type` (`Internship` or `Full Time`), `description`.

### Applications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get all applications, with opportunity details |
| GET | `/api/applications?email=student@example.com` | Get applications for one email |
| POST | `/api/applications` | Submit an application |
| PUT | `/api/applications/:id/status` | Update status (`Pending`, `Reviewed`, `Shortlisted`, `Rejected`) |

Example request body for POST:
```json
{
  "opportunityId": "<opportunity _id>",
  "applicantName": "Student Name",
  "email": "student@example.com",
  "phone": "9876543210",
  "resume": "https://drive.google.com/your-resume"
}
```

### Error responses
All errors are returned as JSON: `{ "message": "..." }`

| Code | When |
|---|---|
| 400 | Missing/invalid field, invalid id, invalid JSON |
| 404 | Opportunity, application or route not found |
| 409 | Same email already applied for this opportunity |
| 500 | Unexpected server error |

---

## Documentation
- [Database structure](docs/DATABASE.md)
- [Project report](docs/PROJECT_REPORT.md)

## Future Improvements
- Login for students and admins (the admin page is currently open to everyone)
- Resume file upload
- Email notifications when an application status changes
- Pagination for large numbers of opportunities
- Online deployment (for example Vercel for the frontend and Render for the backend)

## Author
Spandana Debbati, Internship Project, 2026
