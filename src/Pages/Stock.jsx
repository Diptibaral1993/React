import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanies } from "../Redux/Slice/companySlice";
import { getGodownbyCompany } from "../Redux/Slice/GodownSlice";
import { getItems } from "../Redux/Slice/itemSlice";
import { addStock, clearStateStock } from "../Redux/Slice/stockSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";

function Stock() {
  const [validated, setValidated] = useState(false);
  const apiCompany = useSelector((state) => state.company);
  const apiGodown = useSelector((state) => state.godown);
  const apiItem = useSelector((state) => state.item);
  const apiResponse = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const [stock, setStock] = useState({
    id: 0,
    company: 0,
    godown: 0,
    item: 0,
    quantity: 0,
    status: 1,
  });

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      dispatch(addStock(stock));

      setTimeout(() => {
        dispatch(clearStateStock());
      }, 3000);
    }
  };

  useEffect(() => {
    if (apiResponse.isSuccess) {
      setStock({
        id: 0,
        company: 0,
        godown: 0,
        item: 0,
        quantity: 0,
        status: 1,
      });
    }
  }, [apiResponse]);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
            <FloatingLabel label="Company">
              <Form.Select
                value={stock.company}
                required
                onChange={(e) => {
                  setStock({ ...stock, company: e.target.value });
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
                value={stock.godown}
                required
                onChange={(e) => {
                  setStock({ ...stock, godown: e.target.value });
                  dispatch(getItems(e.target.value));
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
            <FloatingLabel label="Item">
              <Form.Select
                required
                value={stock.item}
                onChange={(e) => {
                  setStock({ ...stock, item: e.target.value });
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
            <FloatingLabel label="Quantity">
              <Form.Control
                required
                placeholder="Quantity"
                value={stock.quantity}
                onChange={(e) =>
                  setStock({ ...stock, quantity: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Enter Quantity!!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Button variant="outline-success" type="submit" className="mt-2">
          Submit
        </Button>
        <Button variant="outline-danger" type="submit" className="mt-2">
          Close
        </Button>
      </Form>
      {apiResponse.loading && <Loader />}
      {apiCompany.loading && <Loader />}
      {apiGodown.loading && <Loader />}

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

export default Stock;
