import { NavLink } from "react-router-dom";
export default function LogForm() {
  return (
    <>
      <form action="#" className="logform">
        <header>Prijava</header>
        <label htmlFor="korisnickoIme">Korisničko ime</label>
        <input type="text" name="korisnickoIme" id="korisnickoIme" required />
        <label htmlFor="lozinka">Lozinka</label>
        <input type="password" name="lozinka" id="lozinka" required/>
        <div className="button-wrapper">
        <button type="submit">Prijavite se</button>
        </div>
        <p>
          * Nemate nalog? Registrujte se{" "}
          <NavLink to="/registracija">ovde</NavLink>
        </p>
      </form>
    </>
  );
}
