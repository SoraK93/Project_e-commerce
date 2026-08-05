import { useDispatch, useSelector } from "react-redux";
import { selectProductList } from "./productsSlice";
import { addToUserCart } from "../cart/api/cartAPI";
import { Link } from "react-router";

export const ProductById = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProductList)[0];

  if (!product) return null;

  const handleButtonClick = async (e) => {
    try {
      const cartData = {
        product_id: product.id,
        quantity: 1,
      };

      await dispatch(addToUserCart(cartData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{Number(product.price).toLocaleString(undefined, {
        maximumFractionDigits:2, minimumFractionDigits:2
      })}</p>
      <p>
        <Link
          to={`/seller-profile/${product.seller.name}`}
          state={{ sellerId: product.seller.id }}>
          {product.seller.name}
        </Link>
      </p>
      <p>
        {product.in_stock > 10
          ? "In stock"
          : product.in_stock || "Out of Stock"}
      </p>
      <button onClick={handleButtonClick} disabled={!product.in_stock}>
        Add to cart
      </button>
    </div>
  );
};
