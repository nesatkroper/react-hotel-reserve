import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk("getProduct", async () => {
  const res = await axios.get("/products");
  return res?.data?.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    proData: [],
    proLoading: false,
    proError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.proLoading = true;
        state.proError = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.proLoading = false;
        state.proData = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.proLoading = false;
        state.proError = action.payload;
      });
  },
});

export default productSlice.reducer;
