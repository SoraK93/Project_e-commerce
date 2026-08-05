import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../CONSTANT";

const getUserCart = createAsyncThunk("cart/getUserCart", async () => {
  const response = await fetch(`${ENDPOINT}/cart/`, {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 204) return { cart: [], message: "Cart empty" };

  const data = await response.json();
  
  return { cart: data.cart };
});

const addToUserCart = createAsyncThunk("cart/addToUserCart", async (cart) => {
  const response = await fetch(`${ENDPOINT}/cart/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Unable to add item to cart.");

  return data;
});

const updateUserCart = createAsyncThunk("cart/updateUserCart", async (cart) => {
  const response = await fetch(`${ENDPOINT}/cart/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Unable to update cart data");

  return { cart: data };
});

const deleteItemUserCart = createAsyncThunk(
  "cart/deleteItemUserCart",
  async (cartId) => {
    const response = await fetch(`${ENDPOINT}/cart/${cartId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Unable to remove item from cart");
    }

    return { cart: cartId };
  },
);

export { getUserCart, addToUserCart, updateUserCart, deleteItemUserCart };
