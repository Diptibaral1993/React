import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLogin = createAsyncThunk("getLogin", async (data) => {
    try {
        const response=await fetch("https://dn.deeds.services/login?uname="+data.uname+"&pass="+data.pass);
        return response.json();
    } catch (error) { }
})
const initialState = {
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null
}
const loginSlice = createSlice ({
    name: "credentials",
    initialState,
    reducers: {
        clearStateLogin(state) {
                state.response = "",
                state.isSuccess = false,
                state.msg = ""
                state.userinfo=[];
                localStorage.setItem('userinfo',[]);
        },
    }, 
    extraReducers: (builder) => {
        builder.addCase(getLogin.pending, (state, action) => {
            state.loading = true;
            }),
            builder.addCase(getLogin.fulfilled, (state, action) => {

                if(action.payload.status!=400)
                {
                    state.loading = false;
                    state.isSuccess = true;
                    state.userinfo = action.payload;
                    localStorage.setItem('userinfo', JSON.stringify(action.payload)); 
                }
                else
                {
                    state.loading = false;
                    state.isSuccess = false;
                }
                
            }),
            builder.addCase(getLogin.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.msg = "Something Went Wrong";
                state.response = "danger";
            })
    }
})
export const { clearStateLogin } = loginSlice.actions;
export default loginSlice.reducer;