import { selectCartList } from "@features/cart/api/cartSlice";
import { selectUserInfo } from "@features/users/usersSlice";
import type { JSX, MouseEvent } from "react";
import { useNavigate } from "react-router";
import { createOrder } from "../api/orderAPI";
import { useAppDispatch, useAppSelector } from "@app/hook";

export interface BtnContextInterface {
  btnText: string | null;
  setBtnText: (text: string) => void;
}

interface OrderCartItem {
  id: string;
  quantity: number;
  total: number;
  product: {
    id: string;
    name: string;
  };
}

interface OrderUserInfo {
  address: string;
}

interface CreateOrderRequest {
  product_id: string;
  quantity: number;
  address: string;
  payment_status: boolean;
  payment_mode: "Cash" | "Online";
}

/**
 * A sub-component for the order page.
 * This handles all the product and customer details.
 * User will use this to check and confirm there order.
 * Renders default order page
 * @returns JSX.Element
 */
const OrderPage = (): JSX.Element => {
  const cartList = useAppSelector(selectCartList) as OrderCartItem[];
  const userInfo = useAppSelector(selectUserInfo) as OrderUserInfo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onButtonClick = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();

    const cartData = cartList.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      address: userInfo.address,
      payment_status: false,
      payment_mode: "Cash", // Options: Cash/Online
    })) as CreateOrderRequest[];

    console.log(cartData);
    await dispatch(createOrder(cartData));
    navigate("/cart/order/place-order");
  };

  return (
    <>
      <div>
        <h1>Confirm and update order details here</h1>
        <div>
          <h2>Shipping Address</h2>
          <p>{userInfo.address}</p>
        </div>
        <div>
          <h2>Item in cart</h2>
          <ul>
            {cartList?.map((item) => (
              <li key={item.id}>
                <p>{item.product.name}</p>
                <p>{item.quantity}</p>
                <p>{item.total}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Payment Mode: Cash</h2>
        </div>
      </div>
      <div>
        <p>
          SubTotal ({cartList.length}):{" "}
          {cartList.reduce((total, item) => item.total + total, 0)}
        </p>
        <button type="button" onClick={onButtonClick}>
          Place Order
        </button>
      </div>
    </>
  );
};

export const Component = OrderPage;
