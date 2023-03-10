import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import Main from "../layout/main/Main";
import AccountCreator from "../pages/register/AccountCreator";
import Home from "../pages/home/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../utils/PrivateRoute";
import AddJob from "../pages/employeeDashboard/AddJob";
import EmployerDashboard from "../pages/employeeDashboard/EmployerDashboard";
import CandidateDashboard from "../pages/candidateDashboard/CandidateDashboard";
import JobsPostedByEmployer from "../pages/employeeDashboard/JobsPostedByEmployer";
import AppliedJobs from "../pages/candidateDashboard/AppliedJobs";
import CandidateDetails from "../pages/employeeDashboard/CandidateDetails";
import DirectMessages from "../pages/employeeDashboard/DirectMessagesForEmployer";
import DirectMessagesForEmployer from "../pages/employeeDashboard/DirectMessagesForEmployer";
import DirectMessageForCandidate from "../pages/candidateDashboard/DirectMessageForCandidate";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/register/:type",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "job-posted-by-employer",
        element: <JobsPostedByEmployer />,
      },
      {
        path: "job-applied-by-candidate",
        element: <AppliedJobs />,
      },
      {
        path: "messages/employer/:email",
        element: <DirectMessagesForEmployer />
      },
      {
        path: "messages/candidate/:email",
        element: <DirectMessageForCandidate />
      },
      {
        path: "employer",
        element: <EmployerDashboard />,
      },
      {
        path: "candidate",
        element: <CandidateDashboard />,
      },
    ],
  },
  {
    path: "/candidate-details/:email",
    element: <CandidateDetails />,
  },
]);

export default routes;
