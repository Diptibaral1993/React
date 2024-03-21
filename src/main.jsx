import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  RouterProvider,
  BrowserRouter,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import User from "./Pages/User";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Company from "./Pages/Company";

import Godown from "./Pages/Godown";
import Location from "./Pages/Location";
import Department from "./Pages/Department";
import Designation from "./Pages/Designation";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "user", element: <User /> },
      { path: "company", element: <Company /> },
      { path: "godown", element: <Godown /> },
      { path: "location", element: <Location /> },
      { path: "department", element: <Department /> },
      { path: "designation", element: <Designation /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
