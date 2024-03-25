import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const addDesignation=createAsyncThunk("adddesignation",async(data)=>{
    const response=await fetch("https://dn.deeds.services/api/designation",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
})

export const getDesignations=createAsyncThunk("getdesignations",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/designation");
        return response.json();
    } catch (error) {
        
    }
    
})

const designationSlice=createSlice({
    name:"designation",
    initialState:{data:[],msg:"",response:"",isSuccess:false,loading:false},
    reducers:{
        clearStateDesignation(state){
            state.msg="";
            state.response="";
            state.isSuccess=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addDesignation.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addDesignation.fulfilled,(state,action)=>{
            state.loading=false;
            state.msg="Added Successfully !!";
            state.response="success";
            state.isSuccess=true;
        }),
        builder.addCase(addDesignation.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(getDesignations.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDesignations.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.data=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDesignations.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        })
    }

})

export const {clearStateDesignation}=designationSlice.actions;
export default designationSlice.reducer;