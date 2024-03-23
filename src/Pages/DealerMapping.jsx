import React from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
function DealerMapping() {
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
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Dealer">
            <Form.Select required>
              <option value="">Select Dealer</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Dealer !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Company">
            <Form.Select required>
              <option value="">Select Company</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Company!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="GoDown">
            <Form.Select required>
              <option value="">Select GoDown</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select GoDown !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Sale Executive">
            <Form.Select required>
              <option value="">Select Executive</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Sales Executive !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Quantity">
            <Form.Select required>
              <option value="">Select Quantity</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Quantity !!
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

export default DealerMapping;
