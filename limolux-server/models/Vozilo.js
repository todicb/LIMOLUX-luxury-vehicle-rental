const moongose = require("mongoose");

const VoziloSchema = new moongose.Schema({
  marka: String,
  model: String,
  godiste: Number,
  tip: String,
  gorivo: String,
  cena: Number,
  naStanju: Number,
});

const Vozilo = moongose.model("Vozilo", VoziloSchema);
module.exports = Vozilo;
