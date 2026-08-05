import { useSelector } from "react-redux";
import { selectUserInfo } from "./usersSlice";
import { Link, Outlet } from "react-router";

const User = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div>
      {/* Sidebar */}
      <div>
        <ul>
          <li>
            Profile
            <ul>
              <li>
                <Link to="/user">View profile</Link>
              </li>
              <li>
                <Link to="/user/update" state={{ mode: "profile" }}>
                  Update profile
                </Link>
              </li>
              <li>
                <Link to="/user/update" state={{ mode: "password" }}>
                  Change password
                </Link>
              </li>
            </ul>
          </li>
          {userInfo.is_seller && (
            <li>
              Products
              <ul>
                <li>
                  <Link to="/user/product/view">View my products</Link>
                </li>
                <li>
                  <Link to="/user/product/add">Add new product</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
      {/* Content related to sidebar */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export { User };
