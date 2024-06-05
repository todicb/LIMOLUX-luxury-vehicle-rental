const mongoose = require("mongoose");

const RegistrovaniKorisniciSchema = new mongoose.Schema({
  ime: { type: String, required: true },
  prezime: { type: String, required: true },
  korisnickoIme: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  telefon: { type: String, required: true },
  drzava: { type: String, required: true },
  pol: { type: String, required: true },
  lozinka: { type: String, required: true },
});

const RegistrovaniKorisniciModel = mongoose.model(
  "RegistrovaniKorisnici",
  RegistrovaniKorisniciSchema
);
module.exports = RegistrovaniKorisniciModel;
