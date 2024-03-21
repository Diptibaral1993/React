import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addGodown = createAsyncThunk("addgodown", async (data) => {
  try {
    const response = await fetch("https://dn.deeds.services/api/godown", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {}
});

const godownSlice = createSlice({
  name: "godown",
  initialState: { loading: false, msg: null,response:"",isSuccess:false },
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(addGodown.pending, (state, action) => {
      state.loading = true;
      state.isSuccess=false;
    }),
      builder.addCase(addGodown.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess=true;
        state.msg="Added Successfully !!";
        state.response="success";
      }),
      builder.addCase(addGodown.rejected, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
        state.isSuccess=false;
        state.response="danger";
      });
  },
});

export default godownSlice.reducer;
