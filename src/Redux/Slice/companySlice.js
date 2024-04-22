
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const addCompany=createAsyncThunk("addcompany",async (data)=>{
  try {
    const response=await fetch("http://dn.deeds.services/api/company",{
    method:"POST",
    headers:{Accept:"application/json","Content-Type":"application/json"},
    body:JSON.stringify(data)
  });
  return response.json();
  } catch (error) {
    console.log(error)
  }
  
})

export const updateCompany=createAsyncThunk("updatecompany",async (data)=>{
  try {
    const response=await fetch("http://dn.deeds.services/api/company?id="+data.id,{
    method:"PUT",
    headers:{Accept:"application/json","Content-Type":"application/json"},
    body:JSON.stringify(data)
  });
  return response.json();
  } catch (error) {
    console.log(error)
  }
  
})

export const getCompanies=createAsyncThunk("getcompanies",async()=>{
  const response=await fetch("http://dn.deeds.services/api/company");
  return response.json();
})

export const getCompanybyid=createAsyncThunk("getcompanybyid",async(id)=>{
  const response=await fetch("http://dn.deeds.services/companybyid?id="+id);
  return response.json();
})
  
  

const companySlice = createSlice({
  name: "company",
  initialState: {data:[],editdata:[],response:"",isSuccess:false,msg:"",loading:false},
  reducers: {
    clearStateCompany(state)
       {
        state.response="",
        state.isSuccess=false,
        state.msg=""
       },
  },
  extraReducers:(builder)=>{
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.response="success";
      state.data=[];
      state.loading=false;
      state.msg="Branch Added !!"
      state.isSuccess=true;
    }),
    builder.addCase(addCompany.rejected,(state,action)=>{
      state.msg="Something Went Wrong !!";
      state.loading=false;
      state.response="danger";
    }),
    builder.addCase(addCompany.pending,(state,action)=>{
      state.loading=true;
      
    }),


    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.response="success";
      state.data=[];
      state.loading=false;
      state.msg="Branch Updated !!"
      state.isSuccess=true;
      
    }),
    builder.addCase(updateCompany.rejected,(state,action)=>{
      state.msg="Something Went Wrong !!";
      state.loading=false;
      state.response="danger";
      
    }),
    builder.addCase(updateCompany.pending,(state,action)=>{
      state.loading=true;
      
    }),


    builder.addCase(getCompanies.fulfilled, (state, action) => {
      
      state.data=action.payload;
      state.editdata=[];
      state.loading=false;
     
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
      
    }),

    builder.addCase(getCompanybyid.fulfilled, (state, action) => {
      //state.response="success";
      state.editdata=action.payload;
      state.loading=false;
      //state.msg=""
    }),
    builder.addCase(getCompanybyid.rejected,(state,action)=>{
      state.msg="Something Went Wrong !!";
      state.loading=false;
      state.response="danger";
      state.msg="Something went wrong !!";
    }),
    builder.addCase(getCompanybyid.pending,(state,action)=>{
      state.loading=true;
      state.msg="";
      state.response="";
      
    })
  }
});

export const {clearStateCompany}=companySlice.actions;
export default companySlice.reducer;
