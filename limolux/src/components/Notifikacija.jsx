import React from "react";
import { NavLink } from "react-router-dom";
import LogForm from "./LogForm";

export const Notifikacija = () => {
  return (
    <div className="notifikacija">
      <p>Ako želite da iznajmite vozilo morate biti prijavljeni</p>
      <NavLink to="/prijava">Prijavite se</NavLink>
    </div>
  );
};
