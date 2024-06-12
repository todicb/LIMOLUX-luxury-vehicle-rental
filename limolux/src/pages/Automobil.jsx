import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { Notifikacija } from "../components/Notifikacija";
import { Oval } from "react-loader-spinner";
import { Poruka } from "../components/Poruka";

export default function Automobil() {
  const { isLogged, korisnik } = useSelector((state) => state.auth);
  let { voziloid } = useParams();
  const [vozilo, setVozilo] = useState(null);
  const [loader, setLoader] = useState(true);
  const [datumPreuzimanja, setDatumPreuzimanja] = useState(null);
  const [datumVracanja, setDatumVracanja] = useState(null);
  const [cena, setCena] = useState(null);
  const [poruka, setPoruka] = useState(false);
  const navigate = useNavigate();

  const izracunajCenu = (datumPreuzimanja, datumVracanja, cenaPoDanu) => {
    if (datumPreuzimanja && datumVracanja) {
      const razlikaDana =
        (datumVracanja - datumPreuzimanja) / (1000 * 60 * 60 * 24);
      const ukupno = razlikaDana * cenaPoDanu;
      setCena(ukupno);
    }
  };

  const rezervacija = async () => {
    if (datumPreuzimanja && datumVracanja) {
      const rezervacijaPodaci = {
        voziloId: vozilo.id,
        datumPreuzimanja: datumPreuzimanja.toISOString(),
        datumVracanja: datumVracanja.toISOString(),
        korisnickoIme: korisnik.korisnickoIme,
        cena,
        voziloMarka: vozilo.marka,
        voziloModel: vozilo.model,
        voziloGodiste: vozilo.godiste,
        voziloTip: vozilo.tip,
        voziloGorivo: vozilo.gorivo
      };
      setPoruka(true);
      console.log(rezervacijaPodaci);
      try {
        const response = await axios.post(
          "http://localhost:8081/rezervacija",
          rezervacijaPodaci
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/06bde23e-0c06-4bc1-8a9c-ebc4dba4ecea")
      .then((response) => {
        const voziloData = response.data.vozila.find(
          (elem) => elem.id === parseInt(voziloid)
        );
        setVozilo(voziloData);
        setLoader(false);
      })
      .catch((error) => console.log(error));
  }, [voziloid]);

  useEffect(() => {
    if (datumPreuzimanja && datumVracanja) {
      izracunajCenu(datumPreuzimanja, datumVracanja, vozilo.cena);
    }
  }, [datumPreuzimanja, datumVracanja, vozilo]);

  if (loader && !vozilo) {
    return (
      <div className="spinner-container">
        <Oval
          height={90}
          width={90}
          color="silver"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="white"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <main>
      {!isLogged && !korisnik && <Notifikacija></Notifikacija>}
      <div className="automobil-wrapper">
        <div className="automobil-card">
          <div className="automobil-image">
            <img src={vozilo.src} alt="#" />
          </div>
          <div className="automobil-content">
            <img src="../src/assets/images/logo.png" alt="" />
            <p>Marka: {vozilo.marka}</p>
            <p>Model: {vozilo.model}</p>

            <p>Godište: {vozilo.godiste}</p>

            <p>Cena po danu: {vozilo.cena} &#8364;</p>
            <p>Pozovite nas: +381 (0)64 XXX 000</p>
            <div className="datePicker-container">
              <label>
                Od datuma:
                <DatePicker
                  selected={datumPreuzimanja}
                  onChange={(datum) => setDatumPreuzimanja(datum)}
                  selectsStart
                  startDate={datumPreuzimanja}
                  endDate={datumVracanja}
                  dateFormat="dd/MM/yyyy"
                  className="datePicker-input"
                />
              </label>

              <div className="datePicker-container">
                <label>
                  Do datuma:
                  <DatePicker
                    selected={datumVracanja}
                    onChange={(datum) => setDatumVracanja(datum)}
                    selectsEnd
                    startDate={datumPreuzimanja}
                    endDate={datumVracanja}
                    minDate={datumPreuzimanja}
                    dateFormat="dd/MM/yyyy"
                    className="datePicker-input"
                  />
                </label>
              </div>
            </div>
            {cena !== null && (
              <p className="poruka-cena">
                Ukupna cena za odabrani period: {cena.toFixed(2)} &#8364;
              </p>
            )}

            {isLogged && (
              <>
                <button className="rezervisi-button" onClick={rezervacija}>
                  Rezervišite
                </button>
                {poruka && <Poruka />}
              </>
            )}

            <span className="close-span" onClick={() => navigate(-1)}>
              X
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
