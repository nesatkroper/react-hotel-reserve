import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPositions = createAsyncThunk("getPositions", async () => {
  const res = await axios.get("/positions");
  return res.data;
});

const positionSlice = createSlice({
  name: "departments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositions.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default positionSlice.reducer;
