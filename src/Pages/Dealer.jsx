import React from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
function Dealer() {
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
          <FloatingLabel label="Name">
            <Form.Control required placeholder="Name" />
            <Form.Control.Feedback type="invalid">
              Enter Dealer Name!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Phone">
            <Form.Control required placeholder="Phone" />
            <Form.Control.Feedback type="invalid">
              Enter Dealer Phone!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Email">
            <Form.Control required placeholder="Email" />
            <Form.Control.Feedback type="invalid">
              Enter Email!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Country">
            <Form.Select required>
              <option value="">Select Country</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Country !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="State">
            <Form.Select required>
              <option value="">Select State</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select State !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="City">
            <Form.Select required>
              <option value="">Select City</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select City !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Area">
            <Form.Select required>
              <option value="">Select Area</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Area !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="PinCode">
            <Form.Select required>
              <option value="">Select PinCode</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select PinCode !!
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

export default Dealer;
