const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegistrovaniKorisniciModel = require("./models/RegistrovaniKorisnici");
const bcrypt = require("bcrypt");
const Rezervacija = require("./models/Rezervacija");

const app = express();
app.use(express.json());
app.use(cors());

const imeIPrezimeRegex = /^[A-ZŠĐŽĆČ][a-zšđžćč]{2,15}/;
const korisnickoImeRegex = /^[A-Za-z0-9]{3,16}$/;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/;
const telefonRegex =
  /^\+?\d{1,3}?[-.]?\(?(?:\d{2,3})\)?[-.]?\d\d\d[-.]?\d\d\d\d$/;
const lozinkaRegex = /.{6,}/;

mongoose
  .connect("mongodb://localhost:27017/Limolux")
  .then(() => console.log("Povezan sa MongoDB"))
  .catch((error) =>
    console.error("Nije se moguće povezati sa bazom podataka.", error)
  );

app.post("/rezervacija", async (req, res) => {
  try {
    const { voziloId, datumPreuzimanja, datumVracanja, korisnickoIme, cena } =
      req.body;

    const novaRezervacija = new Rezervacija({
      voziloId,
      datumPreuzimanja,
      datumVracanja,
      korisnickoIme,
      cena,
    });

    await novaRezervacija.save();

    res.json({ success: true, message: "Rezervacija uspešno sačuvana!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/prijava", async (req, res) => {
  try {
    const { korisnickoIme, lozinka } = req.body;

    const korisnik = await RegistrovaniKorisniciModel.findOne({
      korisnickoIme,
    });
    if (!korisnik) {
      return res.json("Niste registrovani");
    }

    const lozinkaValidna = await bcrypt.compare(lozinka, korisnik.lozinka);
    if (!lozinkaValidna) {
      return res.json("Pogrešna lozinka");
    }

    res.json("Uspešno");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Greška prilikom prijave" });
  }
});

app.post("/registracija", async (req, res) => {
  try {
    const {
      ime,
      prezime,
      korisnickoIme,
      email,
      telefon,
      drzava,
      pol,
      lozinka,
    } = req.body;

    if (!imeIPrezimeRegex.test(ime)) {
      return res.json({ error: "Uneseno ime nije u ispravnom formatu." });
    }
    if (!imeIPrezimeRegex.test(prezime)) {
      return res.json({ error: "Uneseno prezime nije u ispravnom formatu" });
    }
    if (!korisnickoImeRegex.test(korisnickoIme)) {
      return res.json({ error: "Korisničko ime nije u ispravnom formatu" });
    }
    if (!emailRegex.test(email)) {
      return res.json({ error: "Email nije u ispravnom formatu" });
    }
    if (!telefonRegex.test(telefon)) {
      return res.json({ error: "Telefon nije u ispravnom formatu" });
    }
    if (!lozinkaRegex.test(lozinka)) {
      return res.json({ error: "Loznika mora sadržati više od 6 karaktera" });
    }

    const postojeciKorisnik = await RegistrovaniKorisniciModel.findOne({
      korisnickoIme,
    });
    if (postojeciKorisnik) {
      return res
        .status(400)
        .json({ error: "Korisnik sa tim korisničkim imenom već postoji" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(lozinka, salt);

    const noviKorisnik = new RegistrovaniKorisniciModel({
      ime,
      prezime,
      korisnickoIme,
      email,
      telefon,
      drzava,
      pol,
      lozinka: hashedPassword,
    });

    const savedUser = await noviKorisnik.save();

    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Greška prilikom registracije" });
  }
});

app.listen(8081, () => {
  console.log("Pokrenut je server");
});

app.on("error", (error) => {
  console.log("Greška prilikom startovanja servera", error);
});
