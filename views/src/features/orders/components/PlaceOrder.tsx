import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderCartStatus } from "../api/orderSlice";
import { cartCleanUpOnOrder } from "@features/cart/api/cartSlice";

const PlaceOrder = (): JSX.Element => {
  // If successful empty cart, if failed dont touch it
  const orderStatus = useSelector(selectOrderCartStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    if (orderStatus == "fulfilled") {
      dispatch(cartCleanUpOnOrder([]))
    }
  }, [])

  return (
    <div>
      <p>Confirmation message: Order placement successful/ failed.</p>
      <button type="button">Homepage</button>
    </div>
  );
};

export const Component = PlaceOrder;
