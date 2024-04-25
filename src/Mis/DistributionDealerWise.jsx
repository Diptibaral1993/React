import React, { useEffect, useState } from "react";
import Datatable from "../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getDistributions } from "../Redux/Slice/stockSlice";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";

function DistributionDealerWise() {
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.DATE,
      sortable: true,
    },
    {
      name: "Dealer",
      selector: (row) => row.DEALER,
      sortable: true,
    },
    {
      name: "Executive",
      selector: (row) => row.EXECUTIVE,
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
      name: "Status",
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
    if (rec.distdata.length != 0) {
      const arr = [];
      rec.distdata.map((item, index) => {
        const ff = {
          ID: index + 1,
          EXECUTIVE: item.executivename,
          DEALER: item.dealername,
          ITEM: item.itemname,
          QUANTITY: item.quantity,
          DATE: item.distributiondt,
          STATUS: item.status == 1 ? "Active" : "Inactive",
        };
        arr.push(ff);
      });
      setRecords(arr);
    }
  }, [rec]);

  useEffect(() => {
    dispatch(getDistributions());
  }, []);
  return (
    <>
      <Datatable
        data={records}
        columns={columns}
        hidden="none"
        excel="none"
        sheetname="Distribution"
        fileName="Distribution"
      />
    </>
  );
}

export default DistributionDealerWise;
