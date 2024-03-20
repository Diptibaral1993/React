import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
function Location() {
  const dispatch = useDispatch();

  const [modalState, setShow] = useState({
    coutryMdl: false,
    stateMdl: false,
    cityMdl: false,
    areaMdl: false,
    pincodeMdl: false,
  });
  const countryModalClose = () => setShow({ ...modalState, coutryMdl: false });
  // const CountrymdleShow = () => setShow(true);

  // const [showStateModal, setStateShow] = useState(false);
  const stateModalClose = () =>
    setStateShow({ ...modalState, stateMdl: false });
  // const StatemdleShow = () => setStateShow(true);

  // const [showCityModal, setCityShow] = useState(false);
  const cityModalClose = () => setCityShow({ ...modalState, cityMdl: false });
  // const citymdleShow = () => setCityShow(true);

  // const [showAreaModal, setAreaShow] = useState(false);
  const areaModalClose = () => setAreaShow({ ...modalState, areaMdl: false });
  // const areamdleShow = () => setAreaShow(true);
  const hideModal = (ev) => {
    setShow({ ...modalState, coutryMdl: false });
    $(".modal-backdrop").remove();
    console.log(ev);
  };
  console.log(modalState);
  const [location, setLocation] = useState({
    coutry: 0,
    state: 0,
    city: 0,
    area: 0,
    pin: 0,
    coutryName: "",
    stateName: "",
    cityName: "",
    areaName: "",
    pinCode: "",
  });

  return (
    <div className="card" style={{ margin: "0rem", padding: "0rem" }}>
      <div className="card-body" style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <Link
                onClick={() => setShow({ ...modalState, coutryMdl: true })}
                name="Country"
                className="badge badge-soft-danger float-end"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                &nbsp;| New
              </Link>
              <label className="control-label">Country</label>
              <select className="form-control" type="text"></select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Link
                onClick={() => setShow({ ...modalState, stateMdl: true })}
                name="State"
                className="badge badge-soft-danger float-end"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                &nbsp;| New
              </Link>
              <label className="control-label">State</label>
              <select className="form-control" type="text">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Link
                onClick={() => setShow({ ...modalState, cityMdl: true })}
                name="City"
                className="badge badge-soft-danger float-end"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                &nbsp;| New
              </Link>
              <label className="control-label">City</label>
              <select className="form-control" type="text">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          {/* <div className="col-md-4">
                                    <div className="form-group">
                                        <a name="Country" href="#" className="badge badge-soft-danger float-end" data-toggle="modal" data-target="#exampleModal" ><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;| New</a>
                                        <label className="control-label">City</label>
                                        <select className="form-control" type="text">
                                            <option value="volvo">Volvo</option>
                                            <option value="saab">Saab</option>
                                        </select>
                                    </div>
                                </div> */}
          <div className="col-md-4">
            <div className="form-group">
              <Link
                name="Country"
                onClick={() => setShow({ ...modalState, areaMdl: true })}
                className="badge badge-soft-danger float-end"
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                &nbsp;| New
              </Link>
              <label className="control-label">Area</label>
              <select className="form-control" type="text">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <Link
                name="Country"
                onClick={() => setShow({ ...modalState, pincodeMdl: true })}
                className="badge badge-soft-danger float-end"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                &nbsp;| New
              </Link>
              <label className="control-label">Pin</label>
              <select className="form-control" type="text">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>
          <div className="col-md-12 text-center mt-2">
            <button className="btn btn-primary btn-sm" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={modalState.coutryMdl}
        onHide={countryModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center">
            Country
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="control-label">Country</label>
          <input
            value={location.coutryName}
            onChange={(e) =>
              setLocation({ ...location, coutryName: e.target.value })
            }
            className="form-control"
            type="text"
          ></input>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary">Save</Button>
          <Button variant="danger" onClick={hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalState.stateMdl}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center">
            State
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="control-label">Country</label>
          <select
            value={location.coutry}
            onChange={(e) =>
              setLocation({ ...location, coutry: e.target.value })
            }
            className="form-control"
            type="text"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
          <label className="control-label">StateName</label>
          <input
            value={location.stateName}
            onChange={(e) =>
              setLocation({ ...location, stateName: e.target.value })
            }
            className="form-control"
            type="text"
          ></input>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary">Save</Button>
          <Button
            variant="danger"
            onClick={() => setShow({ ...modalState, stateMdl: false })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalState.cityMdl}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center">
            City
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="control-label">Country</label>
          <select
            value={location.coutry}
            onChange={(e) =>
              setLocation({ ...location, coutry: e.target.value })
            }
            className="form-control"
            type="text"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
          <label className="control-label">StateName</label>
          <select
            value={location.state}
            onChange={(e) =>
              setLocation({ ...location, state: e.target.value })
            }
            className="form-control"
            type="text"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
          <label className="control-label">CityName</label>
          <input
            value={location.cityName}
            onChange={(e) =>
              setLocation({ ...location, cityName: e.target.value })
            }
            className="form-control"
            type="text"
          ></input>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary">Save</Button>
          <Button
            variant="danger"
            onClick={() => setShow({ ...modalState, cityMdl: false })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalState.areaMdl}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center">
            Area
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="control-label">Country</label>
          <select
            value={location.coutry}
            onChange={(e) =>
              setLocation({ ...location, coutry: e.target.value })
            }
            className="form-control"
            type="text"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
          <label className="control-label">StateName</label>
          <select
            value={location.state}
            onChange={(e) =>
              setLocation({ ...location, state: e.target.value })
            }
            className="form-control"
            type="text"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
          <label className="control-label">CityName</label>
          <input
            value={location.cityName}
            onChange={(e) =>
              setLocation({ ...location, cityName: e.target.value })
            }
            className="form-control"
            type="text"
          ></input>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary">Save</Button>
          <Button
            variant="danger"
            onClick={() => setShow({ ...modalState, areaMdl: false })}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Location;
