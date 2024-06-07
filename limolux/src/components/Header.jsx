import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/authSlice";
import { useEffect } from "react";
import { login, logout as logoutAction } from "../store/features/authSlice";
import { Navigate } from "react-router-dom";

export default function Header() {
  const { isLogged, korisnik } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const postojeciKorisnik = localStorage.getItem("korisnik");
    if (postojeciKorisnik) {
      dispatch(login(JSON.parse(postojeciKorisnik)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("korisnik");
    navigate("/");
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
            {isLogged && korisnik ? (
              <button className="odjava-btn" onClick={handleLogout}>
                Odjavite se
              </button>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
