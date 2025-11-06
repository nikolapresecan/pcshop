import React from "react";
import { Link } from "react-router-dom";

function ArtiklKartica({ artikli, handleSort, sortBy }) {
  return (
    <div className="artikli">  
      <div className="filteri text-end">
        <Link className="btnArtikli me-3" onClick={() => handleSort('name_asc')}>Naziv: A-Z</Link>
        <Link className="btnArtikli me-3" onClick={() => handleSort('name_desc')}>Naziv: Z-A</Link>
        <Link className="btnArtikli me-3" onClick={() => handleSort('price_asc')}>Cijena: od najmanje</Link>
        <Link className="btnArtikli me-3" onClick={() => handleSort('price_desc')}>Cijena: od najveće</Link>
      </div>
      <br />
      <div className="artikli-grid">
        {artikli.map((artikl) => (
          <div className="artikl-kartica" key={artikl.id}>
            <h4>{artikl.naziv}</h4>
            <p>{artikl.opis}</p>
            <p>Cijena: {artikl.jedCijena} €</p>
            <p>Na zalihi {artikl.kolicina} {artikl.jmj}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtiklKartica;

