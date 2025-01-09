import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getReservation = createAsyncThunk("getReservation", async () => {
  const res = await axios.get("/reservation");
  return res?.data;
});

const reservationSlice = createSlice({
  name: "reservation",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReservation.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default reservationSlice.reducer;
