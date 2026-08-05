import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../CONSTANT";

const getUser = createAsyncThunk("users/getUser", async () => {
  try {
    const response = await fetch(`${ENDPOINT}/user/`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error(error);
  }
});

const updateUser = createAsyncThunk("users/updateUser", async (updateData) => {
  try {
    const response = await fetch(`${ENDPOINT}/user/update`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error(error);
  }
});

const getEmail = async () => {
  const response = await fetch(`${ENDPOINT}/user/email`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  return data.email;
};

const changeUserPassword = async ({ old_password, new_password }) => {
  const response = await fetch(`${ENDPOINT}/user/change-password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ old_password, new_password }),
  });

  if (!response.ok) {
    throw new Error(response.statusText || "Failed to change password");
  }
  const data = await response.json();

  return data.message;
};

export { getUser, updateUser, getEmail, changeUserPassword };
