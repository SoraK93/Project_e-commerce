import { store } from "../app/store";

export const handleStoreDispatch = async ({ api, data }) => {
  await store.dispatch(api(data)).unwrap();
  return null;
};

export const fallback = (path = null) => {
  switch (path) {
    case "Order":
      return (
        <div>
          <p>
            <strong>Loading</strong>
          </p>
          <p>Setting up cart and shipping details.</p>
        </div>
      );
    default:
      return <div>Loading data ...</div>;
  }
};