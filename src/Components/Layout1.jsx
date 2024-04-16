import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";
import { CgOrganisation } from "react-icons/cg";
import * as Io5 from "react-icons/io5";
import "../assets/Style/Navbar.css";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { getMenus } from "../Redux/Slice/menuSlice";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
function layout1() {
  const [routingHeader, setRoutingHeader] = useState("Dashboard");
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();

  const menulist = useSelector((state) => state.menu);

  const navigate = useNavigate();

  const apiResponseUserinfo = useSelector((state) => state.userinfo);

  const setHeader = (val) => {
    showSidebar();
    localStorage.setItem("headertext", val);
  };

  const getIcons = (key) => {
    switch (key) {
      case "DASHBOARD":
        return <AiIcons.AiFillHome />;
      case "COMPANY":
        return <CgOrganisation />;
      case "DEALER":
        return <FaIcons.FaHandshake />;
      case "DEPARTMENT":
        return <FcIcons.FcDepartment />;
      case "DESIGNATION":
        return <FaIcons.FaUserTie />;
      case "ITEMS":
        return <Io5.IoBagHandleSharp />;
      case "LOCATION":
        return <FaIcons.FaMapMarkerAlt />;
      case "WAREHOUSE":
        return <FaIcons.FaWarehouse />;
      case "STOCK":
        return <AiIcons.AiOutlineStock />;
      case "USERS":
        return <FaIcons.FaUsers />;
      case "ALLOCATION":
        return <FcIcons.FcParallelTasks />;
      case "DISTRIBUTION":
        return <FaIcons.FaShippingFast />;
      default:
        break;
    }
  };

  const handleMenu = () => {
    dispatch(getMenus());
  };

  useEffect(() => {
    const getstate = localStorage.getItem("userinfo");

    if (apiResponseUserinfo.userinfo == null) {
      navigate("/login");
    } else {
      handleMenu();
    }
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Col xs={1} sm={1} md={1}>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </Col>
          <Col xs={10} sm={10} md={10}>
            <Navbar.Brand className="gradient-text">
              Dn-Peripherial
            </Navbar.Brand>
          </Col>
          <Col
            xs={1}
            sm={1}
            md={1}
            style={{
              fontSize: "1.6rem",
              cursor: "pointer",
              textAlign: "center",
              marginLeft: "-1rem",
            }}
          >
            <a href="/login">
              <FaIcons.FaPowerOff style={{ color: "red" }} />
            </a>
          </Col>
        </div>
        <nav
          className={sidebar ? "nav-menu active" : "nav-menu"}
          style={{ zIndex: "999", overflowY: "scroll", scrollbarWidth: "none" }}
        >
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {menulist?.menus?.map((item) => (
              <li className="nav-text">
                <Nav.Link
                  as={Link}
                  key={item.id}
                  to={item.path}
                  onClick={() => setHeader(item.headername)}
                >
                  {getIcons(item.menuname)}
                  <span>{item.menuname}</span>
                </Nav.Link>
              </li>
            ))}

            {/* <li className="nav-text">
              <Link>
                <AiIcons.AiFillHome />
                <span>Home</span>
              </Link>
            </li> */}
          </ul>
        </nav>
        <Card className="text-center cust_card">
          <Card.Header
            style={{
              backgroundColor: "#7cc3ccdb",
              color: "white",
              fontWeight: "bolder",
              fontSize: "1.2rem",
            }}
          >
            {localStorage.getItem("headertext")}
          </Card.Header>
          <Card.Body
            style={{
              backgroundColor: "aliceblue",
            }}
          >
            <Outlet />
          </Card.Body>
        </Card>
      </IconContext.Provider>
    </>
  );
}

export default layout1;
