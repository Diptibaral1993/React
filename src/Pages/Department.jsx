import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import { useState } from "react";
import Datatable from "../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import {
  addDepartment,
  getDepartments,
  clearStateDepartment,
} from "../Redux/Slice/departmentSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";

function Department() {
  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  const [department, setDepartment] = useState({
    id: 0,
    name: "",
    createdby: 1,
    createddt: formatDate(),
    updatedby: 1,
    updateddt: "",
    status: 1,
  });

  const apiResponse = useSelector((state) => state.department);
  const dispatch = useDispatch();

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "DEPARTMENT",
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
      dispatch(addDepartment(department));
      setDepartment({
        id: 0,
        name: "",
        createdby: 1,
        createddt: formatDate(),
        updatedby: 1,
        updateddt: "",
        status: 1,
      });
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      dispatch(getDepartments());
      setTimeout(() => {
        dispatch(clearStateDepartment());
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
  }, []);
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={5} sm={6} xs={12}>
            <Form.Group as={Col} md={12} sm={6} xs={12} className="mb-3">
              <FloatingLabel label="Department Name">
                <Form.Control
                  required
                  placeholder="Department Name"
                  value={department.name}
                  onChange={(e) => {
                    setDepartment({ ...department, name: e.target.value });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Department Name !!
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
          header="Department"
        />
      )}
    </>
  );
}

export default Department;
