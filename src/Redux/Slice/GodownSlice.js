
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addGodown = createAsyncThunk("addgodown", async (data) => {
  try {
    const response = await fetch("http://dn.deeds.services/api/godown", {
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

export const getGodown=createAsyncThunk("getgodown",async(data)=>{
  try {
    const response=await fetch("http://dn.deeds.services/api/godown");
    return response.json()
  } catch (error) {
    
  }
});

export const getGodownbyCompany=createAsyncThunk("getgodownbycompany",async(id)=>{
  try {
    const response=await fetch("http://dn.deeds.services/godown/bycompany?compid="+id);
    return response.json()
  } catch (error) {
    
  }
})

const godownSlice = createSlice({
  name: "godown",
  initialState: {data:[], loading: false, msg: null,response:"",isSuccess:false },
  reducers:{
    clearStateGodown(state){
      state.msg="";
      state.response="";
      state.isSuccess=false;
    }
  },
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
      }),
      builder.addCase(getGodown.pending, (state, action) => {
        state.loading = true;
        state.isSuccess=false;
      }),
        builder.addCase(getGodown.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess=true;
         state.data=action.payload.status=="404" || action.payload.status=="400"?[]:action.payload;
          state.response="success";
        }),
        builder.addCase(getGodown.rejected, (state, action) => {
          state.loading = false;
          state.msg = action.payload;
          state.isSuccess=false;

        }),
        builder.addCase(getGodownbyCompany.pending, (state, action) => {
          state.loading = true;
          state.isSuccess=false;
        }),
          builder.addCase(getGodownbyCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.data=action.payload.status=="404" || action.payload.status=="400"?[]:action.payload;
            state.response="success";
          }),
          builder.addCase(getGodownbyCompany.rejected, (state, action) => {
            state.loading = false;
            state.msg = action.payload;
            state.isSuccess=false;
  
          })
  },
});

export const {clearStateGodown}=godownSlice.actions;
export default godownSlice.reducer;
