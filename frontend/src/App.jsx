import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./components/pages/Homepage.jsx";
import Login from "./components/auth/login.jsx";
import Signup from "./components/auth/signup.jsx";
import Jobs from "./components/pages/Jobspage.jsx";
import Browse from "./components/pages/BrowsePage.jsx";
import Profile from "./components/pages/ProfilePage.jsx";
import Jobdescription from "./components/layout/jobs/Jobdescription.jsx";
import Companies from "./components/pages/CompanyPage.jsx";
import CompanyCreate from "./components/layout/Company/CompanyCreate.jsx";
import CompanySetup from "./components/layout/Company/CompanySetup.jsx";
import RecruiterJobsPage from "./components/pages/RecruiterJobsPage.jsx";
import PostJob from "./components/layout/recruiterJobs/PostJob.jsx";
import ApplicantPage from "./components/pages/ApplicantPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import ProtectedRoute2 from "./utils/ProtectedRoute2.jsx";
import "animate.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Global navbar layout (new)
import GlobalLayout from "./components/layout/GlobalLayout.jsx";

// Admin panel imports
import Sidebar from "./components/admin/components/Sidebar.jsx";
import AdminNavbar from "./components/admin/components/Navbar.jsx";
import Home from "./components/admin/pages/Home.jsx";
import Users from "./components/admin/pages/Users.jsx";
import Recruiters from "./components/admin/pages/Recruiters.jsx";
import Single from "./components/admin/pages/Single.jsx";
import New from "./components/admin/pages/New.jsx";
import Single2 from "./components/admin/pages/Single2.jsx";
import Post from "./components/admin/components/Post.jsx";
import ChartHolder from "./components/admin/pages/ChartHolder.jsx";
import StatHolder from "./components/admin/pages/StatHolder.jsx";

import PageTransition from "./components/layout/PageTransition.jsx";

import Revenuehome from "./components/revenue/Revenuehome.jsx";
import Plans from "./components/revenue/Plans.jsx";
import ResumePage from "./components/pages/ResumePage.jsx";
import PremiumSuccess from "./components/pages/PremiumSuccess.jsx";
import PremiumCancel from "./components/pages/PremiumCancel.jsx";

function App() {
  const [stripePromise, setStripePromise] = useState(null);
  const [stripeLoadFailed, setStripeLoadFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    // ✅ ONLY CHANGE: load from .env (Vite)
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    if (!pk) {
      console.warn("❌ VITE_STRIPE_PUBLISHABLE_KEY is missing in frontend/.env");
      setStripeLoadFailed(true);
      return;
    }

    loadStripe(pk)
      .then((p) => {
        if (!mounted) return;
        setStripePromise(p);
      })
      .catch((err) => {
        console.warn("Stripe.js failed to load:", err);
        setStripeLoadFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <GlobalLayout />,
      children: [
        { index: true, element: <PageTransition><Homepage /></PageTransition> },
        { path: "login", element: <PageTransition><Login /></PageTransition> },
        { path: "signup", element: <PageTransition><Signup /></PageTransition> },
        { path: "jobs", element: <PageTransition><Jobs /></PageTransition> },
        { path: "description/:id", element: <PageTransition><Jobdescription /></PageTransition> },
        { path: "browse", element: <PageTransition><Browse /></PageTransition> },
        { path: "profile", element: <PageTransition><Profile /></PageTransition> },
        { path: "dashboard", element: <PageTransition><Dashboard /></PageTransition> },

        {
          path: "recruiter/companies",
          element: (
            <PageTransition>
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            </PageTransition>
          ),
        },
        {
          path: "recruiter/companies/create",
          element: (
            <PageTransition>
              <ProtectedRoute>
                <CompanyCreate />
              </ProtectedRoute>
            </PageTransition>
          ),
        },
        {
          path: "recruiter/companies/:id",
          element: (
            <PageTransition>
              <ProtectedRoute>
                <CompanySetup />
              </ProtectedRoute>
            </PageTransition>
          ),
        },
        {
          path: "recruiter/jobs",
          element: (
            <PageTransition>
              <ProtectedRoute>
                <RecruiterJobsPage />
              </ProtectedRoute>
            </PageTransition>
          ),
        },
        {
          path: "recruiter/jobs/create",
          element: (
            <PageTransition>
              <ProtectedRoute>
                <PostJob />
              </ProtectedRoute>
            </PageTransition>
          ),
        },
        {
          path: "recruiter/jobs/:id/applicants",
          element: (
            <PageTransition>
              <ProtectedRoute>
                <ApplicantPage />
              </ProtectedRoute>
            </PageTransition>
          ),
        },

        { path: "revenuehome", element: <PageTransition><Revenuehome /></PageTransition> },
        { path: "plans", element: <PageTransition><Plans /></PageTransition> },
        { path: "resume", element: <PageTransition><ResumePage /></PageTransition> },
        { path: "premium/success", element: <PageTransition><PremiumSuccess /></PageTransition> },
        { path: "premium/cancel", element: <PageTransition><PremiumCancel /></PageTransition> },

        {
          path: "adminpanel",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <Home />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/users",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <Users />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/users/new",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <New />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/users/:userId",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <Single />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/recruiters",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <Recruiters />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/recruiters/new",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <New />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/recruiters/:recruiterId",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <Single2 />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/posts",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <Post />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/charts",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <ChartHolder />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
        {
          path: "adminpanel/stats",
          element: (
            <PageTransition>
              <ProtectedRoute2>
                <div className="admin-panel flex">
                  <Sidebar />
                  <div className="admin-content flex-grow">
                    <AdminNavbar />
                    <StatHolder />
                  </div>
                </div>
              </ProtectedRoute2>
            </PageTransition>
          ),
        },
      ],
    },
  ]);

  if (stripeLoadFailed || !stripePromise) {
    return <RouterProvider router={approuter} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={approuter} />
    </Elements>
  );
}

export default App;