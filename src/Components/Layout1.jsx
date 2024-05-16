import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import { RiAdminLine } from "react-icons/ri";
import { CgOrganisation } from "react-icons/cg";
import * as Io5 from "react-icons/io5";
import "../assets/Style/Navbar.css";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { getMenus } from "../Redux/Slice/menuSlice";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { SiStatuspage } from "react-icons/si";
function layout1() {
  const [routingHeader, setRoutingHeader] = useState("Dashboard");
  const [isExecutive, setIsExecutive] = useState(false);
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

      const prof = JSON.parse(localStorage.getItem("userinfo"));
      if (prof[0].department == 10 && prof[0].designation == 8) {
        setIsExecutive(true);
      }
    }
  }, []);

  const [submenuOpen, setSubmenuOpen] = useState({
    one: false,
    two: false,
    three: false,
  });

  // Function to toggle submenu visibility
  const toggleSubmenu = () => {
    setSubmenuOpen({
      ...submenuOpen,
      one: submenuOpen.one ? false : true,
      two: false,
    });
  };

  const toggleSubmenu2 = () => {
    setSubmenuOpen({
      ...submenuOpen,
      two: submenuOpen.two ? false : true,
      one: false,
    });
  };

  const toggleSubmenu3 = () => {
    setSubmenuOpen({
      ...submenuOpen,
      three: submenuOpen.three ? false : true,
      two: false,
      one: false,
    });
  };
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
            {/* <Navbar.Brand className="gradient-text">
              Dn-Peripherial
            </Navbar.Brand> */}
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
              <Navbar.Brand className="gradient-text">
                Dn-Peripherial
              </Navbar.Brand>

              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>

            {/* {menulist?.menus?.map((item) => (
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
            ))} */}

            <li className="nav-text">
              <Nav.Link
                as={Link}
                to={"/"}
                onClick={() => setHeader("DASHBOARD")}
              >
                <AiIcons.AiFillHome />
                <span>DASHBOARD</span>
              </Nav.Link>
            </li>
            <li className="nav-text" hidden={isExecutive}>
              <a className="nav-link" onClick={toggleSubmenu}>
                <RiAdminLine />
                <span>ADMINISTRATION</span>
              </a>
            </li>
            {submenuOpen.one && (
              <ul style={{ paddingLeft: "35px !important" }}>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/branch"}
                    onClick={() => setHeader("BRANCH")}
                  >
                    <CgOrganisation />
                    <a href="#">BRANCH</a>
                  </Nav.Link>
                </li>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/location"}
                    onClick={() => setHeader("LOCATION")}
                  >
                    <FaIcons.FaMapMarkerAlt />
                    <a href="#">LOCATION</a>
                  </Nav.Link>
                </li>

                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/department"}
                    onClick={() => setHeader("DEPARTMENT")}
                  >
                    <FcIcons.FcDepartment />
                    <a href="#">DEPARTMENT</a>
                  </Nav.Link>
                </li>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/designation"}
                    onClick={() => setHeader("DESIGNATION")}
                  >
                    <FaIcons.FaUserTie />
                    <a href="#">DESIGNATION</a>
                  </Nav.Link>
                </li>
              </ul>
            )}
            <li className="nav-text">
              <a className="nav-link" onClick={toggleSubmenu2}>
                <SiStatuspage />
                <span>MASTERS</span>
              </a>
            </li>
            {submenuOpen.two && (
              <ul style={{ paddingLeft: "35px !important" }}>
                <li className="nav-text" hidden={isExecutive}>
                  <Nav.Link
                    as={Link}
                    to={"/user"}
                    onClick={() => setHeader("EMPLOYEE MASTER")}
                  >
                    <FaIcons.FaUsers />
                    <a href="#">EMPLOYEE</a>
                  </Nav.Link>
                </li>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/item"}
                    onClick={() => setHeader("ITEM MASTER")}
                  >
                    <Io5.IoBagHandleSharp />
                    <a href="#">ITEM</a>
                  </Nav.Link>
                </li>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/dealer"}
                    onClick={() => setHeader("DEALER MASTER")}
                  >
                    <FaIcons.FaHandshake />
                    <a href="#">DEALER</a>
                  </Nav.Link>
                </li>
                <li className="nav-text" hidden={isExecutive}>
                  <Nav.Link
                    as={Link}
                    to={"/godown"}
                    onClick={() => setHeader("WAREHOUSE MASTER")}
                  >
                    <FaIcons.FaWarehouse />
                    <a href="#">WAREHOUSE</a>
                  </Nav.Link>
                </li>
              </ul>
            )}
            <li className="nav-text">
              <Nav.Link
                as={Link}
                to={"/stock"}
                onClick={() => setHeader("STOCK")}
              >
                <AiIcons.AiOutlineStock />
                <span>STOCK</span>
              </Nav.Link>
            </li>
            <li className="nav-text">
              <Nav.Link
                as={Link}
                to={"/stock/allocation"}
                onClick={() => setHeader("ALLOCATION")}
              >
                <FcIcons.FcParallelTasks />
                <span>ALLOCATION</span>
              </Nav.Link>
            </li>
            <li className="nav-text">
              <Nav.Link
                as={Link}
                to={"/stock/distribution"}
                onClick={() => setHeader("DISTRIBUTION")}
              >
                <FaIcons.FaShippingFast />
                <span>DISTRIBUTION</span>
              </Nav.Link>
            </li>
            <li className="nav-text" hidden={isExecutive}>
              <a className="nav-link" onClick={toggleSubmenu3}>
                <FaIcons.FaBookOpen />
                <span>MIS</span>
              </a>
            </li>

            {submenuOpen.three && (
              <ul style={{ paddingLeft: "35px !important" }}>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/mis/stock"}
                    onClick={() => setHeader("STOCK REPORT")}
                  >
                    <FaIcons.FaUsers />
                    <a href="#">STOCK</a>
                  </Nav.Link>
                </li>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/mis/allocation"}
                    onClick={() => setHeader("ALLOCATION BY EXECUTIVE")}
                  >
                    <FaIcons.FaUsers />
                    <a href="#">ALLOCATION</a>
                  </Nav.Link>
                </li>
                <li className="nav-text">
                  <Nav.Link
                    as={Link}
                    to={"/mis/distribution"}
                    onClick={() => setHeader("DISTRIBUTION BY DEALER")}
                  >
                    <FaIcons.FaUsers />
                    <a href="#">DISTRIBUTION</a>
                  </Nav.Link>
                </li>
              </ul>
            )}
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
