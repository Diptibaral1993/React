import React from "react";
import logo from "../assets/logo.jpg";

function Header(props) {
  return (
    // <nav class="navbar" style={{ height: "4.6em", backgroundColor: "#93bee4" }}>
    //   <div class="container-fluid">
    //     <h4>{props.name}</h4>
    //   </div>
    // </nav>
    <h2 className="mb-4">{props.name}</h2>
  );
}

export default Header;
