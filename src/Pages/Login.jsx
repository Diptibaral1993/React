import React, { Component, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "../assets/Style/Login.css";
import Loginform from "../Components/Loginform";
import { useDispatch } from "react-redux";
import { clearStateLogin } from "../Redux/Slice/loginSlice";

export default function Login() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearStateLogin());
  };

  useEffect(() => {
    logout();
  }, []);

  return <Loginform />;
}
