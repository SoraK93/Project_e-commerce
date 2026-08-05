import { Outlet } from "react-router";

import { getUserCart } from "@features/cart/api/cartAPI";
import { getUser } from "@features/users/usersAPI";
import { handleStoreDispatch } from "@utilities/route-helper";
import { Header } from "@features/Header/Header";
import { Footer } from "@features/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export const loader = async () => {
  await handleStoreDispatch({ api: getUser });
  await handleStoreDispatch({ api: getUserCart });
};

export const Component = App;
