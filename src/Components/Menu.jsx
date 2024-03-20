import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import { getMenus } from "../Redux/Slice/menuSlice";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const [routingHeader, setRoutingHeader] = useState("Dashboard");

  const menulist = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const handleMenu = () => {
    dispatch(getMenus());
  };

  useEffect(() => {
    handleMenu();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        position: "relative",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            DnPeripherial
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {menulist?.menus?.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setRoutingHeader(item.headername)}
              >
                <CDBSidebarMenuItem icon="columns">
                  {item.menuname}
                </CDBSidebarMenuItem>
              </NavLink>
            ))}
            {/* <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/company" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Company</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/godown" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Godown</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <div style={{ overflow: "scroll", maxHeight: "100vh" }}>
        <Header name={routingHeader} />
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
