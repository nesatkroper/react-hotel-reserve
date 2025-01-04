import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/providers/axiosInstance";

export const getUser = createAsyncThunk("getUser", async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;
