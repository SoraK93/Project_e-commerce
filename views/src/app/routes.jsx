import { createBrowserRouter } from "react-router";

import App from "./App";
import { products, ErrorPage, auth } from "../features";
import { store } from "./store";

const { AllProducts, ProductById } = products.component;
const { Login, Register } = auth.component;
const { getAllProduct, getProductById } = products.api;

const handleDispatch = async ({ api, id }) => {
  await store.dispatch(api(id)).unwrap();
  return null;
};

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Homepage
      {
        index: true,
        element: <AllProducts />,
        loader: async ({ request }) =>
          await handleDispatch({ api: getAllProduct }),
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
              await handleDispatch({ api: getProductById, id: params }),
            HydrateFallback: fallback,
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
    ],
  },
]);

function fallback() {
  return <div>Loading product data ...</div>;
}
