import React, { useEffect, useState } from "react";
import Datatable from "../../Components/Datatable";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../Redux/Slice/itemSlice";
import Loader from "../../Components/Loader";

function itemList() {
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "ITEM NAME",
      selector: (row) => row.name,
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
        />
      )}
    </>
  );
}

export default itemList;
