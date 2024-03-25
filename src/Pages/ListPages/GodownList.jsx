import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getGodown } from "../../Redux/Slice/GodownSlice";
import Loader from "../../Components/Loader";

function GodownList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "GODOWN",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "COMPANY",
      selector: (row) => row.companyname,
      sortable: true,
    },
    {
      name: "CONTACT PERSON",
      selector: (row) => row.contactperson,
      sortable: true,
    },
    {
      name: "E-MAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      sortable: true,
    },
  ];

  const godownData = useSelector((state) => state.godown);
  const dipatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = godownData.data.filter((row) => {
      return (
        row.name.includes(event.target.value) ||
        row.companyname.includes(event.target.values) ||
        row.phone.includes(event.target.value) ||
        row.contactperson.includes(event.target.value) ||
        row.email.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (godownData.data.length != 0) {
      godownData.data.map((item, index) => {
        setRecords(godownData.data);
      });
    }
  }, [godownData]);

  useEffect(() => {
    dipatch(getGodown());
  }, []);

  return (
    <>
      {godownData.data != null && (
        <Datatable
          data={records}
          columns={columns}
          handleFilter={handleFilter}
        />
      )}

      {godownData.loading && <Loader />}
    </>
  );
}

export default GodownList;
