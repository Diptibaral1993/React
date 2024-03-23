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
import Stock from "./Pages/Stock";
import Item from "./Pages/Item";
import Stockallocation from "./Pages/Stockallocation";
import Stockdistribution from "./Pages/Stockdistribution";
import UserList from "./Pages/ListPages/UserList";
import GoDownList from "./Pages/ListPages/GodownList";
import ItemList from "./Pages/ListPages/ItemList";
import DealerList from "./Pages/ListPages/DealerList";
import Dealer from "./Pages/Dealer";
import DealerMapping from "./Pages/DealerMapping";
import CompanyList from "./Pages/ListPages/CompanyList";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },

      //Company Route
      { path: "company/add", element: <Company /> },
      { path: "company", element: <CompanyList /> },

      //Godown Route
      { path: "godown/add", element: <Godown /> },
      { path: "godown", element: <GoDownList /> },
      { path: "location", element: <Location /> },
      { path: "department", element: <Department /> },
      { path: "designation", element: <Designation /> },

      //Stock Route
      { path: "stock", element: <Stock /> },
      { path: "stock/allocation", element: <Stockallocation /> },
      { path: "stock/distribution", element: <Stockdistribution /> },

      //user Route
      { path: "user", element: <UserList /> },
      { path: "user/add", element: <User /> },

      //item route
      { path: "item", element: <ItemList /> },
      { path: "item/add", element: <Item /> },

      //Dealers Route
      { path: "dealer", element: <DealerList /> },
      { path: "dealer/add", element: <Dealer /> },
      { path: "dealer/mapping", element: <DealerMapping /> },
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
