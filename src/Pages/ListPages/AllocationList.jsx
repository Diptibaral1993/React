import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Components/Loader";
import { getAllocations, clearStateStock } from "../../Redux/Slice/stockSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function AllocationList() {
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
      name: "GODOWN",
      selector: (row) => row.godownname,
      sortable: true,
    },
    {
      name: "EXECUTIVE",
      selector: (row) => row.executivename,
      sortable: true,
    },
    {
      name: "ITEM",
      selector: (row) => row.itemname,
      sortable: true,
    },
    {
      name: "QUANTITY",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "ACTION",
      cell: (row) => (
        <>
          <span>
            <CiEdit
              style={{ color: "blue", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
          <span>
            <MdDelete
              style={{ color: "red", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
        </>
      ),
      sortable: true,
    },
  ];

  const allocationdata = useSelector((state) => state.stock);
  const dipatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = allocationdata.allocdata.filter((row) => {
      return (
        row.companyname.includes(event.target.value) ||
        row.godownname.includes(event.target.value) ||
        row.executivename.includes(event.target.value) ||
        row.itemname.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (allocationdata.allocdata.length != 0) {
      allocationdata.allocdata.map((item, index) => {
        setRecords(allocationdata.allocdata);
      });
    }
  }, [allocationdata]);

  useEffect(() => {
    dipatch(getAllocations());
    dipatch(clearStateStock());
  }, []);

  return (
    <>
      {allocationdata.loading && <Loader />}
      {allocationdata.allocdata != null && (
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

export default AllocationList;
