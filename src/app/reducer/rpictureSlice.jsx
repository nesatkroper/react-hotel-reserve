import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRpicture = createAsyncThunk("getRpicture", async () => {
  const res = await axios.get("/room-picture");
  return res?.data;
});

const rpictureSlice = createSlice({
  name: "rpicture",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRpicture.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default rpictureSlice.reducer;
