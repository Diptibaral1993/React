import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveInactive,
  getCompanies,
  clearStateCompany,
} from "../../Redux/Slice/companySlice";
import Loader from "../../Components/Loader";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Toastcomponent from "../../Components/Toastcomponent";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

function CompanyList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "BRANCH",
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
    {
      name: "STATUS",
      selector: (row) =>
        row.status == 1 ? (
          <TiTick style={{ color: "green", fontSize: "1.3rem" }} />
        ) : (
          <MdBlock style={{ color: "red", fontSize: "1.3rem" }} />
        ),
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
              onClick={() => handleEdit(row.id)}
            />
          </span>
          <span>
            <MdDelete
              style={{ color: "red", fontSize: "1.6rem", cursor: "pointer" }}
              className="animationAction"
              onClick={() => handleDelete(row.id)}
            />
          </span>
        </>
      ),
      sortable: true,
    },
  ];

  const companydata = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [res, setRes] = useState({ response: "", msg: "", isActive: false });

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

  const handleEdit = (val) => {
    navigate("/branch/add/" + val);
  };

  const handleDelete = (val) => {
    if (confirm("Are You Sure Want To Delete?")) {
      dispatch(ActiveInactive(val));
    }
  };

  useEffect(() => {
    if (companydata.data.length != 0) {
      companydata.data.map((item, index) => {
        setRecords(companydata.data);
      });

      dispatch(clearStateCompany());
    }

    if (companydata.isUpdate) {
      toastmessage();
      dispatch(clearStateCompany());
    }

    if (companydata.isDelete) {
      dispatch(getCompanies());
      toastmessage();
      dispatch(clearStateCompany());
    }
  }, [companydata]);

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const toastmessage = () => {
    setRes({
      response: companydata.response,
      msg: companydata.msg,
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
      {companydata.loading && <Loader />}
      {res.isActive && (
        <Toastcomponent color={res.response} msg={res.msg} header="Branch" />
      )}
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
