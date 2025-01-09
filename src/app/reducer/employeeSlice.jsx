import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk("getEmployees", async () => {
  const res = await axios.get("/employees");
  return res?.data;
});

const employeeSlice = createSlice({
  name: "employees",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default employeeSlice.reducer;
