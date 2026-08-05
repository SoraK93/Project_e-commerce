import { type JSX } from "react";
import { useSelector } from "react-redux";
import { selectOrderList } from "../api/orderSlice";
import { getOrderById } from "../api/orderAPI";
import { handleStoreDispatch } from "@utilities/route-helper";
import { Link } from "react-router";

const viewOrder = (): JSX.Element => {
  const orderInfo = useSelector(selectOrderList)[0];
  const product = orderInfo.products;
  const orderDate = new Date(orderInfo.ordered_on);
  const cancelDate = orderInfo.cancelled_on ? new Date(orderInfo.cancelled_on) : null;

  const handleUpdateButton = () => {};

  const handleCancelButton = () => {};

  return (
    <>
      <div>
        <h2>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h2>
        <p>{product.price}</p>
        <p>{orderInfo.payment_mode}</p>
        <p>{orderInfo.address}</p>
        <p>{orderDate.toDateString()}</p>
        <p>{cancelDate?.toDateString()}</p>
        <button type="button" onClick={handleUpdateButton}>
          Update Order
        </button>
        <button type="button" onClick={handleCancelButton}>
          Cancel Order
        </button>
      </div>
    </>
  );
};

export const loader = async ({ params }) => {
  const { orderId } = params;
  return await handleStoreDispatch({ api: getOrderById, data: orderId });
};

export const Component = viewOrder;
