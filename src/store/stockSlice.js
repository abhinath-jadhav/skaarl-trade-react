import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stockSlice",
  initialState: "NSE_INDEX|Nifty 50",
  reducers: {
    changeStock: (state, action) => {
      return action.payload;
    },
  },
});

export const { changeStock } = stockSlice.actions;

export default stockSlice.reducer;
