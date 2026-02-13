import { configureStore } from "@reduxjs/toolkit";

import { users, products } from "../features";

export const store = configureStore({
  reducer: {
    products: products.reducer,
    users: users.reducer,
  },
});
