import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGodown } from "../Redux/Slice/GodownSlice";
import Loader from "../Components/Loader";
function Godown() {
  const [godown, setGodown] = useState({
    id: 0,
    name: "",
    country: 0,
    state: 0,
    city: 0,
    area: 0,
    pincode: 0,
    contactperson: "",
    phone: "",
    company: 0,
    email: "",
    status: 1,
  });

  const apiResponse = useSelector((state) => state.godown);
  const dispatch = useDispatch();

  return (
    <div className="card" style={{ margin: "0rem", padding: "0rem" }}>
      <div className="card-body" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">GodownName</label>
              <input
                value={godown.name}
                onChange={(e) => {
                  setGodown({ ...godown, name: e.target.value });
                }}
                className="form-control"
                type="text"
              ></input>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">Country</label>
              <select
                value={godown.country}
                onChange={(e) => {
                  setGodown({ ...godown, country: e.target.value });
                }}
                className="form-control"
                type="text"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">State</label>
              <select
                value={godown.state}
                onChange={(e) => {
                  setGodown({ ...godown, state: e.target.value });
                }}
                className="form-control"
                type="text"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">City</label>
              <select
                value={godown.city}
                onChange={(e) => {
                  setGodown({ ...godown, city: e.target.value });
                }}
                className="form-control"
                type="text"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">Area</label>
              <select
                value={godown.area}
                onChange={(e) => {
                  setGodown({ ...godown, area: e.target.value });
                }}
                className="form-control"
                type="text"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">PinCode</label>
              <select
                value={godown.pincode}
                onChange={(e) => {
                  setGodown({ ...godown, pincode: e.target.value });
                }}
                className="form-control"
                type="text"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">ContactPerson</label>
              <input
                value={godown.contactperson}
                onChange={(e) => {
                  setGodown({ ...godown, contactperson: e.target.value });
                }}
                className="form-control"
                type="text"
              ></input>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">Phone</label>
              <input
                value={godown.phone}
                onChange={(e) => {
                  setGodown({ ...godown, phone: e.target.value });
                }}
                className="form-control"
                type="text"
              ></input>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">Company</label>
              <select
                value={godown.company}
                onChange={(e) => {
                  setGodown({ ...godown, company: e.target.value });
                }}
                className="form-control"
                type="text"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="control-label">Email</label>
              <input
                className="form-control"
                type="text"
                value={godown.email}
                onChange={(e) =>
                  setGodown({ ...godown, email: e.target.value })
                }
              ></input>
            </div>
          </div>
          <div className="col-md-12 text-center mt-2">
            <Button
              type="submit"
              variant="success"
              className="mt-2"
              onClick={() => dispatch(addGodown(godown))}
            >
              Submit
            </Button>
            <Button variant="danger" type="submit" className="mt-2">
              Close
            </Button>
          </div>
        </div>
      </div>
      {apiResponse.loading && <Loader />}
    </div>
  );
}

export default Godown;
