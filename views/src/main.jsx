import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { StrictMode } from "react";

import "./index.css";
import { AppRoutes } from "./app/routes";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRoutes} />
    </Provider>
  </StrictMode>,
);
