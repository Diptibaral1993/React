import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../../apiPath";

export const addDesignation=createAsyncThunk("adddesignation",async(data)=>{
    const response=await fetch(API_BASE_URL+"/api/designation",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
})

export const updateDesignation=createAsyncThunk("updatedesignation",async(data)=>{
    const response=await fetch(API_BASE_URL+"/api/designation?id="+data.id,{
        method:"PUT",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
})

export const getDesignations=createAsyncThunk("getdesignations",async()=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/designation");
        return response.json();
    } catch (error) {
        
    }
    
})

export const getDesignationById=createAsyncThunk("getdesignationbyid",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/designation/byid?id="+id);
        return response.json();
    } catch (error) {
        
    }
    
})

export const getDesignationBydepartment=createAsyncThunk("getdesignationbydepartment",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/designation/bydepartment?did="+id);
        return response.json();
    } catch (error) {
        
    }
    
})

export const ActiveInactive=createAsyncThunk("activeinactive",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/designation/activeinactive?id="+id);
        return response.json();
    } catch (error) {
        
    }
    
})

const designationSlice=createSlice({
    name:"designation",
    initialState:{data:[],editData:[],msg:"",response:"",isSuccess:false,loading:false,isUpdate:false,isDelete:false},
    reducers:{
        clearStateDesignation(state){
            state.msg="";
            state.response="";
            state.isSuccess=false;
            state.editData=[];
            state.isDelete=false;
            state.isUpdate=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addDesignation.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addDesignation.fulfilled,(state,action)=>{
            state.loading=false;
            state.msg="Added Successfully !!";
            state.response="success";
            state.isSuccess=true;
        }),
        builder.addCase(addDesignation.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(updateDesignation.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(updateDesignation.fulfilled,(state,action)=>{
            state.loading=false;
            state.msg="Updated Successfully !!";
            state.response="success";
            state.isUpdate=true;
        }),
        builder.addCase(updateDesignation.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(getDesignations.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDesignations.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.data=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDesignations.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(getDesignationBydepartment.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDesignationBydepartment.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.data=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDesignationBydepartment.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(getDesignationById.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDesignationById.fulfilled,(state,action)=>{
            state.loading=false;
            state.editData=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDesignationById.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(ActiveInactive.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(ActiveInactive.fulfilled,(state,action)=>{
            state.loading=false;
            state.isDelete=true;
            state.msg="Updated Successfully !!";
            state.response="success";
        }),
        builder.addCase(ActiveInactive.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        })
    }

})

export const {clearStateDesignation}=designationSlice.actions;
export default designationSlice.reducer;