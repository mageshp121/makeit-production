import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: {
      courses: [],
      total: 0,
    },
  },

  reducers: {
    addData: (state, action) => {
      state.cartData = { ...action.payload };
    },
    clearState: (state) => {
      state.cartData = {
        courses: [],
        total: 0,
      };
    },
  },
});


export const { addData,clearState } = cartSlice.actions
export default cartSlice.reducer