import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBanknote = createAsyncThunk("getBanknote", async () => {
  const res = await axios.get("/bank-note");
  return res?.data;
});

const BanknoteSlice = createSlice({
  name: "banknote",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanknote.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default BanknoteSlice.reducer;
