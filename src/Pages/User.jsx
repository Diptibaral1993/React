import React from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearStateUser } from "../Redux/Slice/userSlice";
import Toastcomponent from "../Components/Toastcomponent";
import {
  getCountry,
  getState,
  getCity,
  getArea,
  getPincode,
} from "../Redux/Slice/locationSlice";
import { getCompanies } from "../Redux/Slice/companySlice";
import { getGodownbyCompany } from "../Redux/Slice/GodownSlice";
import Loader from "../Components/Loader";
import { getDepartments } from "../Redux/Slice/departmentSlice";
import {
  getDesignationBydepartment,
  getDesignations,
} from "../Redux/Slice/designationSlice";
import { useNavigate } from "react-router-dom";

function User() {
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
  const [user, setUser] = useState({
    id: 0,
    employeecode: 0,
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
    country: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    profileimg: "",
    department: 0,
    designation: 0,
    bankname: "",
    accountnumber: "",
    ifsccode: "",
    company: "",
    godown: "",
    createdby: 0,
    createddt: formatDate(),
    updatedby: 0,
    updateddt: "",
    status: 1,
    ImgFile: null,
  });

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const apiResponse = useSelector((state) => state.user);
  const apiLocationResponse = useSelector((state) => state.location);
  const apiCompanyResponse = useSelector((state) => state.company);
  const apiGodownResponse = useSelector((state) => state.godown);
  const apiDepartment = useSelector((state) => state.department);
  const apiDesignation = useSelector((state) => state.designation);

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const formdata = new FormData();
      formdata.append("id", user.id);
      formdata.append("employeecode", user.employeecode);
      formdata.append("name", user.name);
      formdata.append("username", user.username);
      formdata.append("password", user.password);
      formdata.append("email", user.email);
      formdata.append("dob", user.dob);
      formdata.append("phone", user.phone);
      formdata.append("bloodgroup", user.bloodgroup);
      formdata.append("aadhar", user.aadhar);
      formdata.append("aadharimg", user.aadharimg);
      formdata.append("pan", user.pan);
      formdata.append("panimg", user.panimg);
      formdata.append("qualification", user.qualification);
      formdata.append("doj", user.doj);
      formdata.append("dor", user.dor);
      formdata.append("experience", user.experience);
      formdata.append("country", user.country);
      formdata.append("state", user.state);
      formdata.append("city", user.city);
      formdata.append("area", user.area);
      formdata.append("pincode", user.pincode);
      formdata.append("profileimg", user.profileimg);
      formdata.append("department", user.department);
      formdata.append("designation", user.designation);
      formdata.append("bankname", user.bankname);
      formdata.append("accountnumber", user.accountnumber);
      formdata.append("ifsccode", user.ifsccode);
      formdata.append("company", user.company);
      formdata.append("godown", user.godown);
      formdata.append("createdby", user.createdby);
      formdata.append("createddt", user.createddt);
      formdata.append("updatedby", user.updatedby);
      formdata.append("updateddt", user.updateddt);
      formdata.append("status", user.status);
      formdata.append(
        "ProfileImgFile",
        images.profileimg,
        "desktop-1600x900.jpg"
      );
      formdata.append("PanImgFile", images.panimg, "desktop-1600x900.jpg");
      formdata.append(
        "AadharImgFile",
        images.aadharimg,
        "desktop-1600x900.jpg"
      );

      dispatch(addUser(formdata));
      setUser({
        id: 0,
        employeecode: 0,
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
        country: "",
        state: "",
        city: "",
        area: "",
        pincode: "",
        profileimg: "",
        department: 0,
        designation: 0,
        bankname: "",
        accountnumber: "",
        ifsccode: "",
        company: "",
        godown: "",
        createdby: 0,
        createddt: formatDate(),
        updatedby: 0,
        updateddt: "",
        status: 1,
        ImgFile: null,
      });
    }
  };

  const [images, setImages] = useState({
    panimg: "",
    aadharimg: "",
    profileimg: "",
  });

  const handleProfileimg = (event) => {
    setImages({ ...images, profileimg: event.target.files[0] });
  };

  const handlePanimg = (event) => {
    setImages({ ...images, panimg: event.target.files[0] });
  };

  const handleAadharimg = (event) => {
    setImages({ ...images, aadharimg: event.target.files[0] });
  };

  useEffect(() => {
    if (user.username == "") {
      dispatch(clearStateUser());
    }
  }, [user]);

  useEffect(() => {
    if (apiResponse.isSuccess) {
      setTimeout(() => {
        dispatch(clearStateUser());
      }, 3000);
    }
  }, [apiResponse]);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getCompanies());
    dispatch(getDepartments());
  }, []);
  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={
          apiResponse.loading ||
          apiLocationResponse.loading ||
          apiCompanyResponse.loading ||
          apiGodownResponse.loading
            ? "unclickable"
            : null
        }
      >
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
                  handleAadharimg(e);
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
                type="file"
                required
                placeholder="Pan Image"
                value={user.panimg}
                onChange={(e) => {
                  setUser({ ...user, panimg: e.target.value });
                  handlePanimg(e);
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
                value={user.state}
                onChange={(e) => {
                  setUser({ ...user, state: e.target.value });
                  dispatch(getCity(e.target.value));
                }}
              >
                <option value="">Select State</option>
                {apiLocationResponse.Gstate.map((item, index) => (
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
                value={user.city}
                onChange={(e) => {
                  setUser({ ...user, city: e.target.value });
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
                value={user.area}
                onChange={(e) => {
                  setUser({ ...user, area: e.target.value });
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
                value={user.pincode}
                onChange={(e) => {
                  setUser({ ...user, pincode: e.target.value });
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
            <FloatingLabel label="ProfileImage">
              <Form.Control
                type="file"
                required
                placeholder="ProfileImage"
                value={user.profileimg}
                onChange={(e) => {
                  setUser({ ...user, profileimg: e.target.value });

                  handleProfileimg(e);
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
                  dispatch(getDesignationBydepartment(e.target.value));
                }}
              >
                <option value="">Select Department</option>
                {apiDepartment.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
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
                {apiDesignation.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
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
                  dispatch(getGodownbyCompany(e.target.value));
                }}
              >
                <option value="">Select Company</option>
                {apiCompanyResponse.data.map((item, index) => (
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
            <FloatingLabel label="GoDown">
              <Form.Select
                required
                value={user.godown}
                onChange={(e) => {
                  setUser({ ...user, godown: e.target.value });
                }}
              >
                <option value="">Select GoDown</option>
                {apiGodownResponse.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select GoDown !!
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
          onClick={() => navigate("/user")}
        >
          Close
        </Button>
      </Form>
      {(apiResponse.loading && <Loader />) ||
        (apiLocationResponse.loading && <Loader />) ||
        (apiCompanyResponse.loading && <Loader />) ||
        (apiGodownResponse.loading && <Loader />)}
      {apiResponse.isSuccess && (
        <Toastcomponent
          color={apiResponse.response}
          msg={apiResponse.msg}
          header="Item"
        />
      )}
    </>
  );
}

export default User;
