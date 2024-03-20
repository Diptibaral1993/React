import React, { useEffect, useState } from "react";

import { ToastContainer, Toast } from "react-bootstrap";

function AutohideExample(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <ToastContainer className="p-3" position="bottom-end" style={{ zIndex: 1 }}>
      <Toast
        bg={props.color}
        onClose={() => setShow(false)}
        show={show}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.header}</strong>
          <small>Just Now</small>
        </Toast.Header>
        <Toast.Body>{props.msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AutohideExample;
