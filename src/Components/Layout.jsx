import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import { Outlet, redirect } from "react-router-dom";
import { getMenus } from "../Redux/Slice/menuSlice";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBabyCarriage, FaPowerOff } from "react-icons/fa";
import { clearStateLogin } from "../Redux/Slice/loginSlice";

function Layout() {
  const [routingHeader, setRoutingHeader] = useState("Dashboard");
  const dispatch = useDispatch();
  const menulist = useSelector((state) => state.menu);
  const navigate = useNavigate();

  const apiResponseUserinfo = useSelector((state) => state.userinfo);

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
      <Navbar
        key="false"
        expand="false"
        className="bg-body-tertiary mb-3"
        sticky="top"
      >
        <Container
          fluid
          style={{ backgroundColor: "cornflowerblue", padding: "10px" }}
        >
          <Col xs={1} sm={1} md={1}>
            <Navbar.Toggle
              className="bg-light"
              aria-controls="offcanvasNavbar-expand-false"
            />
          </Col>
          <Col xs={10} sm={10} md={10}>
            <Navbar.Brand
              style={{
                color: "white",
                fontWeight: "bolder",
                fontSize: "xx-large",
              }}
            >
              Dn-Peripherial
            </Navbar.Brand>
          </Col>
          <Col
            xs={1}
            sm={1}
            md={1}
            style={{
              color: "white",
              fontSize: "30px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <a href="/login">
              <FaPowerOff />
            </a>
          </Col>

          <Navbar.Offcanvas
            animation="false"
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="start"
            scroll="true"
            style={{ backgroundColor: "cornflowerblue", width: "18em" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                Welcome
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-end flex-grow-1 pe-3"
                style={{ marginRight: "-33px", marginLeft: "25px" }}
              >
                {menulist?.menus?.map((item) => (
                  <Nav.Link
                    as={Link}
                    key={item.id}
                    to={item.path}
                    onClick={() => setRoutingHeader(item.headername)}
                    style={{
                      backgroundColor: "aliceblue",
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      marginBottom: "5px",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                  >
                    <img src={item.icon} />
                    {item.menuname}
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Card className="text-center" style={{ margin: "1em" }}>
        <Card.Header
          style={{
            backgroundColor: "darkseagreen",
            color: "white",
            fontWeight: "bolder",
            fontSize: "x-large",
          }}
        >
          {routingHeader}
        </Card.Header>
        <Card.Body
          style={{
            backgroundColor: "aliceblue",
          }}
        >
          <Outlet />
        </Card.Body>
      </Card>
    </>
  );
}

export default Layout;
