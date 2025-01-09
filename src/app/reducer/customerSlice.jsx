import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCustomers = createAsyncThunk("getCustomers", async () => {
  const res = await axios.get("/customer");
  return res?.data;
});

const customerSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default customerSlice.reducer;
