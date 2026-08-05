import productReducer, { selectProduct } from "./productsSlice";
import { AllProducts } from "./Products";
import { getAllProduct, getProductById } from "./productsAPI";
import { ProductById } from "./ProductById";

export const products = {
  component: { AllProducts, ProductById },
  reducer: productReducer,
  select: selectProduct,
  api: {
    getAllProduct,
    getProductById,
  },
};