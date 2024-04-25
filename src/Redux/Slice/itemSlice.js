import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../../apiPath";

export const addItem=createAsyncThunk("additem",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/item",{
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
        });

        return response.json();
    } catch (error) {
        
    }
});

export const updateItem=createAsyncThunk("updateitem",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/Item?id="+data.id,{
            method:"PUT",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
        });

        return response.json();
    } catch (error) {
        
    }
});

export const activeInactiveItem=createAsyncThunk("activeinactiveitem",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/item/activeinactive?id="+id);
        return response.json();
    } catch (error) {
        
    }
});

export const getItems=createAsyncThunk("getitems",async(data)=>{
    try {
        const response=await fetch(API_BASE_URL+"/api/Item");
        return response.json();
    } catch (error) {
        
    }
    
});

export const getItembyid=createAsyncThunk("getitembyid",async(id)=>{
    try {
        const response=await fetch(API_BASE_URL+"/item/byid?id="+id);
        return response.json();
    } catch (error) {
        
    }
    
})

const itemSlice=createSlice({
    name:"item",
    initialState:{data:[],editdata:[], loading: false, msg: null,response:"",isSuccess:false,isUpdate:false,isDelete:false },
    reducers:{
        clearStateItem(state){
            state.msg="";
            state.response="";
            state.isSuccess=false;
            state.editdata=[];
            state.isUpdate=false;
            state.isDelete=false;

           
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(addItem.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addItem.fulfilled,(state,action)=>{
            
            if(action.payload.status!="404")
            {
                state.response="success",
                state.msg="Added Succesfully !!",
                state.isSuccess=true;
            }
            state.loading=false;
        }),
        builder.addCase(addItem.rejected,(state,action)=>{
            state.loading=false;
            state.data=[],
            state.response="danger",
            state.msg="Something Went Wrong !!",
            state.isSuccess=false;
        }),
        builder.addCase(updateItem.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(updateItem.fulfilled,(state,action)=>{
            
            if(action.payload.status!="404")
            {
                state.response="success",
                state.msg="Updated Succesfully !!",
                state.isUpdate=true;
            }
            state.loading=false;
        }),
        builder.addCase(updateItem.rejected,(state,action)=>{
            state.loading=false;
            state.data=[],
            state.response="danger",
            state.msg="Something Went Wrong !!",
            state.isSuccess=false;
        }),
        builder.addCase(activeInactiveItem.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(activeInactiveItem.fulfilled,(state,action)=>{
            
            state.loading=false;
            state.response="success",
            state.msg="Updated Successfully !!",
            state.isDelete=true;
            
        }),
        builder.addCase(activeInactiveItem.rejected,(state,action)=>{
            state.loading=false;
            state.response="danger",
            state.msg="Something Went Wrong !!",
            state.isDelete=false;
        }),
        builder.addCase(getItems.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload.status!="404"?action.payload:[];
            state.isSuccess=false;
           
        }),
        builder.addCase(getItems.rejected,(state,action)=>{
            state.loading=false;
            state.data=[],
            state.response="danger",
            state.msg="Something Went Wrong !!",
            state.isSuccess=false;
        }),
        builder.addCase(getItembyid.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getItembyid.fulfilled,(state,action)=>{
            state.loading=false;
            state.editdata=action.payload.status!="404"?action.payload:[];
           
        }),
        builder.addCase(getItembyid.rejected,(state,action)=>{
            state.loading=false;
            state.editdata=[],
            state.response="danger",
            state.msg="Something Went Wrong !!",
            state.isSuccess=false;
        })
    }
});

export const {clearStateItem}=itemSlice.actions;
export default itemSlice.reducer;