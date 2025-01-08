import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDepartments = createAsyncThunk("getDepartments", async () => {
  const res = await axios.get("/department");
  return res.data;
});

const departmentSlice = createSlice({
  name: "departments",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default departmentSlice.reducer;
