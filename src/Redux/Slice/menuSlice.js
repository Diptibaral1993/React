import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 export const getMenus=createAsyncThunk("getmenus",async ()=>{
    const response=await fetch("https://dn.deeds.services/api/menu");
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
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getMenus.fulfilled, (state, action) => {
          // Add user to the state array
          state.menus=action.payload
        })
      },
});


export default menuSlice.reducer;