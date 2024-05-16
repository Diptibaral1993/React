import React, { useState } from "react";
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
import Branch from "./Pages/Branch";

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
import BranchList from "./Pages/ListPages/BranchList";
import StockList from "./Pages/ListPages/StockList";
import AllocationList from "./Pages/ListPages/AllocationList";
import DistributionList from "./Pages/ListPages/DistributionList";
import StockReport from "./Mis/StockReport";
import AllocationExecutiveWise from "../src/Mis/AllocationExecutiveWise";
import DistributionDealerWise from "./Mis/DistributionDealerWise";
import ExItem from "./Pages/Executive/ExItem";
import ExDealer from "./Pages/Executive/ExDealer";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },

      //Company Route

      { path: "branch", element: <BranchList /> },
      { path: "branch/add", element: <Branch /> },
      { path: "branch/add/:id", element: <Branch /> },

      //Godown Route
      { path: "godown/add", element: <Godown /> },
      { path: "godown", element: <GoDownList /> },
      { path: "location", element: <Location /> },
      { path: "department", element: <Department /> },
      { path: "designation", element: <Designation /> },

      //Stock Route
      { path: "stock", element: <StockList /> },
      { path: "stock/add", element: <Stock /> },
      { path: "stock/allocation", element: <AllocationList /> },
      { path: "stock/distribution", element: <DistributionList /> },
      { path: "stock/allocation/add", element: <Stockallocation /> },
      { path: "stock/allocation/add/:id", element: <Stockallocation /> },
      { path: "stock/distribution/add", element: <Stockdistribution /> },

      //user Route
      { path: "user", element: <UserList /> },
      { path: "user/add", element: <User /> },

      //item route
      // { path: "item", element: <ItemList /> },
      {
        path: "item",
        element:
          JSON.parse(localStorage.getItem("userinfo"))[0].designation != 8 ? (
            <Item />
          ) : (
            <ExItem />
          ),
      },

      //Dealers Route
      {
        path: "dealer",
        element:
          JSON.parse(localStorage.getItem("userinfo"))[0].designation != 8 ? (
            <DealerList />
          ) : (
            <ExDealer />
          ),
      },
      { path: "dealer/add", element: <Dealer /> },
      { path: "dealer/mapping", element: <DealerMapping /> },

      //MIS Route
      { path: "mis/stock", element: <StockReport /> },
      { path: "mis/allocation", element: <AllocationExecutiveWise /> },
      { path: "mis/distribution", element: <DistributionDealerWise /> },
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
