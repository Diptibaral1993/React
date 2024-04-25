import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeInactiveItem,
  addItem,
  clearStateItem,
  getItembyid,
  getItems,
  updateItem,
} from "../Redux/Slice/itemSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import { useNavigate } from "react-router-dom";
import Datatable from "../Components/Datatable";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

function Item() {
  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };
  const [validated, setValidated] = useState(false);
  const [items, setItems] = useState({
    id: 0,
    name: "",
    status: 1,
    createddt: formatDate(),
  });

  const [isedit, setIsedit] = useState(false);

  const dispatch = useDispatch();
  const [res, setRes] = useState({ response: "", msg: "", isActive: false });

  const apiResponse = useSelector((state) => state.item);
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ITEM NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "status",
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

  const handleEdit = (val) => {
    dispatch(getItembyid(val));
    setIsedit(true);
  };

  const handleCancel = () => {
    setIsedit(false);
    setItems({
      id: 0,
      name: "",
      status: 1,
      createddt: formatDate(),
    });
  };

  const handleDelete = (val) => {
    if (confirm("Are You Sure Want To Delete?")) {
      dispatch(activeInactiveItem(val));
    }
  };

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (isedit) {
        dispatch(updateItem(items));
      } else {
        dispatch(addItem(items));
      }

      handleCancel();
    }
  };

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = apiResponse.data.filter((row) => {
      return row.name.includes(event.target.value);
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (apiResponse.isSuccess) {
      dispatch(getItems());
      toastmessage();
      dispatch(clearStateItem());
    }

    if (apiResponse.data.length != 0) {
      apiResponse.data.map((item, index) => {
        setRecords(apiResponse.data);
      });
    }

    if (apiResponse.editdata.length != 0) {
      if (isedit) {
        setItems({
          id: apiResponse.editdata[0].id,
          name: apiResponse.editdata[0].name,
          status: apiResponse.editdata[0].status,
          createddt: apiResponse.editdata[0].createddt,
        });
      }
    }

    if (apiResponse.isUpdate || apiResponse.isDelete) {
      dispatch(getItems());
      toastmessage();
      dispatch(clearStateItem());
    }
  }, [apiResponse]);

  // useEffect(() => {}, [apiResponse]);

  useEffect(() => {
    dispatch(getItems());
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
              <FloatingLabel label="Item">
                <Form.Control
                  required
                  placeholder="Item"
                  value={items.name}
                  onChange={(e) => setItems({ ...items, name: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Enter Item Name !!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button
              variant="outline-success"
              type="submit"
              className="mt-2"
              hidden={isedit}
            >
              Submit
            </Button>{" "}
            <Button
              variant="outline-success"
              type="submit"
              className="mt-2"
              hidden={!isedit}
            >
              Update
            </Button>{" "}
            <Button
              variant="outline-danger"
              type="button"
              className="mt-2"
              hidden={!isedit}
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
            {apiResponse.loading && <Loader />}
            {apiResponse.data != null && (
              <Datatable
                data={records}
                columns={columns}
                handleFilter={handleFilter}
                hidden="none"
                excel="block"
                sheetname="ITEM MASTER"
                fileName="ITEM MASTER"
              />
            )}
          </Col>
        </Row>
      </Form>

      {apiResponse.loading && <Loader />}
      {res.isActive && (
        <Toastcomponent color={res.response} msg={res.msg} header="Item" />
      )}
    </>
  );
}

export default Item;
