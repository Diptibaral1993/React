import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import companySliceReducer from "./Slice/companySlice";
import menuSliceReducer from "./Slice/menuSlice";
import GodownSlice from "./Slice/GodownSlice";
import locationSlice from "./Slice/locationSlice";
import userSlice from "./Slice/userSlice";
import itemSlice from "./Slice/itemSlice";


export const store = configureStore({
  reducer: {
    company: companySliceReducer,
    menu:menuSliceReducer,
    godown:GodownSlice,
    location:locationSlice,
    user:userSlice,
    item:itemSlice
  },
});
