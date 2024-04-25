import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../../apiPath";

export const addDealer=createAsyncThunk("adddealer",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/dealer",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
    } catch (error) {
        
    }  
})

export const getDealer=createAsyncThunk("getdealer",async(data)=>{
    const response=await fetch(API_BASE_URL+"/api/dealer");
    return response.json();
})

export const getDealerByExecutive=createAsyncThunk("getdealerbyexecutive",async(id)=>{
    const response=await fetch(API_BASE_URL+"/dealer/bysalesperson?id="+id);
    return response.json();
})

const dealerSlice=createSlice({
    name:"dealer",
    initialState:{data:[],msg:"",response:"",isSuccess:false,loading:false},
    reducers:{
        clearStateDealer(state){
            state.response="";
            state.isSuccess=false;
            state.msg="";
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addDealer.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addDealer.fulfilled,(state,action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Added Successfully !!!";
            state.isSuccess=true;
        }),
        builder.addCase(addDealer.rejected,(state,action)=>{
            state.loading=false;
            state.response="danger";
            state.msg="Something Went Wrong";
        }),
        builder.addCase(getDealer.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDealer.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDealer.rejected,(state,action)=>{
            state.loading=false;
            state.response="danger";
            state.msg="Something Went Wrong";
        }),
        builder.addCase(getDealerByExecutive.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDealerByExecutive.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDealerByExecutive.rejected,(state,action)=>{
            state.loading=false;
            state.response="danger";
            state.msg="Something Went Wrong";
        })
    }
});

export const {clearStateDealer}=dealerSlice.actions;
export default dealerSlice.reducer;