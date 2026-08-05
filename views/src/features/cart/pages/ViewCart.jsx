import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCartList } from "../api/cartSlice";
import { Link, useNavigate } from "react-router";
import { deleteItemUserCart, updateUserCart } from "../api/cartAPI";

const ViewCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartList = useSelector(selectCartList);

  if (!cartList?.length) return null;

  const onClickChangeQuantity = (e, product_id) => {
    e.target.textContent === "+"
      ? dispatch(increment(product_id))
      : dispatch(decrement(product_id));
  };

  const onClickSaveCart = async () => {
    const cartToUpdate = cartList.map((cart) => ({
      product_id: cart.product.id,
      quantity: cart.quantity,
    }));
    await dispatch(updateUserCart(cartToUpdate));
    // navigate(-1);
  };

  const onClickCheckout = () => {
    navigate("/cart/order");
  };

  const onClickRemoveItem = async (cartId) => {
    await dispatch(deleteItemUserCart(cartId));
  }

  return (
    <div>
      <ul>
        {cartList.map((cart) => (
          <li key={`cart-${cart.id}`}>
            <p>
              Product Name:{" "}
              <Link to={`/product/${cart.product.id}`}>
                {cart.product.name}
              </Link>
            </p>
            <div>
              <p>Quantity: {cart.quantity}</p>
              <div>
                <button
                  onClick={(e) => onClickChangeQuantity(e, cart.product.id)}
                >
                  -
                </button>
                <button
                  onClick={(e) => onClickChangeQuantity(e, cart.product.id)}
                >
                  +
                </button>
              </div>
            </div>
            <p>Total Price: {cart.total}</p>
            <button onClick={() => onClickRemoveItem(cart.id)}>Remove Item</button>
          </li>
        ))}
      </ul>
      <button onClick={onClickSaveCart}>Save Cart</button>
      <button onClick={onClickCheckout}>Proceed to buy</button>
    </div>
  );
};

export { ViewCart };
