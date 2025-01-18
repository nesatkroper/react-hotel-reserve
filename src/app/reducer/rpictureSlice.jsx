import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRpicture = createAsyncThunk("getRpicture", async () => {
  const res = await axios.get("/room-picture");
  return res?.data?.data;
});

const rpictureSlice = createSlice({
  name: "rpicture",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRpicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRpicture.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRpicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rpictureSlice.reducer;
