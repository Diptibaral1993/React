import React from "react";
import { BsArrowsFullscreen } from "react-icons/bs";

function Header(props) {
  return (
    <nav
      class="navbar"
      style={{
        height: "4.6em",
        backgroundColor: "#93bee4",
        textAlign: "center",
      }}
    >
      <div class="container-fluid">
        <h4>{props.name}</h4>
        <BsArrowsFullscreen
          style={{ margin: "18px", fontSize: "25px" }}
          onClick={() => props.toggle()}
        />
      </div>
    </nav>
    // <h2 className="mb-4">{props.name}</h2>
  );
}

export default Header;
