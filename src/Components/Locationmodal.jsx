import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import {} from "../Redux/Slice/locationSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { addLocations } from "../Redux/Slice/locationSlice.js";
function Locationmodal(props) {
  const dispatch = useDispatch();
  const [mitems, setMitems] = useState({
    id: 0,
    loctype: 0,
    reference: 0,
    description: "",
    status: 1,
  });

  const handleCases = () => {
    if (props.header == "Country") {
      setMitems({ ...mitems, loctype: 1 });
    } else if (props.header == "State") {
      setMitems({ ...mitems, loctype: 2, reference: props.uplink });
    } else if (props.header == "City") {
      setMitems({ ...mitems, loctype: 3, reference: props.uplink });
    } else if (props.header == "Area") {
      setMitems({ ...mitems, loctype: 4, reference: props.uplink });
    } else if (props.header == "Pincode") {
      setMitems({ ...mitems, loctype: 5, reference: props.uplink });
    }
  };

  const handleSubmit = () => {
    dispatch(addLocations(mitems));
    setMitems({ id: 0, loctype: 0, reference: 0, description: "", status: 1 });
  };

  return (
    <>
      <Modal
        show={props.visible}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.handler}
        animation={false}
        fullscreen="lg-down"
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <FloatingLabel label={props.header + " Name"}>
              <Form.Control
                required
                placeholder={props.header + " Name"}
                value={mitems.description}
                onChange={(e) =>
                  setMitems({ ...mitems, description: e.target.value })
                }
                onClick={handleCases}
              />
              <Form.Control.Feedback type="invalid">
                {"Enter " + props.header + "Name !!"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={props.handler}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Locationmodal;
