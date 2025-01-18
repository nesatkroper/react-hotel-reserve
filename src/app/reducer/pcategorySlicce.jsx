import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPcategory = createAsyncThunk("getPcategory", async () => {
  const res = await axios.get("/product-category");
  return res?.data?.data;
});

const pcategorySlice = createSlice({
  name: "pcategory",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pcategorySlice.reducer;
