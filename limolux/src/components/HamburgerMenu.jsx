import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link, useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout as logoutAction } from "../store/features/authSlice";
import LogoImage from "../assets/images/logo.png";


export const HamburgerMenu = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const { isLogged, korisnik } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const postojeciKorisnik = localStorage.getItem("korisnik");
    if (postojeciKorisnik) {
      dispatch(login(JSON.parse(postojeciKorisnik)));
    }
  }, [dispatch]);

  useEffect(()=> {
    setHamburgerMenu(false);
  }, [location])

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("korisnik");
    navigate("/");
  };

  const prikaziMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  return (
    <div className="hamburger-menu" >
      <div className="hamburger-containter">
        <FontAwesomeIcon icon={faBars} className="hamburger-fontawesome" onClick={prikaziMenu} />
        <div className="hamburger-image">
          <img src={LogoImage} alt="logo.png" />
          </div>
      </div>
      {hamburgerMenu && (
       <>
          <div className="top-bar">
            <div className="left-side"></div>
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
   </>
      )}
    </div>
  );
};
