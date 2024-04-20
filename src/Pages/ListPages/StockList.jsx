import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getStock } from "../../Redux/Slice/stockSlice";
import Loader from "../../Components/Loader";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function StockList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "COMPANY",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "GODOWN",
      selector: (row) => row.godownName,
      sortable: true,
    },
    {
      name: "ITEM",
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: "QNTY",
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

  const stockData = useSelector((state) => state.stock);
  const dispatch = useDispatch();

  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const newdata = stockData.data.filter((row) => {
      return (
        row.companyName.includes(event.target.value) ||
        row.godownName.includes(event.target.value) ||
        row.itemName.includes(event.target.value) ||
        row.quantity.includes(event.target.value)
      );
    });
    setRecords(newdata);
  }

  useEffect(() => {
    if (stockData.data.length != 0) {
      stockData.data.map((item, index) => {
        setRecords(stockData.data);
      });
    }
  }, [stockData]);

  useEffect(() => {
    dispatch(getStock());
  }, []);

  return (
    <>
      {stockData.data != null && (
        <Datatable
          data={records}
          columns={columns}
          handleFilter={handleFilter}
          hidden="block"
        />
      )}

      {stockData.loading && <Loader />}
    </>
  );
}

export default StockList;
