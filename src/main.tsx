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
];

const browserRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={browserRouter} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
