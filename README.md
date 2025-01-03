# WorkXplore

WorkXplore is a comprehensive web application designed to cater to three different user roles: **User**, **Recruiter**, and **Admin**. The platform provides a seamless experience through its intuitive dashboards and efficient management tools.

## Features

### User Dashboard
- User registration and login with form validation.
- Profile creation and management.
- Job search and application tracking.
- Notifications for new job postings and application updates.

### Recruiter Dashboard
- Recruiter registration and login with form validation.
- Job posting management (create, update, delete job listings).
- View and manage applications from candidates.
- Communication tools to interact with potential candidates.

### Admin Panel
- Admin authentication with secure access.
- Overview of platform statistics.
- User and recruiter management (approve, delete, or modify accounts).
- Monitoring and moderation tools to ensure platform integrity.

## Tech Stack

### Frontend
- **React**: For building dynamic and responsive user interfaces.
- **Redux**: Centralized state management for efficient data handling across components.

### Backend
- **Node.js**: For server-side operations.
- **Express.js**: For building RESTful APIs.

### Database
- Database technology ( MongoDB) for storing and managing application data. 


## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/rudra11911/WorkXplore.git
   cd WorkXplore
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the necessary environment variables (e.g., database URI, JWT secret, etc.).

4. Run the development servers:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd backend
     npm start
     ```

5. Open the application:
   - Visit `http://localhost:3000` for the frontend.

## Folder Structure

```plaintext
WorkXplore/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── styles/
│   │   └── App.js
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── README.md
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature-name'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.


## Contact
For any inquiries or support, please reach out to:
- Email: rudraprataprp9651567619@gmail.com.com
- GitHub: [your-username](https://github.com/rudra11911)

