import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../CONSTANT";

export interface CreateOrderRequest {
  product_id: string;
  quantity: number;
  address: string;
  payment_status: boolean;
  payment_mode: "Cash" | "Online";
}

export const getOrderList = createAsyncThunk<unknown, void>(
  "order/getOrderList",
  async () => {
    const response = await fetch(`${ENDPOINT}/order/`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) throw new Error("Failed to fetch order list");

    return data;
  },
);

export const getOrderById = createAsyncThunk<unknown, string>(
  "order/getOrderById",
  async (orderId) => {
    const response = await fetch(`${ENDPOINT}/order/${orderId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok)
      return { status: response.status, statusText: response.statusText };

    return data;
  },
);

export const createOrder = createAsyncThunk<unknown, CreateOrderRequest[]>(
  "order/createOrder",
  async (orderData) => {
    const response = await fetch(`${ENDPOINT}/order/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: orderData }),
    });

    const data = await response.json();
    if (!response.ok)
      return { status: response.status, statusText: response.statusText };

    return data;
  },
);
