import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Datatable from "../../Components/Datatable";
import { useSelector, useDispatch } from "react-redux";
import { getDealer } from "../../Redux/Slice/dealerSlice";
import Loader from "../../Components/Loader";
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
  const dealerData = useSelector((state) => state.dealer);
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
  console.log("hi");
  useEffect(() => {
    dispatch(getDealer());
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
        <Datatable
          data={records}
          columns={columns}
          handleFilter={handleFilter}
          hidden="block"
        />
      )}
    </>
  );
}

export default DealerList;
