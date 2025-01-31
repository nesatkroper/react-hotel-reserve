import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSearchCate = createAsyncThunk("getSearchCate", async (id) => {
  const res = await axios.get(`/product-category/${id}`);
  return res?.data?.data;
});

const searchCateSlice = createSlice({
  name: "searchCate",
  initialState: {
    seaData: [],
    seaLoading: false,
    seaError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchCate.pending, (state) => {
        state.seaLoading = true;
        state.seaError = null;
      })
      .addCase(getSearchCate.fulfilled, (state, action) => {
        state.seaLoading = false;
        state.seaData = action.payload;
      })
      .addCase(getSearchCate.rejected, (state, action) => {
        state.seaLoading = false;
        state.seaError = action.payload;
      });
  },
});

export default searchCateSlice.reducer;
