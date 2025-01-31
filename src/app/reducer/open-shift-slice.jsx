import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOpenShift = createAsyncThunk("getOpenShift", async () => {
  const res = await axios.get("/open-shift");
  return res?.data?.data;
});

const OpenShiftSlice = createSlice({
  name: "openShift",
  initialState: {
    opeData: [],
    opeLoading: false,
    opeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOpenShift.pending, (state) => {
        state.opeLoading = true;
        state.opeError = null;
      })
      .addCase(getOpenShift.fulfilled, (state, action) => {
        state.opeLoading = false;
        state.opeData = action.payload;
      })
      .addCase(getOpenShift.rejected, (state, action) => {
        state.opeLoading = false;
        state.opeError = action.payload;
      });
  },
});

export default OpenShiftSlice.reducer;
