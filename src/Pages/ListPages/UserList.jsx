import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/Slice/userSlice";
import Loader from "../../Components/Loader";

function UserList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "USERNAME",
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

  const userData = useSelector((state) => state.user);
  const dipatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = userData.data.filter((row) => {
      return (
        row.name.includes(event.target.value) ||
        row.companyname.includes(event.target.value) ||
        row.phone.includes(event.target.value) ||
        row.godownname.includes(event.target.value) ||
        row.email.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (userData.data.length != 0) {
      userData.data.map((item, index) => {
        setRecords(userData.data);
      });
    }
  }, [userData]);

  useEffect(() => {
    dipatch(getUsers());
  }, []);

  return (
    <>
      {userData.data != null && (
        <Datatable
          data={records}
          columns={columns}
          handleFilter={handleFilter}
        />
      )}

      {userData.loading && <Loader />}
    </>
  );
}

export default UserList;
