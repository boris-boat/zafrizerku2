import React from "react";
import Item from "./components/Item";
import "./App.css";
import { Form, Button, Alert } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
const { REACT_APP_API_URL } = process.env;
function App() {
  let dani = [
    "Nedelja",
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
  ];
  const [termini, setTermini] = useState([]);
  const [datum, setDatum] = useState(new Date());
  const [datumPretraga, setDatumPretraga] = useState(new Date());
  const [vreme, setVreme] = useState("");
  const [detalji, setDetalji] = useState("");
  const [potvrda, setPotvrda] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const getTermine = async () => {
    fetch(REACT_APP_API_URL + "/termini")
      .then((res) => res.json())
      .then((result) => setTermini(result))
      .catch((e) => console.log("Database error  : " + e));
  };

  const addTermin = async () => {
    const latestTermin = await fetch(REACT_APP_API_URL + "/dodajTermin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dan: dani[new Date(datum).getDay()],
        datum: datum,
        vreme: vreme,
        detalji: detalji,
      }),
    })
      .then((res) => res.json())
      .then()
      .catch((e) => {
        console.log(e);
      });

    setTermini([...termini, latestTermin]);
  };
  const deleteTermin = async (id) => {
    await fetch(REACT_APP_API_URL + "/deleteTermin/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));

    const terminiCopy = termini;

    setTermini(terminiCopy.filter((termin) => termin._id !== id));
  };

  useEffect(() => {
    getTermine();
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      {" "}
      <h2>Pretraga po datumu :</h2>
      <DatePicker
        selected={datumPretraga}
        onChange={(date) => {
          setDatumPretraga(date);
        }}
        dateFormat="d MMMM, yyyy "
      />
      <div className="mt-3">
        <h2>Unos novog zakazivanja :</h2>
        <div className="mt-3" style={{ width: "400px" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              Izaberite datum : {""}
              <DatePicker
                selected={datum}
                onChange={(date) => {
                  setDatum(date);
                }}
                dateFormat="d MMMM, yyyy "
              />
              Vreme :
              <Form.Control
                type="text"
                placeholder="Vreme"
                onChange={(e) => setVreme(e.target.value)}
                value={vreme}
              />
              Detalji :
              <Form.Control
                type="text"
                placeholder="Detalji"
                onChange={(e) => setDetalji(e.target.value)}
                value={detalji}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                if (vreme !== "" && detalji !== "") {
                  addTermin();
                  setPotvrda(
                    `Uspesno dodat termin datuma ${datum.toLocaleDateString()}`
                  );
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 4000);
                  setDetalji("");
                  setVreme("");
                } else {
                  setPotvrda("Niste upisali sva polja !");
                  setShowAlert(true);
                  setTimeout(() => {
                    setShowAlert(false);
                  }, 3000);
                }
              }}
            >
              Dodaj
            </Button>
          </Form>
          {potvrda && showAlert === true ? (
            <Alert style={{ width: "400px" }}>{potvrda}</Alert>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mt-5">
        {/* napraviti da filtrira i kad se bira datum */}
        {termini
          ? termini

              .filter((val) => {
                if (
                  new Date(val.datum).getDate() ===
                    new Date(datumPretraga).getDate() &&
                  new Date(val.datum).getMonth() ===
                    new Date(datumPretraga).getMonth()
                ) {
                  return val;
                }
              })
              .map((termin) => {
                return (
                  <Item
                    key={Math.floor(Math.random() * 1000)}
                    termin={termin}
                    deleteTermin={deleteTermin}
                  />
                );
              })
          : "Nema zakazanih poslova"}
      </div>
    </div>
  );
}

export default App;
