import React, { useEffect, useState } from "react";
import { Button, Row, Table, Col, Form, FloatingLabel } from "react-bootstrap";
import Datatable from "../../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import { getDealer } from "../../Redux/Slice/dealerSlice";
import Loader from "../../Components/Loader";
import { getGodown } from "../../Redux/Slice/GodownSlice";
import { getCompanies } from "../../Redux/Slice/companySlice";
import { getAllSE } from "../../Redux/Slice/userSlice";
function DealerList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "DEALER",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "COMPANY",
      selector: (row) => row.companyname,
      sortable: true,
    },
    {
      name: "GODOWN",
      selector: (row) => row.godownname,
      sortable: true,
    },
    {
      name: "SALES PERSON",
      selector: (row) => row.saleperson,
      sortable: true,
    },
    {
      name: "MOBILE",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState({ company: "", godown: "", se: "" });

  const dealerData = useSelector((state) => state.dealer);
  const ddlgodown = useSelector((state) => state.godown);
  const ddlcompany = useSelector((state) => state.company);
  const ddlse = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleFilter(event) {
    const newdata = dealerData.data.filter((row) => {
      return (
        row.companyname.includes(event.target.value) ||
        row.phone.includes(event.target.value) ||
        row.saleperson.includes(event.target.value) ||
        row.name.includes(event.target.value) ||
        row.godownname.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  const filterCompany = (event) => {
    const newdata = dealerData.data.filter((row) => {
      return row.companyname.includes(event.target.value);
    });
    console.log(newdata);
    setRecords(newdata);
  };
  const filterGodown = (event) => {
    const newdata = dealerData.data.filter((row) => {
      return row.godownname.includes(event.target.value);
    });
    console.log(newdata);
    setRecords(newdata);
  };
  const filterSe = (event) => {
    const newdata = dealerData.data.filter((row) => {
      return row.saleperson.includes(event.target.value);
    });
    console.log(newdata);
    setRecords(newdata);
  };

  useEffect(() => {
    dispatch(getDealer());
    dispatch(getGodown());
    dispatch(getAllSE());
    dispatch(getCompanies());
  }, []);

  useEffect(() => {
    if (dealerData.data.length != 0) {
      dealerData.data.map((item, index) => {
        setRecords(dealerData.data);
      });
    }
  }, [dealerData]);

  return (
    <>
      {dealerData.loading && <Loader />}
      {dealerData.data != null && (
        <>
          <Row className="justify-content-center">
            <Form.Group as={Col} md={2} sm={2} xs={12} className="mb-3 ">
              <FloatingLabel label="Company">
                <Form.Select
                  required
                  onChange={(e) => {
                    filterCompany(e);
                    setFilter({ ...filter, company: e.target.value });
                  }}
                >
                  <option value="">Select Company</option>
                  {ddlcompany.data.map((item, index) => (
                    <option value={item.companyname} key={index}>
                      {item.companyname}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} md={2} sm={2} xs={12} className="mb-3">
              <FloatingLabel label="Godown">
                <Form.Select
                  required
                  onChange={(e) => {
                    filterGodown(e);
                    setFilter({ ...filter, godown: e.target.value });
                  }}
                >
                  <option value="">Select Company</option>
                  {ddlgodown.data.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} md={2} sm={2} xs={12} className="mb-3">
              <FloatingLabel label="SalesPerson">
                <Form.Select
                  required
                  onChange={(e) => {
                    filterSe(e);
                    setFilter({ ...filter, se: e.target.value });
                  }}
                >
                  <option value="">Select SalesPerson</option>
                  {ddlse.executive.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Datatable
            data={records}
            columns={columns}
            handleFilter={handleFilter}
            hidden="block"
          />
        </>
      )}
    </>
  );
}

export default DealerList;
