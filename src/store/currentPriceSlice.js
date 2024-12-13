import { createSlice } from "@reduxjs/toolkit";

const currentPriceSlice = createSlice({
  name: "currentPriceSlice",
  initialState: {},
  reducers: {
    updatePrice: (state, action) => {
      const updatedState = { ...state };

      for (const instrumentId in action.payload) {
        if (updatedState[instrumentId]) {
          updatedState[instrumentId] = action.payload[instrumentId]; // Update the object value
        } else {
          updatedState[instrumentId] = action.payload[instrumentId];
        }
      }

      return updatedState;
    },
  },
});

export const { updatePrice } = currentPriceSlice.actions;

export default currentPriceSlice.reducer;
