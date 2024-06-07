import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../store/features/authSlice";
import { logout } from "../store/features/authSlice";

export default function Header() {
  const { isLogged, korisnik } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("korisnik");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="top-bar">
          <div className="left-side">
            <Link to="/">
              <img src="../src/assets/images/logo.png" alt="logo.png" />
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
            <NavLink to="prijava">Prijava</NavLink>
            <NavLink to="vozila">Vozila</NavLink>
            <NavLink to="kontakt">Kontakt</NavLink>
            {isLogged && korisnik && (
              <button className="odjava-btn" onClick={handleLogout}>
                Odjavite se
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
