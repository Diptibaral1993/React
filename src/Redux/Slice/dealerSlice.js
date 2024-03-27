import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const addDealer=createAsyncThunk("adddealer",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/dealer",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
    } catch (error) {
        
    }  
})

export const getDealer=createAsyncThunk("getdealer",async(data)=>{
    const response=await fetch("https://dn.deeds.services/api/dealer");
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
        })
    }
});

export const {clearStateDealer}=dealerSlice.actions;
export default dealerSlice.reducer;