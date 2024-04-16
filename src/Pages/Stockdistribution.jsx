import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSE } from "../Redux/Slice/userSlice";
import { getItems } from "../Redux/Slice/itemSlice";
import { getDealerByExecutive } from "../Redux/Slice/dealerSlice";
import {
  addDistAllocation,
  getStockByExecutive,
  clearStateStock,
  removeDistAllocation,
  addDistribution,
} from "../Redux/Slice/stockSlice";
import Toastcomponent from "../Components/Toastcomponent";

///table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function Stockdistribution() {
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
  const [distribution, setDistribution] = useState({
    id: 0,
    executive: "",
    dealer: "",
    item: "",
    quantity: "",
    distributiondt: formatDate(),
    status: 1,
    executivename: "",
    dealername: "",
    itemname: "",
  });

  const apiExecutive = useSelector((state) => state.user);
  const apiItem = useSelector((state) => state.item);
  const apiDealer = useSelector((state) => state.dealer);
  const apiStock = useSelector((state) => state.stock);

  const dispatch = useDispatch();

  function handleExecute(event) {
    if (event.target.value != "") {
      const newdata = apiStock.distlist.filter((row) => {
        return row.executive.includes(event.target.value);
      });
      setRecord(newdata);
    } else {
      setRecord([]);
    }
  }

  function handleRemove(e) {
    //console.log(e);
    dispatch(removeDistAllocation(e));
  }

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

      if (apiStock.data.length != 0 && stock > distribution.quantity) {
        dispatch(addDistAllocation(distribution));
        setDistribution({ ...distribution, item: "", quantity: "" });
        dispatch(clearStateStock());
      }
    }
  };
  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const itemExist = apiStock.distlist.find(
      (x) => x.executive === distribution.executive
    );
    if (itemExist) {
      apiStock.distlist.map((row) => {
        return row.executive === distribution.executive
          ? dispatch(
              addDistribution({
                id: 0,
                executive: row.executive,
                dealer: row.dealer,
                item: row.item,
                quantity: row.quantity,
                distributiondt: formatDate(),
                status: 1,
              })
            ).then(() =>
              dispatch(
                removeDistAllocation({ ex: row.executive, itm: row.item })
              )
            )
          : null;
      });
    } else {
      alert("blank");
    }
  };

  useEffect(() => {
    if (distribution.executive != "") {
      const newdata = apiStock.distlist.filter((row) => {
        return row.executive.includes(distribution.executive);
      });
      console.log(newdata);
      setRecord(newdata);
    }
  }, [apiStock.distlist]);

  useEffect(() => {
    //localStorage.setItem("listdistribution", []);
    dispatch(getAllSE());
    dispatch(getItems());
  }, []);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleAdd}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Executive">
              <Form.Select
                required
                value={distribution.executive}
                onChange={(e) => {
                  setDistribution({
                    ...distribution,
                    executive: e.target.value,
                    executivename:
                      e.nativeEvent.target[e.target.selectedIndex].text,
                  });
                  dispatch(getDealerByExecutive(e.target.value));
                  handleExecute(e);
                }}
              >
                <option value="">Select Executive</option>
                {apiExecutive.executive &&
                  apiExecutive.executive.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Executive !!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Dealer">
              <Form.Select
                required
                value={distribution.dealer}
                onChange={(e) => {
                  setDistribution({
                    ...distribution,
                    dealer: e.target.value,
                    dealername:
                      e.nativeEvent.target[e.target.selectedIndex].text,
                  });
                }}
              >
                <option value="">Select Dealer</option>
                {apiDealer.data &&
                  apiDealer.data.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Dealer!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Item">
              <Form.Select
                required
                value={distribution.item}
                onChange={(e) => {
                  setDistribution({
                    ...distribution,
                    item: e.target.value,
                    itemname: e.nativeEvent.target[e.target.selectedIndex].text,
                  });
                  dispatch(
                    getStockByExecutive({
                      id: distribution.dealer,
                      itmid: e.target.value,
                    })
                  );
                }}
              >
                <option value="">Select Item</option>
                {apiItem.data &&
                  apiItem.data.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Select Item !!
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
                  : distribution.item == ""
                  ? ""
                  : "Available-0"
              }
            >
              <Form.Control
                required
                placeholder="Quantity"
                value={distribution.quantity}
                onChange={(e) => {
                  setDistribution({
                    ...distribution,
                    quantity: e.target.value,
                  });
                }}
              />
              <Form.Control.Feedback type="invalid">
                Enter Quantity!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Button variant="outline-success" type="submit" className="mt-2">
          Add
        </Button>{" "}
        <Button
          variant="outline-success"
          type="button"
          className="mt-2"
          onClick={handleSubmit}
        >
          Submit
        </Button>{" "}
        <Button
          variant="outline-danger"
          type="button"
          className="mt-2"
          onClick={() => navigate("/stock")}
        >
          Close
        </Button>
      </Form>
      <TableContainer component={Paper} className="mt-3">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "gray" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>#</TableCell>
              <TableCell style={{ color: "white" }}>Executive</TableCell>
              <TableCell align="right" style={{ color: "white" }}>
                Dealer
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
                  {row.executivename}
                </TableCell>
                <TableCell align="right">{row.dealername}</TableCell>
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
      {apiStock.isSuccess && (
        <Toastcomponent
          color={apiStock.response}
          msg={apiStock.msg}
          header="Item"
        />
      )}
      {apiStock.data.reduce((sum, stock) => {
        return sum + stock.quantity;
      }, 0) < distribution.quantity && (
        <Toastcomponent
          color="danger"
          msg="Insufficient Stock"
          header="Stock"
        />
      )}
    </>
  );
}

export default Stockdistribution;
