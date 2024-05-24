import Map from "./Map";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
  return (
    <footer>
      <Map></Map>
      <div className="container">
        <div className="row">
          <Link to="/">
            <img src="../src/assets/images/logo.png" alt="logo2.png" />
          </Link>
        </div>
        <div className="row">
          <div className="col-1">
            <p>LIMOLUX DOO BEOGRAD SAVSKI NASIP 7</p>
            <p>Savski nasip 7, Beograd 11070</p>
            <p>4939 - Prevoz putnika u drumskom saobracaju</p>
          </div>
          <div className="col-2">
            <Link to="/">Početna</Link>
            <NavLink to="registracija">Registracija</NavLink>
            <NavLink to="prijava">Prijava</NavLink>
            <NavLink to="vozila">Vozila</NavLink>
            <NavLink to="kontakt">Kontakt</NavLink>
          </div>
          <div className="col-3">
            <NavLink to="termsandconditions">Terms and Conditions</NavLink>
            <NavLink to="privacypolicy">Privacy policy</NavLink>
          </div>
        </div>
        <div className="social-media">
          <NavLink to="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebook} />
          </NavLink>
          <NavLink to="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </NavLink>
          <NavLink to="https://x.com/i/flow/login">
            <FontAwesomeIcon icon={faTwitter} />
          </NavLink>
        </div>

        <div className="footer-copyright">
          <p>Copyright © 2024 LIMOLUX | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
