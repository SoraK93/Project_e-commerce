import { createBrowserRouter, redirect } from "react-router";

import { products, ErrorPage, auth, users } from "../features";
import { handleStoreDispatch, fallback } from "../utilities/route-helper";

// products
const { AllProducts, ProductById } = products.component;
const { getAllProduct, getProductById } = products.api;
// auth
const { Login, Register } = auth.component;
const { logoutAPI } = auth.api;
// users
const { getUser } = users.api;
const { User, ViewProfile, UpdateUserInfo } = users.component;
import { AddProduct, ViewProduct, getProductBySeller } from "../features/users";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./App"),
    HydrateFallback: () => fallback,
    errorElement: <ErrorPage />,
    children: [
      // Homepage
      {
        index: true,
        element: <AllProducts />,
        loader: async () => await handleStoreDispatch({ api: getAllProduct }),
        HydrateFallback: fallback,
      },
      // Product Page
      {
        path: "product",
        children: [
          {
            path: ":productId",
            element: <ProductById />,
            loader: async ({ params }) =>
              await handleStoreDispatch({ api: getProductById, data: params }),
            HydrateFallback: fallback,
          },
        ],
      },
      {
        path: "user",
        element: <User />,
        children: [
          {
            index: true,
            element: <ViewProfile />,
            loader: async () => await handleStoreDispatch({ api: getUser }),
          },
          {
            path: "update",
            element: <UpdateUserInfo />,
          },
          {
            path: "product",
            children: [
              {
                path: "view",
                element: <ViewProduct />,
                loader: async () =>
                  await handleStoreDispatch({ api: getProductBySeller }),
              },
              {
                path: "add",
                element: <AddProduct />,
              },
              {
                path: "edit",
                element: <AddProduct />,
              },
              {
                path: "delete",
                element: <ViewProduct />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        children: [
          // Login Page
          {
            path: "login",
            element: <Login />,
          },
          //  Registration Page
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "logout",
            action: async () => {
              // fetch
              await logoutAPI();
              return redirect("/");
            },
          },
        ],
      },
      {
        path: "cart",
        lazy: () => import("@features/cart/pages/Cart"),
        HydrateFallback: fallback,
      },
      {
        path: "cart/order",
        lazy: () => import("@features/orders/pages/OrderPage"),
        HydrateFallback: () => fallback("Order"),
      },
      {
        path: "cart/order/place-order",
        lazy: () => import("@features/orders/components/PlaceOrder"),
        HydrateFallback: () => fallback("Order"),
      },
      {
        path: "/order",
        lazy: () => import("@features/orders/pages/viewOrdersList"),
        HydrateFallback: () => fallback("Order"),
      },
      {
        path: "/order/:orderId",
        lazy: () => import("@features/orders/pages/viewOrder"),
        HydrateFallback: () => fallback("Order"),
      },
    ],
  },
]);
