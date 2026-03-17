import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./components/pages/Homepage";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Jobs from "./components/pages/Jobspage";
import Browse from "./components/pages/BrowsePage";
import Profile from "./components/pages/ProfilePage";
import Jobdescription from "./components/layout/jobs/Jobdescription";
import Companies from "./components/pages/CompanyPage";
import CompanyCreate from "./components/layout/Company/CompanyCreate";
import CompanySetup from "./components/layout/Company/CompanySetup";
import RecruiterJobsPage from "./components/pages/RecruiterJobsPage";
import PostJob from "./components/layout/recruiterJobs/PostJob";
import ApplicantPage from "./components/pages/ApplicantPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute2 from "./utils/ProtectedRoute2";
import "animate.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Global navbar layout (new)
import GlobalLayout from "./components/layout/GlobalLayout";

// Admin panel imports
import Sidebar from "./components/admin/components/Sidebar";
import AdminNavbar from "./components/admin/components/Navbar";
import Home from "./components/admin/pages/Home";
import Users from "./components/admin/pages/Users";
import Recruiters from "./components/admin/pages/Recruiters";
import Single from "./components/admin/pages/Single";
import New from "./components/admin/pages/New";
import Single2 from "./components/admin/pages/Single2";
import Post from "./components/admin/components/Post";
import ChartHolder from "./components/admin/pages/ChartHolder";
import StatHolder from "./components/admin/pages/StatHolder";

import PageTransition from "./components/layout/PageTransition";

import Revenuehome from "./components/revenue/Revenuehome";
import Plans from "./components/revenue/Plans";
import ResumePage from "./components/pages/ResumePage";
import PremiumSuccess from "./components/pages/PremiumSuccess";
import PremiumCancel from "./components/pages/PremiumCancel";

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