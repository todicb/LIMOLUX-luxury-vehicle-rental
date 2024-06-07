import { NavLink, useNavigate } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RegForm() {
  const initialData = {
    ime: "",
    prezime: "",
    korisnickoIme: "",
    email: "",
    telefon: "",
    drzava: "RS",
    pol: "",
    lozinka: "",
  };
  const [data, setData] = useState(initialData);
  const [info, setInfo] = useState("");
  const [infoType, setInfoType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/registracija",
        data
      );
      if (response.data.error) {
        setInfo(response.data.error);
        setInfoType("error");
      } else {
        setInfo("Uspešna registracija, prijavite se");
        setInfoType("success");
        setTimeout(() => {
          navigate("/prijava");
        }, 1500);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setInfo(error.response.data.error);
      } else {
        setInfo("Registracija nije uspešna, pokušajte ponovo");
      }
      setInfoType("error");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.clear();
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="regform">
        <header>Registracija</header>
        <div className="first-row">
          <div className="left">
            <label htmlFor="ime">Ime</label>
            <input
              type="text"
              name="ime"
              placeholder="Vaše ime"
              value={data.ime}
              onChange={handleChange}
              // pattern="^[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}$"
              title="Početno slovo mora biti veliko(3-15 karaktera)"
              required
            />
          </div>
          <div className="right">
            <label htmlFor="prezime">Prezime</label>
            <input
              type="text"
              name="prezime"
              placeholder="Vaše prezime"
              value={data.prezime}
              // pattern="^[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}$"
              title="Početno slovo mora biti veliko(3-15 karaktera)"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <label htmlFor="korisnickoiIme">
          Korisničko ime
          <input
            type="text"
            name="korisnickoIme"
            placeholder="Vaše korisničko ime"
            value={data.korisnickoIme}
            // pattern="^[A-Za-z0-9]{3,16}$"
            title="Primer: Igor / Igor21{br. karktera: 3-16}"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Vaš email"
            value={data.email}
            // pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$"
            title="Molimo unesite ispravnu email adresu"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="telefon">
          Broj telefona
          <input
            type="text"
            name="telefon"
            placeholder="Vaš broj telefona"
            value={data.telefon}
            onChange={handleChange}
            // pattern="^\+?\d{1,3}?[-.]?\(?(?:\d{2,3})\)?[-.]?\d\d\d[-.]?\d\d\d\d$"
            title="Molimo unesite ispravan broj"
            required
          />
        </label>
        <label htmlFor="drzava">
          Država
          <ReactFlagsSelect
            selected={data.drzava}
            onSelect={(code) =>
              setData((prevData) => ({ ...prevData, drzava: code }))
            }
            countries={["RS", "BA", "HR", "DE", "CH"]}
            className="flag-menu"
            /*showSelectedLabel={showSelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled} */
          />
        </label>
        <label htmlFor="pol" required>
          Izaberite pol
        </label>

        <select
          name="pol"
          id="pol"
          value={data.pol}
          onChange={handleChange}
          required
        >
          <option value="" className="hideOption">
            Izaberite pol
          </option>
          <option value="muski">Muško</option>
          <option value="zesnki">Žensko</option>
          <option value="ostalo">Ostalo</option>
        </select>

        <label htmlFor="lozinka">
          Lozinka
          <input
            type="password"
            name="lozinka"
            placeholder="Unesite lozinku"
            value={data.lozinka}
            onChange={handleChange}
            // pattern=".{6,}"
            title="Lozinka mora sadržati minimalno šest karaktera"
            required
          />
        </label>

        <button type="submit" className="reg-btn">
          Registruj se
        </button>
        {info && (
          <p className={infoType === "success" ? "success" : "error"}>{info}</p>
        )}

        <p>
          * Imate već kreiran nalog? Prijavite se{" "}
          <NavLink to="/prijava">ovde</NavLink>
        </p>
      </form>
    </>
  );
}
