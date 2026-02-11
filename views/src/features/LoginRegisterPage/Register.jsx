import { Link } from "react-router";

const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>
      {/* add action attribute to form?? */}
      <form method="POST">
        <div>
          <label htmlFor="name">Name: </label>
          <br />
          <input
            id="name"
            name="name"
            type="name"
            placeholder="Your full name"
            required="true"
          />
        </div>

        <div>
          <label htmlFor="email">Email Address: </label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail address"
            required="true"
            autoComplete="true"
          />
        </div>

        <div>
          <label htmlFor="password">Password (8 characters minimum): </label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required="true"
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number: </label>
          <br />
          <input
            id="phone"
            name="phone"
            type="tel"
            pattern="{0-9}{10}"
            placeholder="123456789"
            required="true"
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <br />
          <textarea
            name="address"
            id=""
            cols="40"
            rows="5"
            placeholder="Enter your delivery address here"
            required="true"
          ></textarea>
        </div>

        <button>Login</button>
      </form>
      <div>
        <Link to="/auth/login">Already registered? Click here</Link>
        <br />
        <Link to="#">Forgot Password</Link>
      </div>
    </div>
  );
};

export { Register };
