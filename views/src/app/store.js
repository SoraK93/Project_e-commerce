import { configureStore } from "@reduxjs/toolkit";

import { products } from "../features";

export const store = configureStore({
  reducer: {
    products: products.reducer,
  },
});
