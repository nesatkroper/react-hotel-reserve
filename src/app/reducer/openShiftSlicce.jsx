import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOpenShift = createAsyncThunk("getOpenShift", async () => {
  const res = await axios.get("/open-shift");
  return res?.data;
});

const OpenShiftSlice = createSlice({
  name: "openShift",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOpenShift.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default OpenShiftSlice.reducer;
