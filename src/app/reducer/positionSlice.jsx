import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPositions = createAsyncThunk("getPositions", async () => {
  const res = await axios.get("/position");
  return res?.data?.data;
});

const positionSlice = createSlice({
  name: "positions",
  initialState: {
    posData: [],
    posLoading: false,
    posError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPositions.pending, (state) => {
        state.posLoading = true;
        state.posError = null;
      })
      .addCase(getPositions.fulfilled, (state, action) => {
        state.posLoading = false;
        state.posData = action.payload;
      })
      .addCase(getPositions.rejected, (state, action) => {
        state.posLoading = false;
        state.posError = action.payload;
      });
  },
});

export default positionSlice.reducer;
