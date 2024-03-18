
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const companySlice = createSlice({
  name: "company",
  initialState: [{response:"",msg:""}],
  reducers: {
    addCompany: (state, action) => {
      //
      axios.post('https://dn.deeds.services/api/company', action.payload)
        .then(function (response) {
          //console.log(response.data);
          state.response="true";

        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

export const { addCompany } = companySlice.actions;
export default companySlice.reducer;
