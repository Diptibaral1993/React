import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Components/Loader";
import {
  getAllocations,
  clearStateStock,
  deleteAllocation,
  getAllocationByid,
} from "../../Redux/Slice/stockSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Toastcomponent from "../../Components/Toastcomponent";
import { useNavigate } from "react-router-dom";

function AllocationList() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
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
          <span onClick={() => handleEdit(row.id)}>
            <CiEdit
              style={{ color: "blue", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
            />
          </span>
          <span onClick={() => handleDelete(row.id)}>
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [res, setRes] = useState({ response: "", msg: "", isActive: false });

  const handleEdit = (val) => {
    navigate("add/" + val);
  };

  const handleDelete = (val) => {
    if (confirm("Are You Sure Want To Delete?")) {
      dispatch(deleteAllocation(val));
    }
  };

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
    } else {
      setRecords(allocationdata.allocdata);
    }

    if (allocationdata.isDelete) {
      dispatch(getAllocations());
      toastmessage();
      dispatch(clearStateStock());
    }
  }, [allocationdata]);

  useEffect(() => {
    dispatch(getAllocations());
    dispatch(clearStateStock());
  }, []);

  const toastmessage = () => {
    setRes({
      response: allocationdata.response,
      msg: allocationdata.msg,
      isActive: true,
    });

    setTimeout(() => {
      setRes({
        response: "",
        msg: "",
        isActive: false,
      });
    }, 3000);
  };

  return (
    <>
      {allocationdata.loading && <Loader />}
      {res.isActive && (
        <Toastcomponent
          color={res.response}
          msg={res.msg}
          header="Allocation"
        />
      )}
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
