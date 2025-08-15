import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

export const router = createBrowserRouter([
  {
    element: React.createElement(AppLayout),
    children: [
      {
        path: "/",
        element: React.createElement(HomePage),
      },
      {
        path: "/auth/login",
        element: React.createElement(Login),
      },
      {
        path: "/auth/signup",
        element: React.createElement(Signup),
      },
    ],
  },
]);
