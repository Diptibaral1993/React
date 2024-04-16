import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGodown, clearStateGodown } from "../Redux/Slice/GodownSlice";
import Loader from "../Components/Loader";
import { getCompanies } from "../Redux/Slice/companySlice";
import Toastcomponent from "../Components/Toastcomponent";
import {
  getArea,
  getCity,
  getCountry,
  getState,
  getPincode,
} from "../Redux/Slice/locationSlice";
import { useNavigate } from "react-router-dom";
function Godown() {
  const [godown, setGodown] = useState({
    id: 0,
    name: "",
    country: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    contactperson: "",
    phone: "",
    company: "",
    email: "",
    status: 1,
  });

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const apiResponse = useSelector((state) => state.godown);
  const apiLocationResponse = useSelector((state) => state.location);
  const apiCompanyresponse = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      dispatch(addGodown(godown));
      setValidated(false);
      setGodown({
        id: 0,
        name: "",
        country: "",
        state: "",
        city: "",
        area: "",
        pincode: "",
        contactperson: "",
        phone: "",
        company: "",
        email: "",
        status: 1,
      });
    }
  };

  useEffect(() => {
    if (godown.name == "") {
      dispatch(clearStateGodown());
    }
  }, [godown]);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCompanies());
  }, []);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Godown Name">
              <Form.Control
                required
                placeholder="Godown Name"
                value={godown.name}
                onChange={(e) => {
                  setGodown({ ...godown, name: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Godown Name !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Company">
              <Form.Select
                required
                value={godown.company}
                onChange={(e) =>
                  setGodown({ ...godown, company: e.target.value })
                }
              >
                <option value="">Select Company</option>
                {apiCompanyresponse.data.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.companyname}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Company !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Country">
              <Form.Select
                required
                value={godown.country}
                onChange={(e) => {
                  setGodown({ ...godown, country: e.target.value });
                  dispatch(getState(e.target.value));
                }}
              >
                <option value="">Select Country</option>
                {apiLocationResponse.Gcountry.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Country !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="State">
              <Form.Select
                required
                value={godown.state}
                onChange={(e) => {
                  setGodown({ ...godown, state: e.target.value });
                  dispatch(getCity(e.target.value));
                }}
              >
                <option value="">Select State</option>
                {apiLocationResponse?.Gstate.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select State !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="City">
              <Form.Select
                required
                value={godown.city}
                onChange={(e) => {
                  setGodown({ ...godown, city: e.target.value });
                  dispatch(getArea(e.target.value));
                }}
              >
                <option value="">Select City</option>
                {apiLocationResponse.Gcity.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select City !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Area">
              <Form.Select
                required
                value={godown.area}
                onChange={(e) => {
                  setGodown({ ...godown, area: e.target.value });
                  dispatch(getPincode(e.target.value));
                }}
              >
                <option value="">Select Area</option>
                {apiLocationResponse.Garea.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Area !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Pincode">
              <Form.Select
                required
                value={godown.pincode}
                onChange={(e) => {
                  setGodown({ ...godown, pincode: e.target.value });
                }}
              >
                <option value="">Select Pincode</option>
                {apiLocationResponse.Gpincode.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.description}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Pincode !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Contactperson Name">
              <Form.Control
                required
                placeholder="Contactperson Name"
                value={godown.contactperson}
                onChange={(e) => {
                  setGodown({ ...godown, contactperson: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Contactperson Name !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Phone Number">
              <Form.Control
                required
                placeholder="Phone Number"
                value={godown.phone}
                onChange={(e) => {
                  setGodown({ ...godown, phone: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Phone Number !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="E-mail">
              <Form.Control
                required
                placeholder="E-mail"
                value={godown.email}
                onChange={(e) => {
                  setGodown({ ...godown, email: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter E-mail !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Button variant="outline-success" type="submit">
          Submit
        </Button>{" "}
        <Button
          variant="outline-danger"
          type="button"
          onClick={() => navigate("/godown")}
        >
          Close
        </Button>{" "}
      </Form>
      {apiResponse.loading && <Loader />}
      {apiResponse.isSuccess && (
        <Toastcomponent
          color={apiResponse.response}
          msg={apiResponse.msg}
          header="Godown"
        />
      )}
    </>
  );
}

export default Godown;
