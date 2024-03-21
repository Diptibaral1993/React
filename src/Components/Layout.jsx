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
import ListGroup from "react-bootstrap/ListGroup";

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
        <Container
          fluid
          style={{ backgroundColor: "cornflowerblue", padding: "10px" }}
        >
          <Row>
            <Col xs={4} sm={4} md={4}>
              <Navbar.Toggle
                className="bg-light"
                aria-controls="offcanvasNavbar-expand-false"
              />
            </Col>
            <Col xs={8} sm={8} md={8}>
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
          </Row>

          <Navbar.Offcanvas
            animation="false"
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="start"
            scroll="true"
            style={{ backgroundColor: "cornflowerblue" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                Welcome
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
              {/* <ListGroup as="ul" style={{ textAlign: "center" }}>
                <ListGroup.Item
                  as="li"
                  style={{
                    marginLeft: "-20px",
                    marginRight: "-20px",
                    marginBottom: "10px",
                    backgroundColor: "bisque",
                  }}
                >
                  Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  style={{
                    marginLeft: "-20px",
                    marginRight: "-20px",
                    marginBottom: "10px",
                    backgroundColor: "bisque",
                  }}
                >
                  Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  style={{
                    marginLeft: "-20px",
                    marginRight: "-20px",
                    marginBottom: "10px",
                    backgroundColor: "bisque",
                  }}
                >
                  Cras justo odio
                </ListGroup.Item>
              </ListGroup> */}
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
