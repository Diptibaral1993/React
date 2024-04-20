import React from "react";
import StockList from "../Pages/ListPages/StockList";
import AllocationList from "../Pages/ListPages/AllocationList";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import AttendanceList from "../Pages/ListPages/AttendanceList";
import OffersList from "../Pages/ListPages/OffersList";

function Home() {
  return (
    <>
      <Row>
        <Col md={6}>
          <Card style={{ display: "contents" }}>
            <CardHeader>
              <span>STOCK LIST</span>
            </CardHeader>
            <CardBody>
              <StockList />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ display: "contents" }}>
            <CardHeader>
              <span>ALLOTMENT LIST</span>
            </CardHeader>
            <CardBody>
              <AllocationList />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ display: "contents" }}>
            <CardHeader>
              <span>ATTENDANCE LIST</span>
            </CardHeader>
            <CardBody>
              <AttendanceList />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ display: "contents" }}>
            <CardHeader>
              <span>OFFERS LIST</span>
            </CardHeader>
            <CardBody>
              <OffersList />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
