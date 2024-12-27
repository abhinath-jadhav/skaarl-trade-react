import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./stockSlice";
import themeSlice from "./themeSlice";
import currentPriceSlice from "./currentPriceSlice";
import safeOrderSlice from "./safeOrderSlice";

export const store = configureStore({
  reducer: {
    stockSlice,
    themeSlice,
    currentPriceSlice,
    safeOrderSlice,
  },
});
