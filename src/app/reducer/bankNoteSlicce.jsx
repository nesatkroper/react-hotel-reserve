import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBanknote = createAsyncThunk("getBanknote", async () => {
  const res = await axios.get("/bank-note");
  return res?.data?.data;
});

const BanknoteSlice = createSlice({
  name: "banknote",
  initialState: {
    banData: [],
    banLoading: false,
    banError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanknote.pending, (state) => {
        state.banLoading = true;
        state.banError = null;
      })
      .addCase(getBanknote.fulfilled, (state, action) => {
        state.banLoading = false;
        state.banData = action.payload;
      })
      .addCase(getBanknote.rejected, (state, action) => {
        state.banLoading = false;
        state.banError = action.payload;
      });
  },
});

export default BanknoteSlice.reducer;
