# Project Report
## CareerConnect – Internship & Job Listing Portal

**Prepared by:** Spandana Debbati
**Project type:** Internship Project (Full-Stack Web Development)
**Duration:** 2 weeks (November 2026)
**Repository:** https://github.com/spandanadebbati/Internship-Job-portal

---

## 1. Introduction

Students often search many different websites to find internships and entry-level jobs, and once they apply it is hard to keep track of where each application stands. CareerConnect solves this with one portal where students can discover opportunities, apply online and follow the status of each application, while recruiters manage listings and review applicants from a single dashboard.

## 2. Objectives

1. Build a responsive web application to list internships and jobs.
2. Let students search and filter opportunities by keyword, domain and type.
3. Let students apply online and track their application status.
4. Give administrators a dashboard to add, edit and delete opportunities and to update application status.
5. Store all data permanently in a MongoDB database through a REST API.

## 3. Technology Stack

| Layer | Technology | Why it was chosen |
|---|---|---|
| Frontend | React 19 + Vite | Component-based UI; Vite gives a fast development server |
| Routing | React Router DOM | Page navigation without full page reloads |
| Styling | Bootstrap 5 + custom CSS | Responsive grid and ready-made components with a consistent theme |
| Backend | Node.js + Express 5 | Simple and popular way to build REST APIs in JavaScript |
| Database | MongoDB Atlas + Mongoose | Flexible document database; Mongoose adds schemas and validation |

## 4. System Architecture

```
 Browser (React app, port 5173)
        │  fetch() requests with JSON
        ▼
 Express server (port 5000)
   ├── /api/opportunities  → opportunityRoutes.js
   └── /api/applications   → applicationRoutes.js
        │  Mongoose models (validation)
        ▼
 MongoDB Atlas
   ├── opportunities collection
   └── applications collection
```

The frontend never talks to the database directly. All reads and writes go through the Express API, which validates the data with Mongoose before saving it.

## 5. Modules

### 5.1 User module
| Page | Purpose |
|---|---|
| Home | Hero search, live statistics, browse-by-domain tiles, latest opportunities |
| Opportunities | Search and filter by domain and type; results update instantly |
| Job Details | Full information about one opportunity, with an Apply button and the company link |
| Apply | Application form with validation and a confirmation screen |
| My Applications | List of applications with colour-coded status, filterable by email |

### 5.2 Admin module
| Feature | Purpose |
|---|---|
| Dashboard cards | Total opportunities and applications, and counts per status |
| Add / Edit opportunity | One form used for both; domain chosen from a fixed list for consistent filtering |
| Delete opportunity | With a confirmation prompt |
| Manage applications | View applicant details and resume link, change status, filter by status |

### 5.3 Backend module
- REST endpoints for full CRUD on opportunities, and create/read/update-status on applications (see README).
- Validation: required fields, allowed values for type and status, email, phone and URL formats.
- Error handling: clear JSON messages with status codes 400, 404, 409 and 500.
- Duplicate protection: the same email cannot apply twice for the same opportunity.

## 6. Database Design

Two collections, `opportunities` and `applications`, linked by `applications.opportunityId → opportunities._id` (one-to-many). Full field list: [DATABASE.md](DATABASE.md).

## 7. Challenges and Solutions

| Challenge | Cause | Solution |
|---|---|---|
| MongoDB Atlas connection failed | Current IP address not on the Atlas allowlist; DNS issues with `mongodb+srv` | Added the IP in Atlas Network Access; the server uses public DNS servers for the SRV lookup |
| `domain`, `experience` and `applicationLink` were not saved | The fields were added to the Mongoose schema while the server was already running. Node loads the schema once, and Mongoose silently drops fields that are not in its schema | Restarted the server; added `npm run dev` (`node --watch`) so the server restarts automatically after every change |
| Existing records had no domain | They were created before the fix | Wrote a safe script that only fills empty fields and never deletes data |
| White cards / inconsistent styling | Default Vite CSS and a global reset conflicted with Bootstrap | Replaced with a theme built on Bootstrap variables |
| Mobile menu did not open | Bootstrap's JavaScript was not loaded | The menu is now opened and closed with React state |
| Home page showed sample data | Hard-coded array | Home page now loads real opportunities from MongoDB |

## 8. Testing

Testing was done manually and with automated scripts against the real MongoDB database. The scripts only created and deleted their own test records.

**API tests (36 checks, all passed):** list, filter by domain/type, search, get by id, create with all fields, update, delete; validation errors (missing fields, invalid type, invalid link, invalid id, invalid JSON); application submit, duplicate (409), invalid email/phone, missing opportunity (404), status updates to all four values, invalid status.

**Browser tests (36 checks, all passed):** home page data and stats, domain tiles, domain/type filters and search, clear filters, admin add/edit/delete with values verified in MongoDB, job details, apply and confirmation, duplicate application error, My Applications filter, admin status update and filter, 404 page, and mobile layout (menu toggle, no horizontal scrolling).

## 9. Screenshots

_Add screenshots of the following pages here before submission:_
1. Home page
2. Opportunities page with a domain filter applied
3. Job details page
4. Apply form and confirmation
5. My Applications page
6. Admin dashboard (form and tables)
7. Mobile view

## 10. Limitations and Future Scope

- **Authentication:** the Admin page is open to anyone; admin and student login would be the next step.
- **My Applications** filters by email instead of a logged-in user.
- Resume is a link rather than an uploaded file.
- Possible additions: email notifications on status change, pagination, saved/bookmarked jobs, and online deployment.

## 11. Conclusion

CareerConnect meets the project objectives: students can search, filter, view and apply for opportunities and track their applications, and administrators can fully manage opportunities and application status. The project gave practical experience with React components and routing, REST API design with Express, data modelling and validation with Mongoose, debugging a full data flow from form to database, and preparing a project for submission on GitHub.
