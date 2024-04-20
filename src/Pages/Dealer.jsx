import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import {
  getArea,
  getCity,
  getCountry,
  getState,
  getPincode,
} from "../Redux/Slice/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import { getGodownbyCompany } from "../Redux/Slice/GodownSlice";
import { getUsers } from "../Redux/Slice/userSlice";
import { getCompanies } from "../Redux/Slice/companySlice";
import { addDealer, clearStateDealer } from "../Redux/Slice/dealerSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import { useNavigate } from "react-router-dom";

function Dealer() {
  const [validated, setValidated] = useState(false);
  const apiCompany = useSelector((state) => state.company);
  const apiGodown = useSelector((state) => state.godown);
  const apiUser = useSelector((state) => state.user);
  const apiLocation = useSelector((state) => state.location);
  const apiResponse = useSelector((state) => state.dealer);
  const dispatch = useDispatch();

  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  const navigate = useNavigate();

  const [dealer, setDealer] = useState({
    id: 0,
    name: "",
    phone: "",
    email: "",
    gstnumber: "",
    pannumber: "",
    company: "",
    godown: "",
    salesperson: "",
    country: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    createdby: 0,
    createddt: formatDate(),
    updatedby: 0,
    updateddt: "",
    status: 1,
  });

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      dispatch(addDealer(dealer));
      setDealer({
        ...dealer,
        id: 0,
        name: "",
        phone: "",
        email: "",
        gstnumber: "",
        pannumber: "",
        company: "",
        godown: "",
        salesperson: "",
        country: "",
        state: "",
        city: "",
        area: "",
        pincode: "",
        createdby: 0,
        createddt: formatDate(),
        updatedby: 0,
        updateddt: "",
        status: 1,
      });
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      setTimeout(() => {
        dispatch(clearStateDealer());
      }, 3000);
    }
  }, [apiResponse]);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCompanies());
  }, []);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Name">
              <Form.Control
                required
                placeholder="Name"
                value={dealer.name}
                onChange={(e) => setDealer({ ...dealer, name: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                Enter Dealer Name!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Phone">
              <Form.Control
                required
                placeholder="Phone"
                value={dealer.phone}
                onChange={(e) =>
                  setDealer({ ...dealer, phone: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Enter Dealer Phone!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Email">
              <Form.Control
                required
                placeholder="Email"
                value={dealer.email}
                onChange={(e) =>
                  setDealer({ ...dealer, email: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Enter Email!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="GST Number">
              <Form.Control
                required
                placeholder="GST Number"
                value={dealer.gstnumber}
                onChange={(e) =>
                  setDealer({ ...dealer, gstnumber: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Enter GST Number!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Pan Number">
              <Form.Control
                required
                placeholder="Pan Number"
                value={dealer.pannumber}
                onChange={(e) =>
                  setDealer({ ...dealer, pannumber: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Enter Pan Number!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Company">
              <Form.Select
                required
                value={dealer.company}
                onChange={(e) => {
                  setDealer({ ...dealer, company: e.target.value });
                  dispatch(getGodownbyCompany(e.target.value));
                }}
              >
                <option value="">Select Company</option>
                {apiCompany.data.map((item, index) => (
                  <option value={item.id} key={index}>
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
            <FloatingLabel label="Godown">
              <Form.Select
                required
                value={dealer.godown}
                onChange={(e) => {
                  setDealer({ ...dealer, godown: e.target.value });
                  dispatch(getUsers(e.target.value));
                }}
              >
                <option value="">Select Godown</option>
                {apiGodown.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Godown !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Sales Person">
              <Form.Select
                required
                value={dealer.salesperson}
                onChange={(e) =>
                  setDealer({ ...dealer, salesperson: e.target.value })
                }
              >
                <option value="">Select Sales Person</option>
                {apiUser.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select SalesPerson !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Country">
              <Form.Select
                required
                value={dealer.country}
                onChange={(e) => {
                  setDealer({ ...dealer, country: e.target.value });
                  dispatch(getState(e.target.value));
                }}
              >
                <option value="">Select Country</option>
                {apiLocation.Gcountry.map((item, index) => (
                  <option value={item.id} key={index}>
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
                value={dealer.state}
                onChange={(e) => {
                  setDealer({ ...dealer, state: e.target.value });
                  dispatch(getCity(e.target.value));
                }}
              >
                <option value="">Select State</option>
                {apiLocation.Gstate.map((item, index) => (
                  <option value={item.id} key={index}>
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
                value={dealer.city}
                onChange={(e) => {
                  setDealer({ ...dealer, city: e.target.value });
                  dispatch(getArea(e.target.value));
                }}
              >
                <option value="">Select City</option>
                {apiLocation.Gcity.map((item, index) => (
                  <option value={item.id} key={index}>
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
                value={dealer.area}
                onChange={(e) => {
                  setDealer({ ...dealer, area: e.target.value });
                  dispatch(getPincode(e.target.value));
                }}
              >
                <option value="">Select Area</option>
                {apiLocation.Garea.map((item, index) => (
                  <option value={item.id} key={index}>
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
            <FloatingLabel label="PinCode">
              <Form.Select
                required
                value={dealer.pincode}
                onChange={(e) =>
                  setDealer({ ...dealer, pincode: e.target.value })
                }
              >
                <option value="">Select PinCode</option>
                {apiLocation.Gpincode.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.description}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select PinCode !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Button
          variant="outline-success"
          type="submit"
          className="mt-2"
          disabled={!apiResponse.loading && false}
        >
          Submit
        </Button>{" "}
        <Button
          variant="outline-danger"
          type="button"
          className="mt-2"
          onClick={() => navigate("/dealer")}
        >
          Close
        </Button>{" "}
      </Form>
      {apiResponse.loading && <Loader />}
      {apiResponse.response != "" && (
        <Toastcomponent
          color={apiResponse.response}
          msg={apiResponse.msg}
          header="Company"
        />
      )}
    </>
  );
}

export default Dealer;
