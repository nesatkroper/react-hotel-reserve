import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRooms = createAsyncThunk("getRooms", async () => {
  const res = await axios.get("/room");
  return res?.data?.data;
});

// const count = async () => {
//   const res = await axios.get("/room-count");
//   console.log(res.data?.count);
// };

// setInterval(() => {
//   count();
// }, 1000);

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooData: [],
    rooLoading: false,
    rooError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRooms.pending, (state) => {
        state.rooLoading = true;
        state.rooError = null;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooLoading = false;
        state.rooData = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.rooLoading = false;
        state.rooError = action.payload;
      });
  },
});

export default roomSlice.reducer;
