import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArea,
  getCity,
  getCountry,
  getState,
  getPincode,
} from "../Redux/Slice/locationSlice.js";
import Button from "react-bootstrap/Button";
import {
  addCompany,
  clearStateCompany,
  getCompanybyid,
  updateCompany,
} from "../Redux/Slice/companySlice.js";
import Toastcomponent from "../Components/Toastcomponent.jsx";
import Loader from "../Components/Loader.jsx";
import { useNavigate, useParams } from "react-router-dom";

function Company() {
  const [company, setCompany] = useState({
    id: 0,
    companyname: "",
    contactperson: "",
    phone: "",
    email: "",
    gstnumber: "",
    pannumber: "",
    country: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    status: 1,
  });

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const apiResponse = useSelector((state) => state.company);
  const apiLocationResponse = useSelector((state) => state.location);

  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (isEdit) {
        dispatch(updateCompany(company));
        setValidated(false);
        navigate("/branch");
      } else {
        dispatch(addCompany(company));
        setValidated(false);
      }
      setCompany({
        id: 0,
        companyname: "",
        contactperson: "",
        phone: "",
        email: "",
        gstnumber: "",
        pannumber: "",
        country: "",
        state: "",
        city: "",
        area: "",
        pincode: "",
        status: 1,
      });
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      setTimeout(() => {
        dispatch(clearStateCompany());
      }, 3000);
    }

    if (apiResponse.editdata.length != 0) {
      setCompany({
        id: id,
        companyname: apiResponse.editdata[0].companyname,
        contactperson: apiResponse.editdata[0].contactperson,
        phone: apiResponse.editdata[0].phone,
        email: apiResponse.editdata[0].email,
        gstnumber: apiResponse.editdata[0].gstnumber,
        pannumber: apiResponse.editdata[0].pannumber,
        country: apiResponse.editdata[0].country,
        state: apiResponse.editdata[0].state,
        city: apiResponse.editdata[0].city,
        area: apiResponse.editdata[0].area,
        pincode: apiResponse.editdata[0].pincode,
        status: apiResponse.editdata[0].status,
      });
      dispatch(getState(apiResponse.editdata[0].country));
      dispatch(getCity(apiResponse.editdata[0].state));
      dispatch(getArea(apiResponse.editdata[0].city));
      dispatch(getPincode(apiResponse.editdata[0].area));

      setIsEdit(true);
    }
  }, [apiResponse]);

  useEffect(() => {
    if (company.companyname == "") {
      dispatch(clearStateCompany());
    }
  }, [company]);

  const { id } = useParams();
  //On pgaeload Event Fire to Get Menu
  useEffect(() => {
    dispatch(getCountry());
  }, []);

  useEffect(() => {
    if (id != undefined && id != 0) {
      dispatch(getCompanybyid(id));
    }
  }, [id]);
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Branch Name">
              <Form.Control
                required
                placeholder="Branch Name"
                value={company.companyname}
                onChange={(e) => {
                  setCompany({ ...company, companyname: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Branch Name !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Contact Person">
              <Form.Control
                required
                placeholder="Contact Person"
                value={company.contactperson}
                onChange={(e) => {
                  setCompany({ ...company, contactperson: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter ContactPerson Name !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Phone">
              <Form.Control
                required
                placeholder="Phone"
                value={company.phone}
                onChange={(e) => {
                  setCompany({ ...company, phone: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Phone Number !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Email">
              <Form.Control
                required
                placeholder="Email"
                value={company.email}
                onChange={(e) => {
                  setCompany({ ...company, email: e.target.value });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Email !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="GST Number">
              <Form.Control
                placeholder="GST Number"
                value={company.gstnumber}
                onChange={(e) => {
                  setCompany({ ...company, gstnumber: e.target.value });
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Pan Number">
              <Form.Control
                placeholder="Pan Number"
                value={company.pannumber}
                onChange={(e) => {
                  setCompany({ ...company, pannumber: e.target.value });
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Country">
              <Form.Select
                required
                value={company.country}
                onChange={(e) => {
                  setCompany({ ...company, country: e.target.value });
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
                value={company.state}
                onChange={(e) => {
                  setCompany({ ...company, state: e.target.value });
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
                value={company.city}
                onChange={(e) => {
                  setCompany({ ...company, city: e.target.value });
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
                value={company.area}
                onChange={(e) => {
                  setCompany({ ...company, area: e.target.value });
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
                value={company.pincode}
                onChange={(e) => {
                  setCompany({ ...company, pincode: e.target.value });
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
        </Row>
        <Button variant="outline-success" type="submit" hidden={isEdit}>
          Submit
        </Button>{" "}
        <Button variant="outline-success" type="submit" hidden={!isEdit}>
          Update
        </Button>{" "}
        <Button
          variant="outline-danger"
          type="button"
          onClick={() => navigate("/branch")}
        >
          Close
        </Button>{" "}
      </Form>
      {apiResponse.loading && <Loader />}
      {apiLocationResponse.loading && <Loader />}
      {apiResponse.response != "" && (
        <Toastcomponent
          color={apiResponse.response}
          msg={apiResponse.msg}
          header="Branch"
        />
      )}
    </>
  );
}

export default Company;
