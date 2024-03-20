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
    handleMenu();
  }, []);

  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          {/* <div className="custom-menu">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary"
              onClick={togllesidebar}
            >
              {<FaAlignJustify style={{ margin: "-7px -4px 3px" }} />}
            </button>
          </div> */}
          <div className="img bg-wrap text-center py-4">
            <div className="user-logo">
              <div className="img"></div>
              <h3>Catriona Henderson</h3>
            </div>
          </div>
          <ul className="list-unstyled components mb-5">
            {menulist?.menus?.map((item) => (
              <li
                key={item.id}
                className={
                  routingHeader == item.headername ? "bg-secondary" : ""
                }
              >
                <Link
                  to={item.path}
                  onClick={() => setRoutingHeader(item.headername)}
                >
                  <FaBox /> {item.menuname}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div id="content">
          <Header name={routingHeader} toggle={togllesidebar} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Menu2;
