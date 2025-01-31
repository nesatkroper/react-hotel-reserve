import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRpicture = createAsyncThunk("getRpicture", async () => {
  const res = await axios.get("/room-picture");
  return res?.data?.data;
});

const rpictureSlice = createSlice({
  name: "rpicture",
  initialState: {
    rpiData: [],
    rpiLoading: false,
    rpiError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRpicture.pending, (state) => {
        state.rpiLoading = true;
        state.rpiError = null;
      })
      .addCase(getRpicture.fulfilled, (state, action) => {
        state.rpiLoading = false;
        state.rpiData = action.payload;
      })
      .addCase(getRpicture.rejected, (state, action) => {
        state.rpiLoading = false;
        state.rpiError = action.payload;
      });
  },
});

export default rpictureSlice.reducer;
