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
    ],
  },
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
