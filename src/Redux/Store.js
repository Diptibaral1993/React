import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import companySliceReducer from "./Slice/companySlice";
import menuSliceReducer from "./Slice/menuSlice";


export const store = configureStore({
  reducer: {
    company: companySliceReducer,
    menu:menuSliceReducer,
  },
});
