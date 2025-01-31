import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPcategory = createAsyncThunk("getPcategory", async () => {
  const res = await axios.get("/category");
  console.log(res.data);
  return res?.data;
});

const pcategorySlice = createSlice({
  name: "pcategory",
  initialState: {
    pcaData: [],
    pcaLoading: false,
    pcaError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPcategory.pending, (state) => {
        state.pcaLoading = true;
        state.pcaError = null;
      })
      .addCase(getPcategory.fulfilled, (state, action) => {
        state.pcaLoading = false;
        state.pcaData = action.payload;
      })
      .addCase(getPcategory.rejected, (state, action) => {
        state.pcaLoading = false;
        state.pcaError = action.payload;
      });
  },
});

export default pcategorySlice.reducer;
