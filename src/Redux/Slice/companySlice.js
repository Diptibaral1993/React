
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const addCompany=createAsyncThunk("addcompany",async (data)=>{
  try {
    const response=await fetch("https://dn.deeds.services/api/company",{
    method:"POST",
    headers:{Accept:"application/json","Content-Type":"application/json"},
    body:JSON.stringify(data)
  });
  return response.json();
  } catch (error) {
    console.log(error)
  }
  
})
  

const companySlice = createSlice({
  name: "company",
  initialState: {data:[],response:"",successmsg:"",msg:"",loading:false},
  reducers: {
  
  },
  extraReducers:(builder)=>{
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.response="success";
      state.data=action.payload;
      state.loading=false;
      state.msg="Company Added !!"
    }),
    builder.addCase(addCompany.rejected,(state,action)=>{
      state.msg="Something Went Wrong !!";
      state.loading=false;
      state.response="danger";
    }),
    builder.addCase(addCompany.pending,(state,action)=>{
      state.loading=true;
      
    })
  }
});


export default companySlice.reducer;
