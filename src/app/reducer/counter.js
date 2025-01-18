import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.cart = [...state.cart, ...action.payload];
    },
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    updateCart: (state, action) => {
      state.cart = action.payload; // Update cart state
    },
  },
});

export const { addCar, addItem, updateCart } = counterSlice.actions;

export default counterSlice.reducer;
