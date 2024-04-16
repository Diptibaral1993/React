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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { clearStateLogin, getLogin } from "../Redux/Slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import Toastcomponent from "../Components/Toastcomponent";
import Loader from "../Components/Loader";
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
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [apiResponseUserinfo]);
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={4}>
            <Card>
              <CardBody>
                <h1>Sign In</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
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
                  <Form.Group className="mb-3">
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
                  <Button
                    type="submit"
                    variant="primary"
                    className="text-center justify-content-center align-items-center mt-4 pt-2"
                  >
                    Sign In
                  </Button>
                </Form>
                <Row className="py-3">
                  <Col>
                    New User ? <Link>Register</Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {apiResponseUserinfo.loading && <Loader />}
    </>
  );
}

export default Loginform;
