import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const addUser=createAsyncThunk("adduser",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/user",{
            method:"POST",
            headers:{Accept:"application/json","Content-Type":"application/json"},
            body:JSON.stringify(data)
        
        });
        return response.json();
    } catch (error) {
        
    }
})

export const getUsers=createAsyncThunk("getusers",async(data)=>{
    try {
        const response=await fetch("https://dn.deeds.services/api/user");
        return response.json();
    } catch (error) {
        
    }
})


const userSlice=createSlice({
    name:"user",
    initialState:{data:[],response:"",msg:"",loading:false,isSuccess:false},
    reducers:{
        clearStateUser(state)
       {
        state.response="",
        state.isSuccess=false,
        state.msg=""
       },
    },
    extraReducers:(builder)=>{
        builder.addCase(addUser.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.data=[];
            state.msg="Added Successfully !!";
            state.response="success";

        }),
        builder.addCase(addUser.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        }),
        builder.addCase(getUsers.pending,(state,action)=>{
            state.loading=true;
        }),
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.isSuccess=true;
            state.data=action.payload;

        }),
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.loading=false;
            state.isSuccess=false;
            state.msg="Something Went Wrong";
            state.response="danger";
        })

    }
})

export const {clearStateUser}=userSlice.actions;
export default userSlice.reducer;