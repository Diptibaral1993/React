import React, { useEffect, useState } from "react";
import Datatable from "../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getStock } from "../Redux/Slice/stockSlice";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

function StockReport() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.COMPANY,
      sortable: true,
    },
    {
      name: "Godown",
      selector: (row) => row.GODOWN,
      sortable: true,
    },
    {
      name: "ITEM",
      selector: (row) => row.ITEM,
      sortable: true,
    },
    {
      name: "QUANTITY",
      selector: (row) => row.QUANTITY,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) =>
        row.STATUS == "Active" ? (
          <TiTick style={{ color: "green", fontSize: "1.3rem" }} />
        ) : (
          <MdBlock style={{ color: "red", fontSize: "1.3rem" }} />
        ),
      sortable: true,
    },
  ];

  const [records, setRecords] = useState([]);
  const dispatch = useDispatch();
  const rec = useSelector((state) => state.stock);

  useEffect(() => {
    if (rec.data.length != 0) {
      const arr = [];
      rec.data.map((item, index) => {
        const ff = {
          ID: item.id,
          COMPANY: item.companyName,
          GODOWN: item.godownName,
          ITEM: item.itemName,
          QUANTITY: item.quantity,
          STATUS: item.status == 1 ? "Active" : "Inactive",
        };
        arr.push(ff);
      });
      setRecords(arr);
    }
  }, [rec]);

  useEffect(() => {
    dispatch(getStock());
  }, []);
  return (
    <>
      <Datatable
        data={records}
        columns={columns}
        hidden="none"
        excel="none"
        sheetname="Stock"
        fileName="StockReport"
      />
    </>
  );
}

export default StockReport;
