import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRooms = createAsyncThunk("getRooms", async () => {
  const res = await axios.get("/room");
  return res?.data;
});

const roomSlice = createSlice({
  name: "rooms",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRooms.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default roomSlice.reducer;
