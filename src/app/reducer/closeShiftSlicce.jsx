import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCloseShift = createAsyncThunk("getCloseShift", async () => {
  const res = await axios.get("/close-shift");
  return res?.data?.data;
});

const CloseShiftSlice = createSlice({
  name: "closeShift",
  initialState: {
    cloData: [],
    cloLoading: false,
    cloError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCloseShift.pending, (state) => {
        state.cloLoading = true;
        state.cloError = null;
      })
      .addCase(getCloseShift.fulfilled, (state, action) => {
        state.cloLoading = false;
        state.cloData = action.payload;
      })
      .addCase(getCloseShift.rejected, (state, action) => {
        state.cloLoading = false;
        state.cloError = action.payload;
      });
  },
});

export default CloseShiftSlice.reducer;
