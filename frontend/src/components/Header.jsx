import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <img src={logo} alt="Kasa" className="logo" />

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            À propos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}