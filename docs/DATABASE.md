# Database Structure

CareerConnect uses **MongoDB** (hosted on MongoDB Atlas) with **Mongoose** schemas. The database has two collections.

```
opportunities  1 ─────────< *  applications
   (_id)                        (opportunityId → opportunities._id)
```

One opportunity can have many applications. Each application belongs to exactly one opportunity.

---

## 1. `opportunities` collection

Schema file: [`backend/models/Opportunity.js`](../backend/models/Opportunity.js)

| Field | Type | Required | Rules / Notes | Example |
|---|---|---|---|---|
| `_id` | ObjectId | auto | Created by MongoDB | `6aee105cd4c7bb0f00229b5c` |
| `title` | String | ✅ | Trimmed | `React Developer Intern` |
| `company` | String | ✅ | Trimmed | `AI Tech gen Technologies` |
| `domain` | String | ✅ | Chosen from a list in the Admin form; used by the domain filter | `Web Development` |
| `location` | String | ✅ | Trimmed | `Hyderabad` |
| `type` | String | ✅ | Must be `Internship` or `Full Time` | `Internship` |
| `experience` | String | – | Free text | `Fresher` |
| `description` | String | ✅ | Trimmed | `Work on React development projects` |
| `stipend` | String | – | Free text (amount or salary) | `15000` |
| `skills` | [String] | – | List of skills | `["React", "JavaScript"]` |
| `deadline` | Date | – | Last date to apply | `2026-12-30T00:00:00.000Z` |
| `applicationLink` | String | – | Must start with `http://` or `https://` | `https://company.com/careers` |
| `createdAt` | Date | auto | Added by `timestamps: true` | |
| `updatedAt` | Date | auto | Added by `timestamps: true` | |

Domains offered in the app: Web Development, Java Development, Python Development, Data Analytics, Artificial Intelligence, Mobile App Development, Cloud & DevOps, UI/UX Design.

### Example document
```json
{
  "_id": "6aee105cd4c7bb0f00229b5c",
  "title": "React Developer Intern",
  "company": "AI Tech gen Technologies",
  "domain": "Web Development",
  "location": "Hyderabad",
  "type": "Internship",
  "experience": "Fresher",
  "description": "Work on React development projects",
  "stipend": "15000",
  "skills": ["React", "JavaScript", "HTML", "CSS"],
  "deadline": "2026-12-30T00:00:00.000Z",
  "createdAt": "2026-11-06T...",
  "updatedAt": "2026-11-07T..."
}
```

---

## 2. `applications` collection

Schema file: [`backend/models/applications.js`](../backend/models/applications.js)

| Field | Type | Required | Rules / Notes | Example |
|---|---|---|---|---|
| `_id` | ObjectId | auto | Created by MongoDB | |
| `opportunityId` | ObjectId | ✅ | References `opportunities._id`; the opportunity must exist when applying | `6aee105cd4c7bb0f00229b5c` |
| `applicantName` | String | ✅ | Trimmed | `Student Name` |
| `email` | String | ✅ | Valid email; stored in lowercase | `student@example.com` |
| `phone` | String | ✅ | 10–15 digits; `+`, spaces and dashes allowed | `9876543210` |
| `resume` | String | – | Link to resume; must start with `http://` or `https://` | `https://drive.google.com/...` |
| `status` | String | auto | One of `Pending`, `Reviewed`, `Shortlisted`, `Rejected`; default `Pending` | `Pending` |
| `createdAt` | Date | auto | Date of application | |
| `updatedAt` | Date | auto | Last status change | |

### Business rules
- An applicant cannot apply twice to the same opportunity with the same email (API returns **409 Conflict**).
- When applications are fetched, `opportunityId` is **populated**, so the response contains the full opportunity (title, company, …) instead of only its id.
- If an opportunity is deleted, its applications are kept for record-keeping and shown as "Opportunity removed".

### Example document
```json
{
  "_id": "6aef2d3556ad9b4204a15279",
  "opportunityId": "6aee105cd4c7bb0f00229b5c",
  "applicantName": "Student Name",
  "email": "student@example.com",
  "phone": "9876543210",
  "resume": "https://drive.google.com/your-resume",
  "status": "Pending",
  "createdAt": "2026-11-07T...",
  "updatedAt": "2026-11-07T..."
}
```

---

## Data maintenance

`backend/scripts/updateExistingOpportunities.js` (`npm run update-records`) fills in `domain` and `experience` for the four original sample opportunities, which were created before those fields were saved. It:
- never deletes data
- only sets a field when it is empty
- can be run more than once safely
