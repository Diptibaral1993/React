import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel, Table } from "react-bootstrap";
import { useState } from "react";
import Datatable from "../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import {
  getDesignations,
  addDesignation,
  clearStateDesignation,
  getDesignationById,
  updateDesignation,
  ActiveInactive,
} from "../Redux/Slice/designationSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import { getDepartments } from "../Redux/Slice/departmentSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

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
    createdby: 1,
    createddt: formatDate(),
    updatedby: 0,
    updateddt: "",
    status: 1,
  });

  const apiResponse = useSelector((state) => state.designation);
  const apiResponseDepartment = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const [isEdit, setIsedit] = useState(false);
  const [res, setRes] = useState({ response: "", msg: "", isActive: false });

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
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
          <span onClick={() => handleEdit(row.id)}>
            <CiEdit
              style={{ color: "blue", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
          <span onClick={() => handleDelete(row.id)}>
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
    setIsedit(true);
    dispatch(getDesignationById(val));
  };

  const handleDelete = (val) => {
    if (confirm("Are You Sure Want To Active/Inactive ?")) {
      dispatch(ActiveInactive(val));
    }
  };

  const handleCancel = () => {
    setIsedit(false);
    setDesignation({
      id: 0,
      name: "",
      departmentid: 0,
      createdby: 1,
      createddt: formatDate(),
      updatedby: 0,
      updateddt: "",
      status: 1,
    });
    dispatch(clearStateDesignation());
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
        dispatch(updateDesignation(designation));
      } else {
        dispatch(addDesignation(designation));
      }

      handleCancel();
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      dispatch(getDesignations());
      setTimeout(() => {
        dispatch(clearStateDesignation());
      }, 3000);
    }

    if (apiResponse.editData.length != 0) {
      setDesignation({
        id: apiResponse.editData[0].id,
        name: apiResponse.editData[0].name,
        departmentid: apiResponse.editData[0].departmentid,
        createdby: apiResponse.editData[0].createdby,
        createddt: apiResponse.editData[0].createddt,
        updatedby: apiResponse.editData[0].updatedby,
        updateddt: formatDate(),
        status: apiResponse.editData[0].status,
      });
    }

    if (apiResponse.isUpdate || apiResponse.isDelete) {
      toastmessage();
      dispatch(clearStateDesignation());
      dispatch(getDesignations());
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
              <FloatingLabel label="Department">
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
              onClick={() => handleCancel()}
              hidden={!isEdit}
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
          header="Designation"
        />
      )}
    </>
  );
}

export default Designation;
