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
import Login from "./Authentication/Auth_component/Login";
import SignUp from "./Authentication/Auth_component/SignUp";
import Varification from "./Authentication/Auth_component/Varification";
import Main_Layout from "./Layout/Main_Layout";
import Home from "./Pages/Home/Home";

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
];

const browserRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>
);
