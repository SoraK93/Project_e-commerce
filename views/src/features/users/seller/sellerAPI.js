import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../CONSTANT";

const getProductBySeller = createAsyncThunk("", async () => {
  const response = await fetch(`${ENDPOINT}/user/view-product`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error("Internal Server Error");

  if (response.status === 204) throw new Error("No product found");

  return data.products;
});

const addProductBySeller = async (formData) => {
  const response = await fetch(`${ENDPOINT}/product/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Product not created");
  }

  return data;
};

const editProductBySeller = async ({ productId, formData }) => {
  const response = await fetch(`${ENDPOINT}/product/${productId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Bad request");

  if (response.status === 204) return { message: "Update successful" };

  return data;
};

const deleteProductBySeller = async ({ productId }) => {
  const response = await fetch(`${ENDPOINT}/product/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status === 204) return { message: "Delete successful" };

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Bad request");

  return data;
};

export {
  getProductBySeller,
  addProductBySeller,
  editProductBySeller,
  deleteProductBySeller,
};
