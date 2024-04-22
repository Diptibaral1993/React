import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import { useState } from "react";
import Datatable from "../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import {
  addDepartment,
  getDepartments,
  clearStateDepartment,
  getDepartmentByid,
  updateDepartment,
  ActiveInactive,
} from "../Redux/Slice/departmentSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

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

  const [isEdit, setIsedit] = useState(false);

  const apiResponse = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const [res, setRes] = useState({ response: "", msg: "", isActive: false });

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
      selector: (row) =>
        row.status == 1 ? (
          <TiTick style={{ color: "green", fontSize: "1.3rem" }} />
        ) : (
          <MdBlock style={{ color: "red", fontSize: "1.3rem" }} />
        ),
      sortable: true,
    },
    {
      name: "ACTION",
      cell: (row) => (
        <>
          <span
            onClick={() => {
              handleEdit(row.id);
            }}
          >
            <CiEdit
              style={{ color: "blue", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
          <span
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <MdDelete
              style={{ color: "red", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
        </>
      ),
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

  const handleEdit = (val) => {
    dispatch(getDepartmentByid(val));
    setIsedit(true);
  };

  const handleDelete = (val) => {
    if (confirm("Are You Sure Want To Active/Inactive ?")) {
      dispatch(ActiveInactive(val));
    }
  };

  const handleCancel = () => {
    setDepartment({
      id: 0,
      name: "",
      createdby: 1,
      createddt: formatDate(),
      updatedby: 1,
      updateddt: "",
      status: 1,
    });
    setIsedit(false);
  };

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (isEdit) {
        dispatch(updateDepartment(department));
      } else {
        dispatch(addDepartment(department));
      }
      dispatch(clearStateDepartment());
      handleCancel();
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      dispatch(getDepartments());
      toastmessage();
      dispatch(clearStateDepartment());
    }
    if (apiResponse.editData.length != 0) {
      setDepartment({
        id: apiResponse.editData.id,
        name: apiResponse.editData.name,
        createdby: apiResponse.editData.createdby,
        createddt: apiResponse.editData.createddt,
        updatedby: apiResponse.editData.updatedby,
        updateddt: formatDate(),
        status: apiResponse.editData.status,
      });
    }

    if (apiResponse.isUpdate || apiResponse.isDelete) {
      dispatch(getDepartments());
      toastmessage();
      dispatch(clearStateDepartment());
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

  const toastmessage = () => {
    setRes({
      response: apiResponse.response,
      msg: apiResponse.msg,
      isActive: true,
    });

    setTimeout(() => {
      setRes({
        response: "",
        msg: "",
        isActive: false,
      });
    }, 3000);
  };
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
            <Button
              variant="outline-success"
              type="submit"
              className="mt-2"
              hidden={isEdit}
            >
              Submit
            </Button>{" "}
            <Button
              variant="outline-success"
              type="submit"
              className="mt-2"
              hidden={!isEdit}
            >
              Update
            </Button>{" "}
            <Button
              variant="outline-danger"
              type="button"
              className="mt-2"
              hidden={!isEdit}
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>{" "}
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
      {res.isActive && (
        <Toastcomponent
          color={res.response}
          msg={res.msg}
          header="Department"
        />
      )}
    </>
  );
}

export default Department;
