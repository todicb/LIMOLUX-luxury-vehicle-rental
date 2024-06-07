import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/features/authSlice";
export default function LogForm() {
  const { isLogged, korisnik } = useSelector((state) => state.auth);

  const initialData = {
    korisnickoIme: "",
    lozinka: "",
  };
  const [data, setData] = useState(initialData);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const sacuvaniKorisnik = JSON.parse(localStorage.getItem("korisnik"));
    if (sacuvaniKorisnik) {
      dispatch(login(sacuvaniKorisnik));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.clear();
    setData((initialData) => ({
      ...initialData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/prijava", data)
      .then((result) => {
        console.log(result);
        if (result.data === "Uspešno") {
          setInfo("Uspešno ste se prijavili");
          localStorage.setItem(
            "korisnik",
            JSON.stringify({ korisnickoIme: data.korisnickoIme })
          );
          dispatch(login({ korisnickoIme: data.korisnickoIme }));
          setTimeout(() => {
            navigate("/vozila");
          }, 1500);
        } else {
          setInfo(result.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    localStorage.removeItem("korisnik");
    dispatch(logout());
    setData(initialData);
  };

  return (
    <>
      {isLogged && korisnik ? (
        <div className="prijavljen-korisnik">
          <div className="logform">
            <img src="../src/assets/images/logo.png " alt="logo.png"></img>
            <p>
              {korisnik.korisnickoIme}, dobrodošli u LIMOLUX. Uspešno ste se
              prijavili.
            </p>
            <div className="button-wrapper">
              <button onClick={handleLogout}>Odjavite se</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="logform">
            <header>Prijava</header>
            <label htmlFor="korisnickoIme">Korisničko ime</label>
            <input
              type="text"
              name="korisnickoIme"
              id="korisnickoIme"
              value={data.korisnickoIme}
              onChange={handleChange}
              required
            />
            <label htmlFor="lozinka">Lozinka</label>
            <input
              type="password"
              name="lozinka"
              id="lozinka"
              value={data.lozinka}
              onChange={handleChange}
              required
            />
            <div className="button-wrapper">
              <button type="submit">Prijavite se</button>
            </div>
            {info && (
              <p
                className={
                  info === "Uspešno ste se prijavili" ? "success" : "error"
                }
              >
                {info}
              </p>
            )}

            <p>
              * Nemate nalog? Registrujte se{" "}
              <NavLink to="/registracija">ovde</NavLink>
            </p>
          </form>
        </>
      )}
    </>
  );
}
