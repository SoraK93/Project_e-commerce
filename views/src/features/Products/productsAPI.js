import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../CONSTANT"

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
