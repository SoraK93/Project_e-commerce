import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "@features/Products/productsSlice"
import usersReducer from "@features/users/usersSlice"
import cartReducer from "@features/cart/api/cartSlice";
import orderReducer from "@features/orders/api/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
