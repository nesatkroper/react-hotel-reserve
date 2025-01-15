import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPcategory = createAsyncThunk("getPcategory", async () => {
  const res = await axios.get("/product-category");
  return res?.data;
});

const pcategorySlice = createSlice({
  name: "pcategory",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPcategory.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default pcategorySlice.reducer;
