import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import { Outlet } from "react-router-dom";
import { getMenus } from "../Redux/Slice/menuSlice";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Layout() {
  const [routingHeader, setRoutingHeader] = useState("Dashboard");
  const dispatch = useDispatch();
  const menulist = useSelector((state) => state.menu);

  const handleMenu = () => {
    dispatch(getMenus());
  };

  useEffect(() => {
    handleMenu();
  }, []);
  return (
    <>
      <Navbar
        key="false"
        expand="false"
        className="bg-body-tertiary mb-3"
        sticky="top"
      >
        <Container fluid>
          <Row>
            <Col xs={4} sm={4} md={4}>
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
            </Col>
            <Col xs={8} sm={8} md={8}>
              <Navbar.Brand>Dn-Peripherial</Navbar.Brand>
            </Col>
          </Row>

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {menulist?.menus?.map((item) => (
                  <Nav.Link
                    as={Link}
                    key={item.id}
                    to={item.path}
                    onClick={() => setRoutingHeader(item.headername)}
                  >
                    {item.menuname}
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Card className="text-center">
        <Card.Header>{routingHeader}</Card.Header>
        <Card.Body>
          <Outlet />
        </Card.Body>
      </Card>
    </>
  );
}

export default Layout;
