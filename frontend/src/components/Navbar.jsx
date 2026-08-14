import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <h1>Urooj Frozen Food</h1>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/cart">
            Cart </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;