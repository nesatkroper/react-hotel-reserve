import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCloseShift = createAsyncThunk("getCloseShift", async () => {
  const res = await axios.get("/close-shift");
  return res?.data;
});

const CloseShiftSlice = createSlice({
  name: "closeShift",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCloseShift.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default CloseShiftSlice.reducer;
