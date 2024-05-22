import React from "react";

export const ClientCard = (props) => {
  const { id, src, name, surname, year, comment } = props;

  return (
    <div className="client">
      <img src={src} alt="£" />
      <p>Ime: {name}</p>
      <p>Prezime: {surname}</p>
      <p>Godina: {year}</p>
      <p className="comment">{comment}</p>
    </div>
  );
};
