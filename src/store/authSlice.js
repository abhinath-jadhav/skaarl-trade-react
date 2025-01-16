import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: false,
  reducers: {
    updateAuth: (state, action) => action.payload,
  },
});

export const { updateAuth } = authSlice.actions;
export default authSlice.reducer;
