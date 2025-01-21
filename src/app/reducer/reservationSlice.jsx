import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getReservation = createAsyncThunk("getReservation", async () => {
  const res = await axios.get("/reservation");
  return res?.data?.data;
});

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    resData: [],
    resLoading: false,
    resError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReservation.pending, (state) => {
        state.resLoading = true;
        state.resError = null;
      })
      .addCase(getReservation.fulfilled, (state, action) => {
        state.resLoading = false;
        state.resData = action.payload;
      })
      .addCase(getReservation.rejected, (state, action) => {
        state.resLoading = false;
        state.resError = action.payload;
      });
  },
});

export default reservationSlice.reducer;
