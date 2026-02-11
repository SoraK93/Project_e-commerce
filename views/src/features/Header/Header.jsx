import { Link } from "react-router"

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>LOGO</li>
          <li>
            <input type="text" placeholder="Search Bar" />
          </li>
          <li>cart icon</li>
          <li><Link to="/auth/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
