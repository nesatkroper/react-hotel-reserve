import axios from "@/providers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDepartments = createAsyncThunk("getDepartments", async () => {
  const res = await axios.get("/department");
  return res?.data?.data;
});

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    depData: [],
    depLoading: false,
    depError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => {
        state.depLoading = true;
        state.depError = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.depLoading = false;
        state.depData = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.depLoading = false;
        state.depError = action.payload;
      });
  },
});

export default departmentSlice.reducer;
