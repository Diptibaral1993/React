import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addGodown = createAsyncThunk("addgodown", async (data) => {
  try {
    const response = await fetch("https://dn.deeds.services/api/godown", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {}
});

const godownSlice = createSlice({
  name: "godown",
  initialState: { loading: false, error: null },
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(addGodown.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(addGodown.fulfilled, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(addGodown.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.payload;
      });
  },
});

export default godownSlice.reducer;
