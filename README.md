# 🧹 CleanSweep

**CleanSweep** is a smart, full-stack civic complaint management platform designed to streamline public issue reporting and resolution. Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), CleanSweep empowers both **citizens** and **municipal officers** with real-time dashboards, AI-based complaint prioritization, map visualizations, and automated escalations for unaddressed issues.

---

## 🚀 Features

- 📝 **Complaint Submission** — Citizens can report civic issues with title, description, category, area, and location.
- 🧠 **AI-Based Priority Assignment** — CleanSweep uses AI (e.g., ChatGPT) to analyze and auto-assign complaint priority (High / Medium / Low).
- 🗺️ **Real-Time Map Visualization** — Issues are plotted on a CesiumJS-based map with live status indicators (Reported, In Progress, Resolved).
- 📊 **Admin Dashboard** — Municipal officers can filter complaints by area, assign staff, and monitor resolution timelines.
- 📬 **Escalation System** — If unresolved within a time threshold, automatic emails are sent to higher authorities.
- ✅ **Feedback Loop** — Citizens receive resolution updates and can submit feedback with ratings.
- 📁 **CSV Upload Support** — Admins can bulk upload complaints using structured CSV files.
- 🔐 **Authentication System** — Secure login system for both citizens and admin roles.

---

## 🧑‍💻 Tech Stack

| Layer       | Technology                 |
|-------------|-----------------------------|
| Frontend    | React.js (Vite), TailwindCSS |
| Backend     | Node.js, Express.js         |
| Database    | MongoDB                     |
| AI Agent    | OpenAI ChatGPT API          |
| Maps        | CesiumJS                    |
| Deployment  | Vercel (Frontend), Render/Heroku (Backend) |

---

## 📷 Screenshots

### 📌 Map View
![Map View](./screenshots/map-view.png)

### 📊 Admin Area Report
![Admin Report](./screenshots/admin-dashboard.png)

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)
- OpenAI API Key (optional if using AI priority)

