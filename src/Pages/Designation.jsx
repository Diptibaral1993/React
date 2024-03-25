import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import { useState } from "react";
import Datatable from "../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import {
  getDesignations,
  addDesignation,
  clearStateDesignation,
} from "../Redux/Slice/designationSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import { getDepartments } from "../Redux/Slice/departmentSlice";

function Designation() {
  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  const [designation, setDesignation] = useState({
    id: 0,
    name: "",
    departmentid: 0,
    createdby: 0,
    createddt: formatDate(),
    updatedby: 0,
    updateddt: "",
    status: 0,
  });

  const apiResponse = useSelector((state) => state.designation);
  const apiResponseDepartment = useSelector((state) => state.department);
  const dispatch = useDispatch();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "DEPARTMENT",
      selector: (row) => row.departmentName,
      sortable: true,
    },
    {
      name: "DESIGNATION",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
  ];
  const [validated, setValidated] = useState(false);

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = apiResponse.data.filter((row) => {
      return row.name.includes(event.target.value);
    });
    setRecords(newdata);
  }

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      dispatch(addDesignation(designation));
      setDesignation({
        id: 0,
        name: "",
        departmentid: 0,
        createdby: 0,
        createddt: formatDate(),
        updatedby: 0,
        updateddt: "",
        status: 0,
      });
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      dispatch(getDesignations());
      setTimeout(() => {
        dispatch(clearStateDesignation());
      }, 3000);
    }
  }, [apiResponse]);

  useEffect(() => {
    if (apiResponse.data.length != 0) {
      apiResponse.data.map((item, index) => {
        setRecords(apiResponse.data);
      });
    }
  }, [apiResponse]);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getDesignations());
  }, []);
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={5} sm={6} xs={12}>
            <Form.Group as={Col} md={12} sm={6} xs={12} className="mb-3">
              <FloatingLabel label="Country">
                <Form.Select
                  required
                  value={designation.departmentid}
                  onChange={(e) => {
                    setDesignation({
                      ...designation,
                      departmentid: e.target.value,
                    });
                  }}
                >
                  <option value="">Select Department</option>
                  {apiResponseDepartment.data.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select Department !!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} md={12} sm={6} xs={12} className="mb-3">
              <FloatingLabel label="Designation Name">
                <Form.Control
                  required
                  placeholder="Designation Name"
                  value={designation.name}
                  onChange={(e) => {
                    setDesignation({ ...designation, name: e.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Designation Name !!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button variant="outline-success" type="submit" className="mt-2">
              Submit
            </Button>
            <Button variant="outline-danger" type="submit" className="mt-2">
              Close
            </Button>
          </Col>
          <Col
            md={7}
            sm={6}
            xs={12}
            style={{ maxHeight: "60vh", overflow: "scroll" }}
          >
            <Datatable
              hidden="none"
              columns={columns}
              data={records}
              handleFilter={handleFilter}
            ></Datatable>
          </Col>
        </Row>
      </Form>
      {apiResponse.loading && <Loader />}
      {apiResponse.response != "" && (
        <Toastcomponent
          color={apiResponse.response}
          msg={apiResponse.msg}
          header="Designation"
        />
      )}
    </>
  );
}

export default Designation;
