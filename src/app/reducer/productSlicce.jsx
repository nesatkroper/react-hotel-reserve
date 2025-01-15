import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("getProduct", async () => {
  const res = await axios.get("/products");
  return res?.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;
