import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Card,
  FloatingLabel,
  CardBody,
  CardImg,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { clearStateLogin, getLogin } from "../Redux/Slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import Toastcomponent from "../Components/Toastcomponent";
import Loader from "../Components/Loader";
import "../assets/Style/Login.css";
function Loginform() {
  const [credentials, setCredentials] = useState({
    uname: "",
    pass: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const apiResponseUserinfo = useSelector((state) => state.userinfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      dispatch(getLogin(credentials));
    }
  };

  useEffect(() => {
    if (apiResponseUserinfo.isSuccess) {
      localStorage.setItem("headertext", "DASHBOARD");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [apiResponseUserinfo]);
  return (
    <>
      <Container fluid className="p-3 my-5 h-custom">
        <Card className="login_form center ">
          <Row className="justify-content-center align-items-center center-custom">
            <Col md={6} className="d-md-block">
              <CardImg
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt="phone"
                className="rounded-t-5 rounded-tr-lg-0"
                fluid
              />
            </Col>
            <Col md={6} className="d-md-block">
              <CardBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="input">
                    <FloatingLabel label="User Name">
                      <Form.Control
                        required
                        placeholder="User Name"
                        value={credentials.uname}
                        onChange={(e) => {
                          setCredentials({
                            ...credentials,
                            uname: e.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter User Name !!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="input">
                    <FloatingLabel label="Password">
                      <Form.Control
                        type="password"
                        required
                        placeholder="Password"
                        value={credentials.pass}
                        onChange={(e) => {
                          setCredentials({
                            ...credentials,
                            pass: e.target.value,
                          });
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter Password !!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  {/* <div className="d-flex justify-content-between mx-4 mb-4">
                    New User ?
                    <Link className="text-body">Register</Link>

                  </div> */}
                  <Col md={12} className="col-btn">
                    <Button type="submit" className="btn-login">
                      Sign In
                    </Button>
                  </Col>
                </Form>
              </CardBody>
            </Col>

            {/* <Row className="py-3">
              <Col>
                New User ? <Link>Register</Link>
              </Col>
            </Row> */}
          </Row>
        </Card>
      </Container>
      {apiResponseUserinfo.loading && <Loader />}
    </>
  );
}

export default Loginform;
