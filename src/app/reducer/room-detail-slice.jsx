import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRdetail = createAsyncThunk("getRdetail", async () => {
  const res = await axios.get("/rdetail");
  return res?.data?.data;
});

const rdetailSlice = createSlice({
  name: "rdetail",
  initialState: {
    rdeData: [],
    rdeLoading: false,
    rdeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRdetail.pending, (state) => {
        state.rdeLoading = true;
        state.rdeError = null;
      })
      .addCase(getRdetail.fulfilled, (state, action) => {
        state.rdeLoading = false;
        state.rdeData = action.payload;
      })
      .addCase(getRdetail.rejected, (state, action) => {
        state.rdeLoading = false;
        state.rdeError = action.payload;
      });
  },
});

export default rdetailSlice.reducer;
