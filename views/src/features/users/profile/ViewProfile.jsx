import { useSelector } from "react-redux";
import { selectUserInfo } from "../usersSlice";

const ViewProfile = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      <div>
        <p>User: {userInfo.name}</p>
        <p>Phone: {userInfo.phone}</p>
        <p>Address: {userInfo.address}</p>
      </div>
    </>
  );
};

export { ViewProfile };
