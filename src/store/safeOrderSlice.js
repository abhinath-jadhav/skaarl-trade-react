import { createSlice } from "@reduxjs/toolkit";

const safeOrderSlice = createSlice({
  name: "safeOrderSlice",
  initialState: false,
  reducers: {
    changeSafeOrder: (state) => !state,
  },
});

export const { changeSafeOrder } = safeOrderSlice.actions;

export default safeOrderSlice.reducer;
