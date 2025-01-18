import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSearchCate = createAsyncThunk("getSearchCate", async (id) => {
  const res = await axios.get(`/product-category/${id}`);
  return res?.data;
});

const searchCateSlice = createSlice({
  name: "searchCate",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchCate.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default searchCateSlice.reducer;
