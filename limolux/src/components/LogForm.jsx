import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function LogForm() {
  const initialData = {
    korisnickoIme: "",
    lozinka: "",
  };
  const [data, setData] = useState(initialData);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
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
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setInfo(result.data);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
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
  );
}
