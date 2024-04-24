import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const addDepartment=createAsyncThunk("adddepartment",async(data)=>{
    const response=await fetch("http://dn.deeds.services/api/department",{
        method:"POST",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
})

export const updateDepartment=createAsyncThunk("updatedepartment",async(data)=>{
    const response=await fetch("http://dn.deeds.services/api/department?id="+data.id,{
        method:"PUT",
        headers:{Accept:"application/json","Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
})

export const getDepartments=createAsyncThunk("getdepartments",async()=>{
    try {
        const response=await fetch("http://dn.deeds.services/api/department");
        return response.json();
    } catch (error) {
        
    }
    
})

export const getDepartmentByid=createAsyncThunk("getdepartmentbyid",async(id)=>{
    try {
        const response=await fetch("http://dn.deeds.services/departmentbyid?id="+id);
        return response.json();
    } catch (error) {
        
    }
    
})

export const ActiveInactive=createAsyncThunk("activeinactive",async(id)=>{
    try {
        const response=await fetch("http://dn.deeds.services/department/activeinactive?id="+id);
        return response.json();
    } catch (error) {
        
    }
    
})

const departmentSlice=createSlice({
    name:"department",
    initialState:{data:[],editData:[],msg:"",response:"",isSuccess:false,loading:false,isUpdate:false,isDelete:false},
    reducers:{
        clearStateDepartment(state){
            state.msg="";
            state.response="";
            state.isSuccess=false;
            state.isUpdate=false;
            state.isDelete=false;
            state.editData=[];
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
        builder.addCase(updateDepartment.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(updateDepartment.fulfilled,(state,action)=>{
            state.loading=false;
            state.msg="Updated Successfully !!";
            state.response="success";
            state.isUpdate=true;
        }),
        builder.addCase(updateDepartment.rejected,(state,action)=>{
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
        }),
        builder.addCase(getDepartmentByid.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getDepartmentByid.fulfilled,(state,action)=>{
            state.loading=false;
            state.editData=action.payload.status=="404"?[]:action.payload;
        }),
        builder.addCase(getDepartmentByid.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        }),
        builder.addCase(ActiveInactive.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(ActiveInactive.fulfilled,(state,action)=>{
            state.loading=false;
            state.isDelete=true;
            state.response="success";
            state.msg="Updated Successfully !!";
        }),
        builder.addCase(ActiveInactive.rejected,(state,action)=>{
            state.loading=true;
            state.msg="Something went Wrong !!";
            state.response="danger";
            state.isSuccess=true;
        })
    }

})

export const {clearStateDepartment}=departmentSlice.actions;
export default departmentSlice.reducer;