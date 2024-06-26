import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../Redux/Slice/companySlice";
import { getGodownbyCompany } from "../Redux/Slice/GodownSlice";
import { getSEbyGodown } from "../Redux/Slice/userSlice";
import { getItems } from "../Redux/Slice/itemSlice";
import {
  getStockBygni,
  addAllocation,
  clearStateStock,
  addListAllocation,
  resetListAllocation,
  removeListAllocation,
  getAllocationByid,
  updateAllocation,
} from "../Redux/Slice/stockSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import DataTable, { createTheme } from "react-data-table-component";

///material
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";

function Stockallocation() {
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
  const [validated, setValidated] = useState(false);
  const [record, setRecord] = useState([]);
  const [hdnqnty, setHdnqnty] = useState(0);
  const [allocation, setAllocation] = useState({
    id: 0,
    company: "",
    godown: "",
    executive: "",
    item: "",
    quantity: "",
    allocationdt: formatDate(),
    allocatedby: 1,
    status: 1,
    companyname: "",
    godownname: "",
    executivename: "",
  });

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const apiCompany = useSelector((state) => state.company);
  const apiGodown = useSelector((state) => state.godown);
  const apiUser = useSelector((state) => state.user);
  const apiItem = useSelector((state) => state.item);
  const apiStock = useSelector((state) => state.stock);

  const handleAdd = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      const stock = apiStock.data.reduce((sum, stock) => {
        return sum + stock.quantity;
      }, 0);

      if (apiStock.data.length != 0 && stock > allocation.quantity) {
        dispatch(addListAllocation(allocation));
        setAllocation({ ...allocation, item: "", quantity: "" });
        dispatch(clearStateStock());
      }
    }
  };

  function handleExecute(event) {
    if (event.target.value != "") {
      const newdata = apiStock.alllist.filter((row) => {
        return row.executive.includes(event.target.value);
      });
      setRecord(newdata);
    } else {
      setRecord([]);
    }
  }

  function handleRemove(e) {
    //console.log(e);
    dispatch(removeListAllocation(e));
  }

  const handleClose = () => {
    dispatch(clearStateStock());
    navigate("/stock/allocation");
  };

  //handle form submit here

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (isEdit) {
      if (
        allocation.company != "" &&
        allocation.godown != "" &&
        allocation.executive != "" &&
        allocation.item != "" &&
        allocation.quantity != ""
      ) {
        dispatch(updateAllocation(allocation));
      }
    } else {
      const itemExist = apiStock.alllist.find(
        (x) => x.executive === allocation.executive
      );
      if (itemExist) {
        apiStock.alllist.map((row) => {
          return row.executive === allocation.executive
            ? dispatch(
                addAllocation({
                  id: 0,
                  company: row.company,
                  godown: row.godown,
                  executive: row.executive,
                  item: row.item,
                  quantity: row.quantity,
                  allocationdt: formatDate(),
                  allocatedby: 1,
                  status: 1,
                })
              ).then(() =>
                dispatch(
                  removeListAllocation({ ex: row.executive, itm: row.item })
                )
              )
            : null;
        });
      } else {
        alert("blank");
      }
    }

    //}
  };

  useEffect(() => {
    if (allocation.executive != "") {
      const newdata = apiStock.alllist.filter((row) => {
        return row.executive.includes(allocation.executive);
      });
      setRecord(newdata);
    }
  }, [apiStock.alllist]);

  useEffect(() => {
    if (apiStock.isSuccess) {
      setTimeout(() => {
        dispatch(clearStateStock());
      }, 1000);
    }

    if (apiStock.data.length != 0) {
      setHdnqnty(
        apiStock.data.reduce((sum, stock) => {
          return sum + stock.quantity;
        }, 0)
      );
    }

    if (apiStock.editData.length != 0 && isEdit == false) {
      setAllocation({
        id: apiStock.editData[0].id,
        company: apiStock.editData[0].company,
        godown: apiStock.editData[0].godown,
        executive: apiStock.editData[0].executive,
        item: apiStock.editData[0].item,
        quantity: apiStock.editData[0].quantity,
        allocationdt: apiStock.editData[0].allocationdt,
        allocatedby: apiStock.editData[0].allocatedby,
        status: apiStock.editData[0].status,
        companyname: apiStock.editData[0].companyname,
        godownname: apiStock.editData[0].godownname,
        executivename: apiStock.editData[0].executivename,
      });
      dispatch(getGodownbyCompany(apiStock.editData[0].company));
      dispatch(getSEbyGodown(apiStock.editData[0].godown));

      setIsEdit(true);
    }

    if (apiStock.isUpdate) {
      handleClose();
    }
  }, [apiStock]);

  const { id } = useParams();

  useEffect(() => {
    //localStorage.setItem("listallocation", []);
    dispatch(getCompanies());
    dispatch(getItems());
    if (id != 0 && id != "" && id != null) {
      dispatch(getAllocationByid(id));
    }
  }, []);
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleAdd}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Company">
              <Form.Select
                required
                value={allocation.company}
                onChange={(e) => {
                  setAllocation({
                    ...allocation,
                    company: e.target.value,
                    companyname:
                      e.nativeEvent.target[e.target.selectedIndex].text,
                  });
                  dispatch(getGodownbyCompany(e.target.value));
                }}
              >
                <option value="">Select Company</option>
                {apiCompany.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.companyname}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Company!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="GoDown">
              <Form.Select
                required
                value={allocation.godown}
                onChange={(e) => {
                  setAllocation({
                    ...allocation,
                    godown: e.target.value,
                    godownname:
                      e.nativeEvent.target[e.target.selectedIndex].text,
                  });
                  dispatch(getSEbyGodown(e.target.value));
                  allocation.item != "" && e.target.value != ""
                    ? dispatch(
                        getStockBygni({
                          gwdid: e.target.value,
                          itmid: allocation.item,
                        })
                      )
                    : null;
                }}
              >
                <option value="">Select GoDown</option>
                {apiGodown.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Godown!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Sales Executive">
              <Form.Select
                required
                value={allocation.executive}
                onChange={(e) => {
                  setAllocation({
                    ...allocation,
                    executive: e.target.value,
                    executivename:
                      e.nativeEvent.target[e.target.selectedIndex].text,
                  });
                  handleExecute(e);
                }}
              >
                <option value="">Select Sale Executive</option>
                {apiUser.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Sales Executive!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Item">
              <Form.Select
                required
                value={allocation.item}
                onChange={(e) => {
                  setAllocation({
                    ...allocation,
                    item: e.target.value,
                    itemname: e.nativeEvent.target[e.target.selectedIndex].text,
                    quantity: 0,
                  });
                  allocation.godown != "" && e.target.value != ""
                    ? dispatch(
                        getStockBygni({
                          gwdid: allocation.godown,
                          itmid: e.target.value,
                        })
                      )
                    : null;
                }}
              >
                <option value="">Select Item</option>
                {apiItem.data.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Enter Item Name !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel
              label={
                apiStock.data.length != 0
                  ? "Available-" +
                    apiStock.data.reduce((sum, stock) => {
                      return sum + stock.quantity;
                    }, 0)
                  : allocation.item == ""
                  ? ""
                  : "Available-0"
              }
            >
              <Form.Control
                required
                placeholder="Quantity"
                value={allocation.quantity}
                onChange={(e) =>
                  setAllocation({ ...allocation, quantity: e.target.value })
                }
              />

              <Form.Control.Feedback type="invalid">
                Enter Quantity!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Button
          variant="outline-success"
          type="submit"
          className="mt-2 "
          hidden={isEdit}
        >
          Add
        </Button>{" "}
        <Button
          variant="outline-success"
          type="button"
          className="mt-2"
          onClick={handleSubmit}
          hidden={isEdit}
        >
          Submit
        </Button>{" "}
        <Button
          variant="outline-success"
          type="button"
          className="mt-2"
          onClick={handleSubmit}
          hidden={!isEdit}
        >
          Update
        </Button>{" "}
        <Button
          variant="outline-danger"
          type="button"
          className="mt-2"
          onClick={handleClose}
        >
          Close
        </Button>
      </Form>
      <TableContainer component={Paper} className="mt-3">
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          style={{ display: isEdit ? "none" : "" }}
        >
          <TableHead style={{ backgroundColor: "#7ba6de" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>#</TableCell>
              <TableCell style={{ color: "white" }}>Company</TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Godown
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Executive
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Item
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Quantity
              </TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {record.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.companyname}
                </TableCell>
                <TableCell align="right">{row.godownname}</TableCell>
                <TableCell align="right">{row.executivename}</TableCell>
                <TableCell align="right">{row.itemname}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
                  <Button
                    className="btn btn-danger"
                    onClick={(e) =>
                      handleRemove({ ex: row.executive, itm: row.item })
                    }
                  >
                    -
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {apiCompany.loading && <Loader />}
      {apiGodown.loading && <Loader />}
      {apiItem.loading && <Loader />}
      {apiUser.loading && <Loader />}
      {apiStock.isSuccess && (
        <Toastcomponent
          color={apiStock.response}
          msg={apiStock.msg}
          header="Item"
        />
      )}
      {apiStock.data.reduce((sum, stock) => {
        return sum + stock.quantity;
      }, 0) < allocation.quantity && (
        <Toastcomponent
          color="danger"
          msg="Insufficient Stock"
          header="Stock"
        />
      )}
    </>
  );
}

export default Stockallocation;
