import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const customStyle = {
  headRow: {
    style: {
      backgroundColor: "grey",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
};

function Datatable(props) {
  return (
    <DataTable
      columns={props.columns}
      data={props.data}
      fixedHeader
      pagination
      highlightOnHover
      customStyles={customStyle}
      actions={
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={props.handleFilter}
            />
          </Col>
          <Col xs="auto" style={{ display: props.hidden }}>
            <Link className="btn btn-primary" role="button" to="add">
              Add +
            </Link>
          </Col>
        </Row>
      }
    ></DataTable>
  );
}

export default Datatable;
