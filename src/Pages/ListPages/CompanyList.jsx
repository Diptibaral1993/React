import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../Redux/Slice/companySlice";
import Loader from "../../Components/Loader";

function CompanyList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
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
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      sortable: true,
    },
  ];

  const companydata = useSelector((state) => state.company);
  const dipatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = companydata.data.filter((row) => {
      return (
        row.companyname.includes(event.target.value) ||
        row.phone.includes(event.target.value) ||
        row.contactperson.includes(event.target.value) ||
        row.email.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (companydata.data.length != 0) {
      companydata.data.map((item, index) => {
        setRecords(companydata.data);
      });
    }
  }, [companydata]);

  useEffect(() => {
    dipatch(getCompanies());
  }, []);

  return (
    <>
      {companydata.loading && <Loader />}
      {companydata.data != null && (
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

export default CompanyList;
