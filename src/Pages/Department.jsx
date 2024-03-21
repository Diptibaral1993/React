import React from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
function Department() {
  const [department, setDepartment] = useState({
    id: 0,
    name: "",
    createdby: 1,
    createddt: "string",
    updatedby: 1,
    updateddt: "string",
    status: 1,
  });
  return (
    <Form>
      <Row>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Department Name">
            <Form.Control
              required
              placeholder="Department Name"
              value={department.name}
              onChange={(e) => {
                setDepartment({ ...department, name: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Department Name !!
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

export default Department;
