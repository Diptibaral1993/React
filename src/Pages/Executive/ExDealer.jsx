import React, { useEffect, useState } from "react";
import { Button, Row, Table, Col, Form, FloatingLabel } from "react-bootstrap";
import Datatable from "../../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import { getDealer } from "../../Redux/Slice/dealerSlice";
import Loader from "../../Components/Loader";
import { getGodown } from "../../Redux/Slice/GodownSlice";
import { getCompanies } from "../../Redux/Slice/companySlice";
import { getAllSE } from "../../Redux/Slice/userSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
function ExDealer() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
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
      selector: (row) => (row.status == 1 ? "Active" : "Inactive"),
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
          <Datatable
            data={records}
            columns={columns}
            handleFilter={handleFilter}
            hidden="none"
          />
        </>
      )}
    </>
  );
}

export default ExDealer;
