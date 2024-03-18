import React, { useEffect, useState } from "react";
import "../assets/Style/Style.css";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import $ from "jquery";
import { FaAlignJustify, FaBox, FaToolbox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMenus } from "../Redux/Slice/menuSlice";

function Menu2() {
  const [routingHeader, setRoutingHeader] = useState("Dashboard");
  const [sidebarToggle, setSidebarToggle] = useState("true");
  const [listItems, setListItems] = useState([]);

  const dispatch = useDispatch();
  const menulist = useSelector((state) => state.menu);

  const togllesidebar = () => {
    $("#sidebar").toggleClass("active");
    handleToggle();
  };

  const handleToggle = () => {
    if (sidebarToggle == "true") {
      setSidebarToggle("false");
    } else {
      setSidebarToggle("true");
    }
  };

  const handleMenu = () => {
    dispatch(getMenus());
  };

  useEffect(() => {
    if (menulist.menus.length > 0) {
      setListItems(menulist.menus);
    }
  }, [menulist]);

  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="custom-menu">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary"
              onClick={togllesidebar}
            >
              {<FaAlignJustify style={{ margin: "-7px -4px 3px" }} />}
            </button>
          </div>
          <div className="img bg-wrap text-center py-4">
            <div className="user-logo">
              <div className="img"></div>
              <h3>Catriona Henderson</h3>
            </div>
          </div>
          <ul className="list-unstyled components mb-5">
            {listItems?.map((item) => {
              <li key={item.id}>{item.id}</li>;
            })}

            {}
            <li className={routingHeader == "Dashboard" ? "bg-secondary" : ""}>
              <Link to="/" onClick={() => setRoutingHeader("Dashboard")}>
                <FaBox /> Dashboard
              </Link>
            </li>
            <li className={routingHeader == "Company" ? "bg-secondary" : ""}>
              <Link to="company" onClick={() => setRoutingHeader("Company")}>
                <FaToolbox /> Company
              </Link>
            </li>
          </ul>
        </nav>

        <div id="content" className="p-4 p-md-5 pt-5">
          <Header name={routingHeader} />

          <button onClick={handleMenu}>Click</button>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Menu2;
