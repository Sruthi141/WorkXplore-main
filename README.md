
# WorkXplore 🚀

## 📋 Project Overview

**WorkXplore** is a full-stack job portal application designed to streamline the job search and recruitment process. It connects job seekers with employers through an intuitive interface and real-time updates.

### Key Features

* 🔐 **Multi-Role Authentication System** (Student/Job Seeker, Recruiter, Admin)
* 💼 **Job Management** – Post, browse, and apply for jobs
* 🏢 **Company Profiles** – Create and manage company profiles
* 📊 **Admin Dashboard** – Analytics and user management
* 💳 **Payment Integration** – Stripe payment gateway for premium features
* ☁️ **Cloud Storage** – Cloudinary integration for file uploads

---

## 🛠️ Tech Stack

### Backend

* **Runtime:** Node.js with Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT & bcrypt
* **File Upload:** Multer & Cloudinary
* **Payment:** Stripe API
* **Additional:** Cookie-parser, CORS, dotenv

### Frontend

* **Framework:** React 18 with Vite
* **State Management:** Redux Toolkit with Redux Persist
* **Routing:** React Router DOM v6
* **UI Components:** Tailwind CSS, Material-UI (MUI), shadcn/ui
* **Charts & Animations:** Recharts, Chart.js, Framer Motion, Animate.css
* **Notifications & Payment:** React Toastify, Stripe React Components

---

## 📁 Project Structure

```
WorkXplore/
├── backend/
│   ├── app.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── redux/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── public/
```

---

## 🔌 API Endpoints

**Base URL:**

* Backend: `http://localhost:3000/api/v1`
* Frontend: `http://localhost:5173`

Endpoints include:

* **User Routes** – Registration, login, profile update
* **Company Routes** – Create, update, fetch companies
* **Job Routes** – Post, fetch, search jobs
* **Application Routes** – Apply, update status, view applicants
* **Admin Routes** – Manage users, jobs, analytics
* **Payment Route** – Stripe payment intent creation

---

## 📊 Data Models

* **User:** fullname, email, phoneNumber, password, role, profile (bio, skills, resume, profilePhoto)
* **Company:** name, description, website, location, logo, userId
* **Job:** title, description, requirements, salary, experienceLevel, location, jobType, position, company, created_by, applications
* **Application:** job, applicant, status (pending/accepted/rejected)

---

## 🚀 Getting Started

### Prerequisites

* Node.js v14+
* MongoDB (local/Atlas)
* Cloudinary Account
* Stripe Account

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication & Security

* JWT-based auth with HTTP-only cookies
* Password hashing with bcrypt
* Role-based access control (Student, Recruiter, Admin)
* Protected API routes

---

## 💳 Payment Integration

* Stripe integration for premium features
* **Test Card:** `4242 4242 4242 4242`

---

## 🎨 Frontend Routes

* `/` – Homepage
* `/login` – Login
* `/signup` – Registration
* `/jobs` – Browse jobs
* `/profile` – User profile
* `/dashboard` – User/Recruiter dashboard
* `/recruiter/companies` – Company management
* `/recruiter/jobs` – Job management
* `/adminpanel` – Admin dashboard

---

## 📦 State Management

* Redux Toolkit with persisted state (authSlice, jobSlice, companySlice, applicationSlice)

---

## 👩‍💻 Author

**Sruthi Kommati**

* GitHub: [@sruthikommati](https://github.com/Sruthi141)
* Email: [sruthikommati1919@gmail.com](mailto:sruthikommati1919@gmail.com)