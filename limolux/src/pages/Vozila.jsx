import { useState, useEffect } from "react";
import Card from "../components/Card";
import { Oval } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import VOZILA from "../vozila";

export default function Vozila() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState({ benzin: false, dizel: false });
  const [type, setType] = useState({
    limuzina: false,
    sportski: false,
    suv: false,
  });
  const [loader, setLoader] = useState(true);
  const [mobileFilter, setMobileFilter] = useState(false);

  useEffect(() => {
    setData(VOZILA);
    setLoader(false);
  });

  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value.toLowerCase());
  };

  const handleFuel = (e) => {
    const { name, checked } = e.target;
    setFuel((initialFuel) => ({
      ...initialFuel,
      [name]: checked,
    }));
  };

  const handleType = (e) => {
    const { name, checked } = e.target;
    setType((initialType) => ({
      ...initialType,
      [name]: checked,
    }));
  };

  const handleButton = () => {
    setSearch("");
    setFuel({ benzin: false, dizel: false });
    setType({ limuzina: false, sportski: false, suv: false });
    setMobileFilter(!mobileFilter);
  };

  const filteredData = data.filter((elem) => {
    const marka = elem.marka.toLowerCase().includes(search.toLowerCase());
    const gorivo =
      (!fuel.benzin && !fuel.dizel) ||
      (fuel.benzin && elem.gorivo === "benzin") ||
      (fuel.dizel && elem.gorivo === "dizel");

    const tip =
      (!type.limuzina && !type.sportski && !type.suv) ||
      (type.limuzina && elem.tip.toLowerCase().trim() === "limuzina") ||
      (type.sportski && elem.tip.toLowerCase().trim() === "sportski") ||
      (type.suv && elem.tip.toLowerCase().trim() === "suv");
    return marka && gorivo && tip;
  });

  const prikaziFilter = () => {
    setMobileFilter(!mobileFilter);
  };

  if (setMobileFilter) {
    window.scrollTo(0, 0);
  }

  return (
    <main>
      <div className="vozila-container">
        <div className="filter-icon" onClick={prikaziFilter}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>

        <div className={`filter-side ${mobileFilter ? "show" : ""}`}>
          <div className="filter">
            <h1>Filter</h1>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Unesite marku vozila"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="filter-checkbox">
              <div>
                <span>Benzin</span>
                <input
                  type="checkbox"
                  name="benzin"
                  checked={fuel.benzin}
                  onChange={handleFuel}
                />
              </div>
              <div>
                <span>Dizel</span>
                <input
                  type="checkbox"
                  name="dizel"
                  checked={fuel.dizel}
                  onChange={handleFuel}
                />
              </div>
              <div>
                <span>Limuzina</span>
                <input
                  type="checkbox"
                  name="limuzina"
                  checked={type.limuzina}
                  onChange={handleType}
                />
              </div>
              <div>
                <span>Sportski</span>
                <input
                  type="checkbox"
                  name="sportski"
                  checked={type.sportski}
                  onChange={handleType}
                />
              </div>
              <div>
                <span>SUV</span>
                <input
                  type="checkbox"
                  name="suv"
                  checked={type.suv}
                  onChange={handleType}
                />
              </div>
            </div>
            <button onClick={handleButton}>Reset</button>
          </div>
        </div>

        <section>
          {loader ? (
            <div className="spinner-container">
              <Oval
                height={80}
                width={100}
                color="silver"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="black"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : filteredData.length === 0 ? (
            <p className="no-card">Trentuno nemamo tu marku vozila.</p>
          ) : (
            <div className="card-container">
              {filteredData.map((elem) => {
                return <Card key={elem.id} {...elem}></Card>;
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
