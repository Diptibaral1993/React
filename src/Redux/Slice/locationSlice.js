import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getCountry=createAsyncThunk("getcountry",async()=>{
    const response=await fetch("http://dn.deeds.services/country");
    return response.json();
})
export const getState=createAsyncThunk("getstate",async(id)=>{
    const response=await fetch("http://dn.deeds.services/statebycountryid?id="+id);
    return response.json();
})
export const getCity=createAsyncThunk("getcity",async(id)=>{
    const response=await fetch("http://dn.deeds.services/citybystateid?id="+id);
    return response.json();
})
export const getArea=createAsyncThunk("getarea",async(id)=>{
    const response=await fetch("http://dn.deeds.services/areabycityid?id="+id);
    return response.json();
})
export const getPincode=createAsyncThunk("getpincode",async(id)=>{
    const response=await fetch("http://dn.deeds.services/pinbyareaid?id="+id);
    return response.json();
})

export const addLocations=createAsyncThunk("addlocations",async(data)=>{
    try {
        let response=await fetch("https://dn.deeds.services/api/location",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      return response.json();
      } catch (error) {
        console.log(error)
      }
})

const initialState={
    Gcountry:[],
        Gstate:[],
        Gcity:[],
        Garea:[],
        Gpincode:[],
        responsedata:[],
        loading:false,
        msg:"",
        response:"",
        isSuccess:false,
}

const locationSlice=createSlice({
    name:"location",
    initialState,
    reducers:{
       clearStateLocation(state)
       {
        state.response="",
        state.isSuccess=false,
        state.msg=""
       },
    },
    extraReducers:(builder)=>{
        builder.addCase(getCountry.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getCountry.fulfilled,(state,action)=>{
            state.loading=false;
            state.Gcountry=action.payload.status=="404"?[]:action.payload;
            
        }),
        builder.addCase(getCountry.rejected,(state,action)=>{
            state.loading=false;
           
        }),

        //state
        builder.addCase(getState.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getState.fulfilled,(state,action)=>{
            state.loading=false;
            
            state.Gstate=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getState.rejected,(state,action)=>{
            state.loading=false;
           
        }),

        //City
        builder.addCase(getCity.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getCity.fulfilled,(state,action)=>{
            state.loading=false;
            
            state.Gcity=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getCity.rejected,(state,action)=>{
            state.loading=false;
            
        }),

        //area
        builder.addCase(getArea.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getArea.fulfilled,(state,action)=>{
            state.loading=false;
            
            state.Garea=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getArea.rejected,(state,action)=>{
            state.loading=false;
            
        }),

        //Pincode
        builder.addCase(getPincode.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getPincode.fulfilled,(state,action)=>{
            state.loading=false;
            
            state.Gpincode=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getPincode.rejected,(state,action)=>{
            state.loading=false;
            
        })

        //Post All Type Locations elements
        builder.addCase(addLocations.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addLocations.fulfilled,(state,action)=>{
            state.loading=false;
            state.response="success";
            state.msg="Added Successfully !!";
            state.isSuccess=true;
            state.responsedata=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(addLocations.rejected,(state,action)=>{
            state.loading=false;
            state.response="danger";
            state.isSuccess=false;
           
        })
    }
})

export const {clearStateLocation}=locationSlice.actions;
export default locationSlice.reducer;