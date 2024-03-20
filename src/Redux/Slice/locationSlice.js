import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getCountry=createAsyncThunk("getcountry",async()=>{
    const response=await fetch("http://dn.deeds.services/country");
    return response.json();
})
export const getState=createAsyncThunk("getstate",async(id)=>{
    const response=await fetch("http://dn.deeds.services/state?id="+id);
    return response.json();
})

const locationSlice=createSlice({
    name:"location",
    initialState:{
        Gcountry:[],
        Gstate:[],
        Gcity:[],
        Garea:[],
        Gpincode:[],
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getCountry.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getCountry.fulfilled,(state,action)=>{
            state.loading=false;
            state.Gcountry=action.payload;
        }),
        builder.addCase(getCountry.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }),
        builder.addCase(getState.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getState.fulfilled,(state,action)=>{
            state.loading=false;
            state.Gstate=action.payload;
        }),
        builder.addCase(getState.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export default locationSlice.reducer;