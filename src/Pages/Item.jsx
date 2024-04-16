import React, { useEffect } from "react";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearStateItem } from "../Redux/Slice/itemSlice";
import Loader from "../Components/Loader";
import Toastcomponent from "../Components/Toastcomponent";
import { useNavigate } from "react-router-dom";

function Item() {
  const [validated, setValidated] = useState(false);

  const apiResponse = useSelector((state) => state.item);
  const navigate = useNavigate();

  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  };

  const [items, setItems] = useState({
    id: 0,
    name: "",
    status: 1,
    createddt: formatDate(),
  });
  const dispatch = useDispatch();

  //handle form submit here
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      dispatch(addItem(items));
    }
  };

  useEffect(() => {
    if (items.name == "") {
      dispatch(clearStateItem());
    }
  }, [items]);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md={4} sm={6} xs={12} className="mb-3">
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
        </Row>
        <Button variant="outline-success" type="submit" className="mt-2">
          Submit
        </Button>{" "}
        <Button
          variant="outline-danger"
          type="submit"
          className="mt-2"
          onClick={() => navigate("/item")}
        >
          Close
        </Button>
      </Form>

      {apiResponse.loading && <Loader />}
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

export default Item;
