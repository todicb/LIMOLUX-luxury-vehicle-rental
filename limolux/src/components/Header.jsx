import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
      <div className="top-bar">
        <div className="left-side">
          <Link to="/">
            <img src="src/assets/images/logo.png" alt="logo.png" />
          </Link>
        </div>
        <div className="right-side">
          <p className="email">office@limoluxbelgrade.com</p>
          <div className="phone-number">+381 (0)64 XXX 000</div>
        </div>
      </div>
      <div className="bottom-bar">
        <nav className="nav">
          <Link to="/">Početna</Link>
          <NavLink to="registracija">Registracija</NavLink>
          <NavLink to="login">Login</NavLink>
          <NavLink to="vozila">Vozila</NavLink>
          <NavLink to="kontakt">Kontakt</NavLink>
        </nav>
      </div>
      </div>
    </header>
  );
}
