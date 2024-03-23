import React from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
function Stockdistribution() {
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
          <FloatingLabel label="Item">
            <Form.Select required>
              <option value="">Select Item</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Item !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Quantity">
            <Form.Control required placeholder="Quantity" />
            <Form.Control.Feedback type="invalid">
              Enter Quantity!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Dealer">
            <Form.Select required>
              <option value="">Select Dealer</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Dealer!!
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

export default Stockdistribution;
