import { useEffect, useState } from "react";
import { changeUserPassword, getEmail } from "../usersAPI";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // getting user email for accessibility purpose
        const data = await getEmail();
        setEmail(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== newPassword2)
      throw new Error("New and Re-entered password do not match.");

    if (password === newPassword)
      throw new Error("Old and new password should be different.");

    try {
      const result = await changeUserPassword({
        old_password: password,
        new_password: newPassword,
      });
      navigate("/auth/login", { state: { passwordChange: result } });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {errorMessage && <div>Error: {errorMessage}</div>}
      <form method="POST" action={"/user"} onSubmit={handleSubmit}>
        {/* hidden field for browser accessibility - password manager */}
        <input
          type="text"
          name="username"
          id="username"
          value={email || ""}
          autoComplete="username"
          hidden
          readOnly
        />
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <br />
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            autoComplete="current-password"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <br />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword || ""}
            onChange={(e) => setNewPassword(e.target.value)}
            required={true}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="newPassword2">Re-enter Password:</label>
          <br />
          <input
            type="password"
            name="newPassword2"
            id="newPassword2"
            value={newPassword2 || ""}
            onChange={(e) => setNewPassword2(e.target.value)}
            required={true}
            autoComplete="new-password"
          />
        </div>
        <button>Change Password</button>
      </form>
    </>
  );
};

export { ChangePassword };
