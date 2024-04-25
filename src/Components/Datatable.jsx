import React from "react";
import DataTable from "react-data-table-component";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { utils, writeFileXLSX } from "xlsx";
import { FaFileExcel } from "react-icons/fa";

const customStyle = {
  headRow: {
    style: {
      backgroundColor: "#7ba6de",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "10px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
};

function Datatable(props) {
  const handleDownloadExcel = (dataSource, sheetName, fileName) => {
    const ws = utils.json_to_sheet(dataSource);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, sheetName);
    writeFileXLSX(wb, `${fileName}.xlsx`);
  };

  const downloadExcel = () => {
    handleDownloadExcel(props.data, props.sheetname, props.fileName);
  };

  return (
    <>
      <DataTable
        columns={props.columns}
        data={props.data}
        fixedHeader
        pagination
        highlightOnHover
        customStyles={customStyle}
        actions={
          <Row>
            <Col
              xs="auto"
              style={{
                display: props.handleFilter == undefined ? "none" : "block",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onChange={props.handleFilter}
              />
            </Col>
            <Col
              xs="auto"
              style={{ display: props.hidden, paddingLeft: "0.1rem" }}
            >
              <Link className="btn btn-primary" role="button" to="add">
                +
              </Link>
            </Col>
            <Col
              style={{ display: props.excel == undefined ? "none" : "block" }}
            >
              <Button onClick={downloadExcel} className="btn btn-primary">
                <FaFileExcel />
              </Button>
            </Col>
          </Row>
        }
      ></DataTable>
    </>
  );
}

export default Datatable;
