import { Link, useSubmit } from "react-router";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../users/usersSlice";
import { selectCartList } from "../cart/api/cartSlice";

const Header = () => {
  const userInfo = useSelector(selectUserInfo);
  const cartList = useSelector(selectCartList);
  const submit = useSubmit();

  const handleClick = () => {
    submit(null, { method: "POST", action: "/auth/logout" });
  };

  return (
    <header>
      <nav className="h-full content-center bg-gray-800 text-gray-200">
        <ul className="flex justify-between gap-8 text-xl">
          <li className="p-2">
            <Link to="/">SKYCART</Link>
          </li>
          <li className="w-xl p-2">
            <div className="flex rounded-md border-2 border-gray-500 bg-gray-200">
              <input
                type="text"
                name="search"
                placeholder="Search Item"
                className="h-9.5/10 w-9/10 rounded-md bg-white ps-3 placeholder:ps-3 placeholder:text-xl placeholder:text-gray-800"
              />
              <span className="material-symbols-outlined m-auto text-gray-500">
                search
              </span>
            </div>
          </li>
          <li className="flex justify-around gap-2 p-1">
            {userInfo?.name ? (
              <>
                <Link
                  to="/cart"
                  className="content-center rounded-2xl px-2 hover:bg-gray-300 hover:text-gray-800"
                >
                  Cart<span>({cartList?.length})</span>
                </Link>
                <Link
                  to="/order"
                  className="content-center rounded-2xl px-2 hover:bg-gray-300 hover:text-gray-800"
                >
                  Order
                </Link>
                <Link
                  to={`/user`}
                  className="content-center rounded-2xl px-2 hover:bg-gray-300 hover:text-gray-800"
                >
                  {userInfo.name}
                </Link>
                <a
                  onClick={handleClick}
                  className="cursor-pointer content-center rounded-2xl px-2 hover:bg-gray-300 hover:text-gray-800"
                >
                  Logout
                </a>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="content-center rounded-2xl px-2 hover:bg-gray-300 hover:text-gray-800"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
