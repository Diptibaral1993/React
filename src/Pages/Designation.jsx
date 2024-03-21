import React from "react";
import { useState } from "react";
import { Button, Form, Col, Row, FloatingLabel } from "react-bootstrap";
function Designation() {
  const [designation, setDesignation] = useState({
    id: 0,
    name: "",
    departmentid: 0,
    createdby: 0,
    createddt: "",
    updatedby: 0,
    updateddt: "",
    status: 1,
  });
  return (
    <Form>
      <Row>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Department">
            <Form.Select
              required
              value={designation.departmentid}
              onChange={(e) => {
                setDesignation({
                  ...designation,
                  departmentid: e.target.value,
                });
              }}
            >
              <option value="">Select Department</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Department !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Designation Name">
            <Form.Control
              required
              placeholder="Designation Name"
              value={designation.name}
              onChange={(e) =>
                setDesignation({ ...designation, name: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Enter Designation Name !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button variant="outline-success" type="submit" className="mt-2">
        Submit
      </Button>
      <Button variant="outline-danger" type="submit" className="mt-2">
        Close
      </Button>
    </Form>
  );
}

export default Designation;
