import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/providers/axiosInstance";

export const getUser = createAsyncThunk("getUser", async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    userLoading: false,
    userError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      });
  },
});

export default userSlice.reducer;
