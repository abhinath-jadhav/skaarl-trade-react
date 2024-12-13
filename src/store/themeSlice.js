import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: true,
  reducers: {
    changeTheme: (state, action) => action.payload,
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
