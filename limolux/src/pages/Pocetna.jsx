import { NavLink } from "react-router-dom";
import CLIENTS from "../clients.js";
import { ClientCard } from "../components/ClientCard";

export default function Pocetna() {
  return (
    <main>
      <div className="image-container-first">
        <div className="container">
          <div className="content-wrapper">
            <h1>Dobrodošli u LimoLux</h1>
            <p>Do željene destinacija uz vrhunski luksuz u vožnji</p>
            <NavLink to="vozila">
              <button className="btn">Rezervišite odmah</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="image-container-second">
        <div className="container">
          <div className="content-wrapper">
            <h1>LimoLux team</h1>
            <p>
              U srcu našeg poslovanja leži predanost pružanju izvanrednih usluga
              našim klijentima. Svaki detalj, od elegantne estetike naših vozila
              do pažljivo odabranog osoblja, pažljivo je osmišljen kako bi
              osigurao da svako putovanje sa LimoLuxom bude ispunjeno udobnošću,
              luksuzom i profesionalizmom. S našim iskusnim timom stručnjaka,
              svaka rezervacija s LimoLuxom postaje bezbrižno iskustvo. Od
              početka do kraja, naša posvećena ekipa stoji vam na raspolaganju
              kako bi osigurala da vaše putovanje bude savršeno organizirano i
              besprijekorno izvedeno.Dobrodošli u svijet LimoLuxa, gdje se
              luksuz susreće s perfekcijom.
            </p>
            <NavLink to="kontakt">
              <button className="btn">kontaktirajte nas</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="image-container-third">
        <div className="container">
          <div className="content-wrapper">
            <h1>Zadovoljni klijenti</h1>
            <div className="clients-wrapper">
              {CLIENTS.map((elem) => {
                return <ClientCard key={elem.id} {...elem}></ClientCard>;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
