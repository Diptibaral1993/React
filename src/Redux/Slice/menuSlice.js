import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 export const getMenus=createAsyncThunk("getmenus",async ()=>{
    const response=await fetch("http://dn.deeds.services/api/menu");
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