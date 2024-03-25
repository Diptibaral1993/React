import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const addDepartment=createAsyncThunk("adddepartment",async(data)=>{
    const response=await fetch("https://dn.deeds.services/api/department",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
})

export const getDepartments=createAsyncThunk("getdepartments",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/department");
        return response.json();
    } catch (error) {
        
    }
    
})

const departmentSlice=createSlice({
    name:"department",
    initialState:{data:[],msg:"",response:"",isSuccess:false,loading:false},
    reducers:{
        clearStateDepartment(state){
            state.msg="";
            state.response="";
            state.isSuccess=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addDepartment.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addDepartment.fulfilled,(state,action)=>{
            state.loading=false;
            state.msg="Added Successfully !!";
            state.response="success";
            state.isSuccess=true;
        }),
        builder.addCase(addDepartment.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(getDepartments.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDepartments.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.data=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDepartments.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        })
    }

})

export const {clearStateDepartment}=departmentSlice.actions;
export default departmentSlice.reducer;