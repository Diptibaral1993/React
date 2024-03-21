
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

export const getCompanies=createAsyncThunk("getcompanies",async(data)=>{
  const response=await fetch("http://dn.deeds.services/api/company");
  return response.json();
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
      
    }),


    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.response="success";
      state.data=action.payload;
      state.loading=false;
      state.msg=""
    }),
    builder.addCase(getCompanies.rejected,(state,action)=>{
      state.msg="Something Went Wrong !!";
      state.loading=false;
      state.response="danger";
      state.msg="Something went wrong !!";
    }),
    builder.addCase(getCompanies.pending,(state,action)=>{
      state.loading=true;
      state.msg="";
      state.response="";
      
    })
  }
});


export default companySlice.reducer;
