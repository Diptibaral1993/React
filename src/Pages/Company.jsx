import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../Redux/Slice/companySlice";
import { getCountry, getState } from "../Redux/Slice/locationSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
function Company() {
  const [company, setCompany] = useState({
    id: 0,
    companyname: "",
    contactperson: "",
    phone: "",
    email: "",
    gstnumber: "",
    pannumber: "",
    country: 1,
    state: 2,
    city: 3,
    area: 4,
    pincode: 5,
    status: 1,
  });
  const apiResponse = useSelector((state) => state.company);
  const apiLocationResponse = useSelector((state) => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  return (
    <>
      <div className="card" style={{ margin: "0rem", padding: "0rem" }}>
        <div className="card-body" style={{ textAlign: "left" }}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">CompanyName</label>
                <input
                  value={company.companyname}
                  onChange={(e) => {
                    setCompany({ ...company, companyname: e.target.value });
                  }}
                  className="form-control"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">ContactPerson</label>
                <input
                  value={company.contactperson}
                  onChange={(e) => {
                    setCompany({ ...company, contactperson: e.target.value });
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
                  value={company.phone}
                  onChange={(e) => {
                    setCompany({ ...company, phone: e.target.value });
                  }}
                  className="form-control"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">Email</label>
                <input
                  value={company.email}
                  onChange={(e) => {
                    setCompany({ ...company, email: e.target.value });
                  }}
                  className="form-control"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">GstNumber</label>
                <input
                  value={company.gstnumber}
                  onChange={(e) => {
                    setCompany({ ...company, gstnumber: e.target.value });
                  }}
                  className="form-control"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">PanNumber</label>
                <input
                  value={company.pannumber}
                  onChange={(e) => {
                    setCompany({ ...company, pannumber: e.target.value });
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
                  value={company.country}
                  onChange={(e) => {
                    setCompany({ ...company, country: e.target.value });
                    dispatch(getState(company.country));
                  }}
                  className="form-control"
                  type="text"
                >
                  {apiLocationResponse.Gcountry.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">State</label>
                <select
                  value={company.state}
                  onChange={(e) => {
                    setCompany({ ...company, state: e.target.value });
                  }}
                  className="form-control"
                  type="text"
                >
                  {apiLocationResponse.Gstate.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">city</label>
                <select
                  value={company.city}
                  onChange={(e) => {
                    setCompany({ ...company, city: e.target.value });
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
                  value={company.area}
                  onChange={(e) => {
                    setCompany({ ...company, area: e.target.value });
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
                  value={company.pincode}
                  onChange={(e) => {
                    setCompany({ ...company, pincode: e.target.value });
                  }}
                  className="form-control"
                  type="text"
                >
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                </select>
              </div>
            </div>
            <div className="col-md-12 text-center mt-2">
              <Button
                type="submit"
                className="mt-2"
                onClick={() => dispatch(addCompany(company))}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        {apiResponse.loading && <Loader />}
        {apiLocationResponse.loading && <Loader />}
      </div>
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

export default Company;
