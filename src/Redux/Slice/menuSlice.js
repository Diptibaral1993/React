import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {API_BASE_URL} from "../../../apiPath";

 export const getMenus=createAsyncThunk("getmenus",async ()=>{
    const response=await fetch(API_BASE_URL+"/api/menu");
    const result=response.json();
    return result;
})
 const menuSlice=createSlice({
    name:'menu',
    initialState:{
        menus:[],
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers: (builder) => {
        
        builder.addCase(getMenus.fulfilled, (state, action) => {
          state.menus=action.payload
          state.loading=false;
        }),
        builder.addCase(getMenus.pending,(state,action)=>{
          state.loading=true;
        })
      },
});


export default menuSlice.reducer;