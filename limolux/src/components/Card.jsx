import { NavLink } from "react-router-dom";

export default function Card(props) {
  const { id, src, marka, model, godiste, tip, gorivo, cena } = props;

  return (
    <div className="card-content">
      <p>
        <img src={src} alt="#" />
      </p>
      <p>Marka: {marka}</p>
      <p>Model: {model}</p>
      <p>Godište: {godiste}</p>
      <p>Cena po danu: {cena}	&#8364;</p>
      <NavLink to={`/vozila/${id}`}><button>O vozilu</button></NavLink>
    </div>
  );
}
