import { configureStore } from "@reduxjs/toolkit";

import sampleReducer from "../features/sampleSlice";

export const store = configureStore({
  reducer: {
    sample: sampleReducer,
  },
});
