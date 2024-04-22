import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../Redux/Slice/itemSlice";
import Loader from "../../Components/Loader";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function itemList() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ITEM NAME",
      selector: (row) => row.name,
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

  const itemData = useSelector((state) => state.item);
  const dipatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = itemData.data.filter((row) => {
      return row.name.includes(event.target.value);
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (itemData.data.length != 0) {
      itemData.data.map((item, index) => {
        setRecords(itemData.data);
      });
    }
  }, [itemData]);

  useEffect(() => {
    dipatch(getItems());
  }, []);

  return (
    <>
      {itemData.loading && <Loader />}
      {itemData.data != null && (
        <Datatable
          data={records}
          columns={columns}
          handleFilter={handleFilter}
          hidden="none"
        />
      )}
    </>
  );
}

export default itemList;
