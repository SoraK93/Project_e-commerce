import { useSelector } from "react-redux";
import { selectProduct } from "./productsSlice";

export const ProductById = () => {
  const product = useSelector(selectProduct.list)[0];
  if (!product) return null;

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.seller_name}</p>
    </div>
  );
};
