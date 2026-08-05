import { ENDPOINT } from "../../CONSTANT";

const loginAPI = async (formData) => {
  const response = await fetch(`${ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.statusText || "Login failed");
  }
  return data;
};

const registerAPI = async (formData) => {
  const response = await fetch(`${ENDPOINT}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
};

const logoutAPI = async () => {
  const response = await fetch(`${ENDPOINT}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.message || "Internal Error: Error Occurred during logout",
    );
  }

  return data;
};

export { loginAPI, registerAPI, logoutAPI };