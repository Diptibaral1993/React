import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const addItem=createAsyncThunk("additem",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/item",{
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

export const getItems=createAsyncThunk("getitems",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/Item");
        return response.json();
    } catch (error) {
        
    }
    
})

const itemSlice=createSlice({
    name:"item",
    initialState:{data:[], loading: false, msg: null,response:"",isSuccess:false },
    reducers:{
        clearStateItem(state){
            state.msg="";
            state.response="";
            state.isSuccess=false;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(addItem.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addItem.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=[],
            state.response="success",
            state.msg="Added Succesfully !!",
            state.isSuccess=true;
        }),
        builder.addCase(addItem.rejected,(state,action)=>{
            state.loading=false;
            state.data=[],
            state.response="danger",
            state.msg="ASOmething Went Wrong !!",
            state.isSuccess=false;
        }),
        builder.addCase(getItems.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getItems.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload,
            state.response="success",
            state.msg="",
            state.isSuccess=true;
        }),
        builder.addCase(getItems.rejected,(state,action)=>{
            state.loading=false;
            state.data=[],
            state.response="danger",
            state.msg="Something Went Wrong !!",
            state.isSuccess=false;
        })
    }
});

export const {clearStateItem}=itemSlice.actions;
export default itemSlice.reducer;