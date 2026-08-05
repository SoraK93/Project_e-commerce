import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../usersSlice";
import { updateUser } from "../usersAPI";
import { useLocation, useNavigate } from "react-router";
import { UpdateProfile } from "./UpdateProfile";
import { ChangePassword } from "./ChangePassword";

const UpdateUserInfo = () => {
  const location = useLocation();
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mode = location.state?.mode || "profile";

  const [formData, setFormData] = useState({
    name: userInfo.name,
    phone: userInfo.phone,
    address: userInfo.address,
    is_seller: userInfo.is_seller,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(formData));
    navigate(`/user`);
  };

  return (
    <>
      {mode === "profile" ? (
        <UpdateProfile
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
        />
      ) : (
        <ChangePassword />
      )}
    </>
  );
};

export { UpdateUserInfo };
