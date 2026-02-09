import { createAsyncThunk } from "@reduxjs/toolkit";

const ENDPOINT = "http://localhost:43576";

export const getAllProduct = createAsyncThunk(
  "products/getAllProduct",
  async () => {
    const response = await fetch(`${ENDPOINT}/product`);
    const data = await response.json();
    return data;
  },
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async ({ productId }) => {
    const response = await fetch(`${ENDPOINT}/product/${productId}`);
    const data = await response.json();
    return data;
  },
);
