import { type JSX } from "react";
import { handleStoreDispatch } from "@utilities/route-helper";
import { getOrderById, getOrderList } from "../api/orderAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderList } from "../api/orderSlice";
import { useNavigate } from "react-router";

const viewOrder = (): JSX.Element => {
  const orderList = useSelector(selectOrderList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickItem = async (orderId) => {
    // on click should display more detail on specific order
    // call GET API using order id
    navigate(`/order/${orderId}`);
  };

  return (
    <>
      <ul>
        {orderList?.map((order) => {
          return (
            <li key={order.id}>
              <div onClick={() => onClickItem(order.id)}>
                <h2>Name: {order.products.name}</h2>
                <p>Price: {order.products.price}</p>
                <p>Quantity: {order.quantity}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const loader = async () => {
  return await handleStoreDispatch({ api: getOrderList, data: undefined });
};

export const Component = viewOrder;
