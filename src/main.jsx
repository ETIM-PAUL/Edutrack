import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Lecturer/Dashboard.jsx';
import Courses from './pages/Lecturer/Courses.jsx';
import CourseDetails from './pages/Lecturer/CourseDetails.jsx';
import StudentDashboard from './pages/Student/StudentDashboard.jsx';
import StudentCourses from './pages/Student/StudentCourses.jsx';
import StudentCourseDetails from './pages/Student/StudentCourseDetails.jsx';
import StudentAttendance from './pages/Student/StudentAttendance.jsx';
import StudentResult from './pages/Student/StudentResult.jsx';
import StudentClasslist from './pages/Student/StudentClasslist.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/lecturer/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/lecturer/courses",
    element: <Courses />,
  },
  {
    path: "/lecturer/course-details/:id",
    element: <CourseDetails />,
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/student/courses",
    element: <StudentCourses />,
  },
  {
    path: "/student/classlist",
    element: <StudentClasslist />,
  },
  {
    path: "/student/attendance",
    element: <StudentAttendance />,
  },
  {
    path: "/student/result",
    element: <StudentResult />,
  },
  {
    path: "/student/course-details/:id",
    element: <StudentCourseDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
