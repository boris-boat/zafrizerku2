import React from "react";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
const Item = (props) => {
  const [termin, setTermin] = useState([]);
  useEffect(() => {
    setTermin(props.termin);
  }, []);
  let dani = [
    "Nedelja",
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
  ];

  return (
    <div style={{ width: "400px" }}>
      <Card border="primary">
        <Card.Body>
          <Card.Title>
            {termin.dan} {""}
            {new Date(termin.datum).toLocaleDateString()}
          </Card.Title>
          <Card.Text>
            Vreme : {termin.vreme} <br></br>
            Detalji : {termin.detalji}
          </Card.Text>
          <Button
            variant="danger"
            onClick={() => props.deleteTermin(termin._id)}
          >
            Izbrisi
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Item;
