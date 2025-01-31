import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCustomers = createAsyncThunk("getCustomers", async () => {
  const res = await axios.get("/customer");
  return res?.data?.data;
});

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    cusData: [],
    cusLoading: false,
    cusError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.cusLoading = true;
        state.cusError = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.cusLoading = false;
        state.cusData = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.cusLoading = false;
        state.cusError = action.payload;
      });
  },
});

export default customerSlice.reducer;
