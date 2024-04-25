import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../../apiPath";


export const addUser=createAsyncThunk("adduser",async(data)=>{
    try {
        console.log(data);
        const response=await fetch(API_BASE_URL+"/api/user", {
            method: "POST",
            body: data,
            })
        return response.json();
        
    } catch (error) {
        
    }
})

export const getUsers=createAsyncThunk("getusers",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/user");
        return response.json();
    } catch (error) {
        
    }
})

export const getUserbyGodown=createAsyncThunk("getuserbygodown",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/user/bygodown?gwdid="+id);
        return response.json();
    } catch (error) {
        
    }
})

export const getSEbyGodown=createAsyncThunk("getsebygodown",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/user/sebygodown?gwdid="+id);
        return response.json();
    } catch (error) {
        
    }
})

export const getAllSE=createAsyncThunk("getallse",async()=>{
    try {
        const response=await fetch(API_BASE_URL+"/user/allexecutive");
        return response.json();
    } catch (error) {
        
    }
})


const userSlice=createSlice({
    name:"user",
    initialState:{data:[],executive:[],response:"",msg:"",loading:false,isSuccess:false},
    reducers:{
        clearStateUser(state)
       {
        state.response="",
        state.isSuccess=false,
        state.msg=""
       },
    },
    extraReducers:(builder)=>{
        builder.addCase(addUser.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.data=[];
            state.msg="Added Successfully !!";
            state.response="success";

        }),
        builder.addCase(addUser.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        }),
        builder.addCase(getUsers.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.data=action.payload;

        }),
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        }),
        builder.addCase(getUserbyGodown.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getUserbyGodown.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.data=action.payload;

        }),
        builder.addCase(getUserbyGodown.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        }),
        builder.addCase(getSEbyGodown.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getSEbyGodown.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.data=action.payload;

        }),
        builder.addCase(getSEbyGodown.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        }),
        builder.addCase(getAllSE.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getAllSE.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.executive=action.payload;

        }),
        builder.addCase(getAllSE.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        })

    }
})

export const {clearStateUser}=userSlice.actions;
export default userSlice.reducer;