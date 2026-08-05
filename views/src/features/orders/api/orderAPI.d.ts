import type { AsyncThunk } from "@reduxjs/toolkit";

export interface CreateOrderRequest {
  product_id: string;
  quantity: number;
  address: string;
  payment_status: boolean;
  payment_mode: "Cash" | "Online";
}

export declare const getOrderList: AsyncThunk<unknown, void, {}>;
export declare const getOrderById: AsyncThunk<unknown, string, {}>;
export declare const createOrder: AsyncThunk<unknown, CreateOrderRequest[], {}>;
