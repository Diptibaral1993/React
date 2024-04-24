
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

export const ActiveInactive=createAsyncThunk("activeinactive",async(id)=>{
  const response=await fetch("http://dn.deeds.services/company/activeinactive?id="+id);
  return response.json();
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
  initialState: {data:[],editdata:[],response:"",isSuccess:false,msg:"",loading:false,isDelete:false,isUpdate:false},
  reducers: {
    clearStateCompany(state)
       {
        state.response="",
        state.isSuccess=false,
        state.msg=""
        state.isDelete=false;
        state.isUpdate=false;
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
      state.isUpdate=true;
      
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
      
      state.data=action.payload.status=="404" || action.payload.status=="400"?[]:action.payload;
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

      
    }),

    builder.addCase(ActiveInactive.fulfilled, (state, action) => {

      state.loading=false;
      state.isDelete=true;
      state.response="success",
      state.msg="Updated Successfully !! ";
     
    }),
    builder.addCase(ActiveInactive.rejected,(state,action)=>{
      state.msg="Something Went Wrong !!";
      state.loading=false;
      state.response="danger";
      state.msg="Something went wrong !!";
    }),
    builder.addCase(ActiveInactive.pending,(state,action)=>{
      state.loading=true;
     
      
    })
  }
});

export const {clearStateCompany}=companySlice.actions;
export default companySlice.reducer;
