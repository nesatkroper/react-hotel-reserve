import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk("getEmployees", async () => {
  const res = await axios.get("/employees");
  return res?.data?.data;
});

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    empData: [],
    empLoading: false,
    empError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.empLoading = true;
        state.empError = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.empLoading = false;
        state.empData = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.empLoading = false;
        state.empError = action.payload;
      });
  },
});

export default employeeSlice.reducer;
