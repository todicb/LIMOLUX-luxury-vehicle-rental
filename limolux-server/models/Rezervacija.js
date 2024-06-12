const mongoose = require("mongoose");

const rezervacijaShema = new mongoose.Schema({
  voziloId: {
    type: Number,
    required: true,
  },
  datumPreuzimanja: {
    type: Date,
    required: true,
  },
  datumVracanja: {
    type: Date,
    required: true,
  },
  korisnickoIme: {
    type: String,
    required: true,
  },
  cena: {
    type: Number,
    required: true,
  },
  voziloMarka: {
    type: String,
    required: true,
  },
  voziloModel: {
    type: String,
    required: true,
  },
  voziloGodiste: {
    type: Number,
    required: true,
  },
  voziloTip: {
    type: String,
    required: true,
  },
  voziloGorivo: {
    type: String,
    required: true,
  },
});

const Rezervacija = mongoose.model("Rezervacija", rezervacijaShema);
module.exports = Rezervacija;
