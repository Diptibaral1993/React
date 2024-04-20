import React, { useEffect } from "react";
import { Row, Form, Col, FloatingLabel, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Locationmodal from "../Components/Locationmodal";
import Toastcomponent from "../Components/Toastcomponent";
import Loader from "../Components/Loader";
import { clearStateLocation } from "../Redux/Slice/locationSlice";
import {
  getArea,
  getCity,
  getCountry,
  getState,
  getPincode,
} from "../Redux/Slice/locationSlice";

function Location() {
  const apiLocationResponse = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    country: 0,
    state: 0,
    city: 0,
    area: 0,
    pin: 0,
    coutryName: "",
    stateName: "",
    cityName: "",
    areaName: "",
    pinCode: "",
  });

  const [show, setShow] = useState({
    visible: false,
    header: "",
    reference: 0,
  });

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  useEffect(() => {
    if (apiLocationResponse.response != "") {
      switch (show.header) {
        case "Country":
          dispatch(getCountry());
          break;
        case "State":
          dispatch(getState(show.reference));
          break;
        case "City":
          dispatch(getCity(show.reference));
          break;
        case "Area":
          dispatch(getArea(show.reference));
          break;
        case "Pincode":
          dispatch(getPincode(show.reference));
          break;
        default:
          break;
      }
      setShow({ visible: false, header: "", reference: 0 });
    }

    if (apiLocationResponse.isSuccess) {
      setTimeout(() => {
        dispatch(clearStateLocation());
      }, 3000);
    }
  }, [apiLocationResponse]);

  return (
    <>
      <Row>
        <Form.Group
          as={Col}
          md={4}
          sm={6}
          xs={12}
          className="mb-3"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FloatingLabel
            label="Country"
            style={{ width: "-webkit-fill-available" }}
          >
            <Form.Select
              required
              value={location.country}
              onChange={(e) => {
                setLocation({ ...location, country: e.target.value });
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
          <Button
            variant="danger"
            onClick={() =>
              setShow({
                ...show,
                visible: true,
                header: "Country",
                reference: 0,
              })
            }
          >
            +
          </Button>{" "}
        </Form.Group>
        <Form.Group
          as={Col}
          md={4}
          sm={6}
          xs={12}
          className="mb-3"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FloatingLabel
            label="State"
            style={{ width: "-webkit-fill-available" }}
          >
            <Form.Select
              required
              value={location.state}
              onChange={(e) => {
                setLocation({ ...location, state: e.target.value });
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
          <Button
            variant="danger"
            onClick={() =>
              setShow({
                ...show,
                visible: true,
                header: "State",
                reference: location.country,
              })
            }
          >
            +
          </Button>{" "}
        </Form.Group>
        <Form.Group
          as={Col}
          md={4}
          sm={6}
          xs={12}
          className="mb-3"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FloatingLabel
            label="City"
            style={{ width: "-webkit-fill-available" }}
          >
            <Form.Select
              required
              value={location.city}
              onChange={(e) => {
                setLocation({ ...location, city: e.target.value });
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
          <Button
            variant="danger"
            onClick={() =>
              setShow({
                ...show,
                visible: true,
                header: "City",
                reference: location.state,
              })
            }
          >
            +
          </Button>{" "}
        </Form.Group>
        <Form.Group
          as={Col}
          md={4}
          sm={6}
          xs={12}
          className="mb-3"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FloatingLabel
            label="Area"
            style={{ width: "-webkit-fill-available" }}
          >
            <Form.Select
              required
              value={location.area}
              onChange={(e) => {
                setLocation({ ...location, area: e.target.value });
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
          <Button
            variant="danger"
            onClick={() =>
              setShow({
                ...show,
                visible: true,
                header: "Area",
                reference: location.city,
              })
            }
          >
            +
          </Button>{" "}
        </Form.Group>
        <Form.Group
          as={Col}
          md={4}
          sm={6}
          xs={12}
          className="mb-3"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <FloatingLabel
            label="Pincode"
            style={{ width: "-webkit-fill-available" }}
          >
            <Form.Select
              required
              value={location.pincode}
              onChange={(e) => {
                setLocation({ ...location, pincode: e.target.value });
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
          <Button
            variant="danger"
            onClick={() =>
              setShow({
                ...show,
                visible: true,
                header: "Pincode",
                reference: location.area,
              })
            }
          >
            +
          </Button>{" "}
        </Form.Group>
      </Row>
      {apiLocationResponse.loading && <Loader />}
      {apiLocationResponse.isSuccess && (
        <Toastcomponent
          color={apiLocationResponse.response}
          msg={apiLocationResponse.msg}
          header="Location"
        />
      )}

      <Locationmodal
        visible={show.visible}
        handler={() => setShow({ ...show, visible: false })}
        header={show.header}
        uplink={show.reference}
      />
    </>
  );
}

export default Location;
