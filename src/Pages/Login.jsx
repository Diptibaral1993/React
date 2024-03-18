import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "../assets/Style/Login.css";
import Loginform from "../Components/Loginform";

export default function Login() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-4 col-md-offset-4">
          <Card className="card">
            <Loginform />
          </Card>
        </div>
      </div>
    </div>
  );
}
