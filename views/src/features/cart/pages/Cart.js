import { getUserCart } from "../api/cartAPI";
import { ViewCart } from "./ViewCart";
import { handleStoreDispatch } from "../../../utilities/route-helper";

export const loader = async () => {
  return await handleStoreDispatch({ api: getUserCart });
};

export const Component = ViewCart;
