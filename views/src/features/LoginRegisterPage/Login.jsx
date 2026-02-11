import { Link } from "react-router";

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      {/* add action attribute to form?? */}
      <form method="POST">
        <div>
          <label htmlFor="email">
            Email Address:{" "}
            <input id="email" name="email" type="email" placeholder="E-Mail" required="true" autoComplete="false" />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password: <input id="password" name="password" type="password" required="true" />
          </label>
        </div>

        <button>Login</button>
      </form>
      <div>
        <Link to="/auth/register">New User? Click here</Link>
        <br />
        <Link to="#">Forgot Password</Link>
      </div>
    </div>
  );
};

export { Login };
