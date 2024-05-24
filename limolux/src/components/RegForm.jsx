import { NavLink } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useState } from "react";

export default function RegForm() {
  const [data, setData] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    drzava: "RS",
    pol: "",
    lozinka: "",
  });

  return (
    <>
      <form action="#" className="regform">
        <header>Registracija</header>
        <div className="first-row">
          <div className="left">
            <label htmlFor="ime">Ime</label>
            <input type="text" name="ime" placeholder="Vaše ime" required />
          </div>
          <div className="right">
            <label htmlFor="prezime">Prezime</label>
            <input
              type="text"
              name="prezime"
              placeholder="Vaše prezime"
              required
            />
          </div>
        </div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Vaš email" required />
        <label htmlFor="telefon">Broj telefona</label>
        <input
          type="text"
          name="telefon"
          placeholder="Vaš broj telefona"
          required
        />
        <label htmlFor="drzava">Država</label>
        <ReactFlagsSelect
          selected={data}
          onSelect={(code) => setData(code)}
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
        <label htmlFor="pol" required>
          Izaberite pol
        </label>
        <select name="pol" id="pol" required>
          <option value="muski">Muško</option>
          <option value="zesnki">Žensko</option>
          <option value="ostalo">Ostalo</option>
        </select>
        <label htmlFor="sifra">Lozinka</label>
        <input
          type="password"
          name="sifra"
          placeholder="Unesite lozinku"
          required
        />

        <button type="submit" className="reg-btn">
          Registruj se
        </button>
        <p>
          * Imate već kreiran nalog? Prijavite se{" "}
          <NavLink to="login">ovde</NavLink>
        </p>
      </form>
    </>
  );
}
