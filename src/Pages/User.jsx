import React from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
function User() {
  const [user, setUser] = useState({
    id: 1,
    employeecode: "",
    name: "",
    username: "",
    password: "",
    email: "",
    dob: "",
    phone: "",
    bloodgroup: "",
    aadhar: "",
    aadharimg: "",
    pan: "",
    panimg: "",
    qualification: "",
    doj: "",
    dor: "",
    experience: "",
    country: 1,
    state: 2,
    city: 3,
    area: 4,
    pincode: 5,
    profileimg: "",
    department: 0,
    designation: 0,
    bankname: "",
    accountnumber: "",
    ifsccode: "",
    company: 1,
    godown: 1,
    createdby: 0,
    createddt: "",
    updatedby: 0,
    updateddt: "",
    status: 1,
  });
  console.log(user);
  return (
    <Form>
      <Row>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Name">
            <Form.Control
              required
              placeholder="Name"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Name !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="UserName">
            <Form.Control
              required
              placeholder="UserName"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter User Name !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Password">
            <Form.Control
              required
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Password !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Email">
            <Form.Control
              required
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Email !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="DOB">
            <Form.Control
              required
              type="date"
              placeholder="DOB"
              value={user.dob}
              onChange={(e) => {
                setUser({ ...user, dob: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter DOB !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Phone">
            <Form.Control
              required
              placeholder="Phone"
              value={user.phone}
              onChange={(e) => {
                setUser({ ...user, phone: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Phone !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="BooldGroup">
            <Form.Select
              required
              value={user.bloodgroup}
              onChange={(e) => {
                setUser({ ...user, bloodgroup: e.target.value });
              }}
            >
              <option value="">Select BloodGroup</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="O+">O+</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Enter BooldGroup !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Aadhar">
            <Form.Control
              required
              placeholder="Aadhar"
              value={user.aadhar}
              onChange={(e) => {
                setUser({ ...user, aadhar: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Aadhar !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Aadhar Image">
            <Form.Control
              type="file"
              required
              placeholder="Aadhar Image"
              value={user.aadharimg}
              onChange={(e) => {
                setUser({ ...user, aadharimg: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Choose Aadhar Image !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="PAN">
            <Form.Control
              required
              placeholder="PAN"
              value={user.pan}
              onChange={(e) => {
                setUser({ ...user, pan: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter PAN !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="PAN Image">
            <Form.Control
              required
              placeholder="PAN Image"
              value={user.panimg}
              onChange={(e) => {
                setUser({ ...user, panimg: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Choose PAN Image!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Qualification">
            <Form.Control
              required
              placeholder="Qualification"
              value={user.qualification}
              onChange={(e) => {
                setUser({ ...user, qualification: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Qualification!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Date Of Joining">
            <Form.Control
              type="date"
              required
              placeholder="Date Of Joining"
              value={user.doj}
              onChange={(e) => {
                setUser({ ...user, doj: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Date Of Joining!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Date Of Registration">
            <Form.Control
              type="date"
              required
              placeholder="Date Of Registration"
              value={user.dor}
              onChange={(e) => {
                setUser({ ...user, dor: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Date Of Registration!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Experience">
            <Form.Control
              required
              placeholder="Experience"
              value={user.experience}
              onChange={(e) => {
                setUser({ ...user, experience: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter Experience!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Country">
            <Form.Select
              required
              value={user.country}
              onChange={(e) => {
                setUser({ ...user, country: e.target.value });
                // dispatch(getState(company.country));
              }}
            >
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
            <Form.Select
              required
              value={user.state}
              onChange={(e) => {
                setUser({ ...user, state: e.target.value });
              }}
            >
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
            <Form.Select
              required
              value={user.city}
              onChange={(e) => {
                setUser({ ...user, city: e.target.value });
              }}
            >
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
            <Form.Select
              required
              value={user.area}
              onChange={(e) => {
                setUser({ ...user, area: e.target.value });
              }}
            >
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
          <FloatingLabel label="Pincode">
            <Form.Select
              required
              value={user.pincode}
              onChange={(e) => {
                setUser({ ...user, pincode: e.target.value });
              }}
            >
              <option value="">Select Pincode</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Pincode !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="ProfileImage">
            <Form.Control
              type="file"
              required
              placeholder="ProfileImage"
              value={user.profileimg}
              onChange={(e) => {
                setUser({ ...user, profileimg: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Select Profile Image !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Department">
            <Form.Select
              required
              value={user.department}
              onChange={(e) => {
                setUser({ ...user, department: e.target.value });
              }}
            >
              <option value="">Select Department</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Department !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Designation">
            <Form.Select
              required
              value={user.designation}
              onChange={(e) => {
                setUser({ ...user, designation: e.target.value });
              }}
            >
              <option value="">Select Designation</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Designation !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="BankName">
            <Form.Control
              required
              placeholder="BankName"
              value={user.bankname}
              onChange={(e) => {
                setUser({ ...user, bankname: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter BankName !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="IFSCCode">
            <Form.Control
              required
              placeholder="IFSCCode"
              value={user.ifsccode}
              onChange={(e) => {
                setUser({ ...user, ifsccode: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter IFSCCode!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="AccountNumber">
            <Form.Control
              required
              placeholder="AccountNumber"
              value={user.accountnumber}
              onChange={(e) => {
                setUser({ ...user, accountnumber: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Enter AccountNumber!!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="Company">
            <Form.Select
              required
              value={user.company}
              onChange={(e) => {
                setUser({ ...user, company: e.target.value });
              }}
            >
              <option value="">Select Company</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Select Company !!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
          <FloatingLabel label="GoDown">
            <Form.Select
              required
              value={user.godown}
              onChange={(e) => {
                setUser({ ...user, godown: e.target.value });
              }}
            >
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
      </Row>
      <Button variant="outline-success" type="submit">
        Submit
      </Button>
      <Button variant="outline-danger">Close</Button>
    </Form>
  );
}

export default User;
