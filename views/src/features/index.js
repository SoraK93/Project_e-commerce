import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { ErrorPage } from "./ErrorPage/error";

import productReducer, { selectProduct } from "./Products/productsSlice";
import { AllProducts } from "./Products/Products";
import { getAllProduct, getProductById } from "./Products/productsAPI";
import { ProductById } from "./Products/ProductById";
const products = {
  component: { AllProducts, ProductById },
  reducer: productReducer,
  select: selectProduct,
  api: {
    getAllProduct,
    getProductById,
  },
};

import { Login } from "./LoginRegisterPage/Login";
import { Register } from "./LoginRegisterPage/Register";
const auth = {
  component: { Login, Register },
};

export { Footer, Header, ErrorPage, products, auth };
