import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import "./index.css";
import AuthLayout from "./Layout/AuthLayout";
import ErrorElement from "./Error/Error_element";

import SignUp from "./Authentication/Auth_component/SignUp";
import Varification from "./Authentication/Auth_component/Varification";
import Main_Layout from "./Layout/Main_Layout";
import Home from "./Pages/Home/Home";
import Canteen_Layout from "./Layout/Canteen_Layout";
import Canteen_Home from "./Pages/Canteen/Canteen_Home";
import Canteen_Details from "./Pages/Canteen/Canteen_Details";
import Login from "./Authentication/Auth_component/Login";
import { AuthProvider } from "./Authentication/Context_auth/AuthContext";
import { UserProvider } from "./Authentication/Context_auth/UserContext";
import Student from "./Pages/Profile/Student";
import ProfileUpdate from "./Pages/Profile/Profile_component/ProfileUpdate";
import { StudentProvider } from "./Authentication/Context_auth/StudentContext";
import Event_Layout from "./Layout/Event_Layout";
import Event_Home from "./Pages/Event/Event_Home";
import Club_Details from "./Pages/Event/Club_Details";
import Club_update from "./Update/Club_update";
import Dashboard_Layout from "./Layout/Dashboard_Layout";
import Student_Dashboard from "./Pages/Dashboard/Student_Dashboard";
import Admin_Dashboard from "./Pages/Dashboard/Admin_Dashboard";
import Canteen_Update from "./Update/Canteen_Update";
import Class_Layout from "./Layout/Class_Layout";
import Facultypage from "./Pages/ClassTime/Facultypage";
import Course from "./Pages/ClassTime/Course";
import CourseDetails from "./Pages/ClassTime/CourseDetails";
import FacultyCreate from "./Update/FacultyCreate";
import CourseCreate from "./Update/CourseCreate";
import AddClass from "./Update/AddClass";
import AddExam from "./Update/AddExam";
import AddAssignment from "./Update/AddAssignment";
import Bus_Home from "./Pages/BusRoute/Bus_Home";
import BusLayout from "./Layout/BusLayout";
import Bus_Details from "./Pages/BusRoute/Bus_Details";
import Bus_Create from "./Update/Bus_Create";
import Route_Create from "./Update/Route_Create";
import AnnouncementCreate from "./Update/AnnouncementCreate";
import Restaurant_Create from "./Update/Restaurant_Create";
import Club_create from "./Update/Club_create";
import Event_create from "./Update/Event_create";
import Lostandfound from "./Pages/Lostandfound";
import LostandFound_Layout from "./Layout/LostandFound_Layout";
import Item_create from "./Update/Item_create";
import UpdateandAnnounce from "./Pages/UpdateandAnnounce";

import Announceandalert_Layout from "./Layout/Announceandalert_Layout";
import Universityupdatecreate from "./Update/Universityupdatecreate";
import AleartCreate from "./Update/AleartCreate";
import Location from "./Pages/Location";
import Vrexp from "./Pages/Vrexp";
import Emailme from "./Pages/Emailme";

const router: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verification",
        element: <Varification />,
      },
    ],
  },
  {
    path: "/home",
    element: <Main_Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/student/profile",
        element: <Student />,
      },
      {
        path: "/home/profile/update",
        element: <ProfileUpdate />,
      },
    ],
  },
  {
    path: "/canteen",
    element: <Canteen_Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/canteen",
        element: <Canteen_Home />,
      },
      {
        path: "/canteen/restaurant/:id",
        element: <Canteen_Details />,
      },
      {
        path: "/canteen/update/:id",
        element: <Canteen_Update />,
      },
      {
        path: "/canteen/restaurantcreate/:userId",
        element: <Restaurant_Create />,
      },
    ],
  },
  {
    path: "/event",
    element: <Event_Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/event",
        element: <Event_Home />,
      },
      {
        path: "/event/club/:id",
        element: <Club_Details />,
      },
      {
        path: "/event/update/:id",
        element: <Club_update />,
      },
      {
        path: "/event/clubcreate",
        element: <Club_create />,
      },
      {
        path: "/event/create/:clubId",
        element: <Event_create />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard_Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/dashboard",
        element: <Student_Dashboard />,
      },
      {
        path: "/dashboard/admin",
        element: <Admin_Dashboard />,
      },
    ],
  },
  {
    path: "/class",
    element: <Class_Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/class",
        element: <Facultypage />,
      },
      {
        path: "/class/:id",
        element: <Course />,
      },
      {
        path: "/class/course_details/:id",
        element: <CourseDetails />,
      },
      {
        path: "/class/faculty/create",
        element: <FacultyCreate />,
      },
      {
        path: "/class/course/create/:facultyId", // Route now expects a facultyId
        element: <CourseCreate />,
      },
      {
        path: "/class/course/addclass/:courseId",
        element: <AddClass />,
      },
      {
        path: "/class/course/addexam/:courseId",
        element: <AddExam />,
      },
      {
        path: "/class/course/addassignment/:courseId",
        element: <AddAssignment />,
      },
    ],
  },
  {
    path: "/bus",
    element: <BusLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/bus",
        element: <Bus_Home />,
      },
      {
        path: "/bus/:id",
        element: <Bus_Details />,
      },
      {
        path: "/bus/create",
        element: <Bus_Create />,
      },
      {
        path: "/bus/update/:id",
        element: <Route_Create />,
      },
      {
        path: "/bus/announcement/:id",
        element: <AnnouncementCreate />,
      },
    ],
  },
  {
    path:"/lostandfound",
    element: <LostandFound_Layout/>,
    errorElement: <ErrorElement/>,
    children: [
      {
        path : "/lostandfound",
        element : <Lostandfound/>
      },
      {
        path : "/lostandfound/create",
        element: <Item_create/>

      }
    ]

  },
  {
    path: "/updateandannounce",
    element : <Announceandalert_Layout/>,
    errorElement: <ErrorElement/>,
    children:[
      {
        path: "/updateandannounce",
        element : <UpdateandAnnounce/>,
      },
      {
        path : "/updateandannounce/create",
        element: <Universityupdatecreate/>
      },{
        path: "/updateandannounce/alert/create",
        element : <AleartCreate/>
      }

    ]
  },{
    path: "/location",
    element : <Location/>,
    errorElement : <ErrorElement/>
  },
  {
    path : "/vrexp",
    element : <Vrexp/>,
    errorElement: <ErrorElement/>
  },{
    path : "/mail/:facultyId",
    element : <Emailme/>
  }
];

const browserRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <StudentProvider>
          <RouterProvider router={browserRouter} />
        </StudentProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
