import { createBrowserRouter } from "react-router";

import App from "./App";
import { products, ErrorPage } from "../features";
import { store } from "./store";

const { AllProducts, ProductById } = products.component;
const { getAllProduct, getProductById } = products.api;

const handleDispatch = async ({api, id}) => {
  return await store.dispatch(api(id)).unwrap();
};

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AllProducts />,
        loader: async ({ request }) => {
          return await handleDispatch({api: getAllProduct});
        },
        HydrateFallback: () => <div>Loading product list ...</div>,
      },
      {
        path: "product",
        children: [
          {
            path: ":productId",
            element: <ProductById />,
            loader: async ({ params }) => {
              return await handleDispatch({api: getProductById, id: params});
            },
            HydrateFallback: () => <div>Loading product data ...</div>,
          },
        ],
      },
    ],
  },
]);
