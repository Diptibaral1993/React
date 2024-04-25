import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Components/Loader";
import {
  getDistributions,
  clearStateStock,
} from "../../Redux/Slice/stockSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function DistributionList() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "EXECUTIVE",
      selector: (row) => row.executivename,
      sortable: true,
    },
    {
      name: "DEALER",
      selector: (row) => row.dealername,
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
          <span onClick={() => handleEdit(row.id)}>
            <CiEdit
              style={{ color: "blue", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
          <span
            onClick={() => {
              handleDelete(row.id);
            }}
          >
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

  const distributiondata = useSelector((state) => state.stock);
  const dipatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = distributiondata.distdata.filter((row) => {
      return (
        row.dealername.includes(event.target.value) ||
        row.executivename.includes(event.target.value) ||
        row.itemname.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  const handleEdit = (e) => {};

  const handleDelete = (e) => {
    if (confirm("Are You Sure Want To Remove Distribution?")) {
    }
  };

  useEffect(() => {
    dipatch(clearStateStock());
    dipatch(getDistributions());
  }, []);

  useEffect(() => {
    if (distributiondata.distdata.length != 0) {
      distributiondata.distdata.map((item, index) => {
        setRecords(distributiondata.distdata);
      });
    }
  }, [distributiondata]);

  return (
    <>
      {distributiondata.loading && <Loader />}
      {distributiondata.distdata != null && (
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

export default DistributionList;
