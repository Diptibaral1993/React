import React from "react";
import { Button, Form, Row, Col, FloatingLabel, Table } from "react-bootstrap";
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
  const [validated, setValidated] = useState(false);
  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
    }
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col md={5} sm={6} xs={12}>
          <Form.Group as={Col} md={12} sm={6} xs={12} className="mb-3">
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
        </Col>
        <Col md={7} sm={6} xs={12}>
          <Table responsive="sm">
            <thead>
              <tr>
                <th></th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </Col>
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
