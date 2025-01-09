import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRdetail = createAsyncThunk("getRdetail", async () => {
  const res = await axios.get("/rdetail");
  return res?.data;
});

const rdetailSlice = createSlice({
  name: "rdetail",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRdetail.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default rdetailSlice.reducer;
