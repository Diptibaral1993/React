import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../assets/Style/Login.css";
import { useNavigate } from "react-router-dom";

function Loginform() {
  const [credentials, setCredentials] = useState({
    userName: "",
    passWord: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    erruserName: "false",
    errpassWord: "false",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.userName == "" && credentials.passWord == "") {
      setErrorMessage({
        ...errorMessage,
        erruserName: "true",
        errpassWord: "true",
      });
    } else if (credentials.userName != "" && credentials.passWord == "") {
      setErrorMessage({
        ...errorMessage,
        erruserName: "false",
        errpassWord: "true",
      });
    } else if (credentials.userName == "" && credentials.passWord != "") {
      setErrorMessage({
        ...errorMessage,
        erruserName: "true",
        errpassWord: "false",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <form id="loginform">
      <div className="inputWithIcon inputIconBg">
        <input
          type="text"
          placeholder="Username"
          value={credentials.userName}
          onChange={(e) => {
            setCredentials({ ...credentials, userName: e.target.value }),
              setErrorMessage({
                ...errorMessage,
                erruserName: e.target.value == "" ? "true" : "false",
              });
          }}
          style={{
            border: errorMessage.erruserName == "true" ? "2px solid red" : "",
          }}
        />
        <i>{<FaEnvelope />}</i>
      </div>
      <div className="inputWithIcon inputIconBg">
        <input
          type="text"
          placeholder="Password"
          value={credentials.passWord}
          onChange={(e) => {
            setCredentials({ ...credentials, passWord: e.target.value }),
              setErrorMessage({
                ...errorMessage,
                errpassWord: e.target.value == "" ? "true" : "false",
              });
          }}
          style={{
            border: errorMessage.errpassWord == "true" ? "2px solid red" : "",
          }}
        />
        <i>{<FaLock />}</i>
      </div>

      <button
        type="submit"
        className="btn btn-primary btnsumbit"
        onClick={(e) => handleSubmit(e)}
      >
        Login
      </button>

      <div className="divider">Or You Can</div>

      <button type="submit" className="btn btn-primary">
        Register User
      </button>
    </form>
  );
}

export default Loginform;
