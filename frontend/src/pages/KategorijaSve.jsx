import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Kategorije({ handleFilterByCategory, handleShowAll, handleFilterByPrice, minPrice, maxPrice }) {
  const [kategorije, setKategorije] = useState([]);

  useEffect(() => {
    handleShowAll();
    fetchKategorije();
  }, []);

  const fetchKategorije = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://localhost:5001/api/kategorija/kategorije_all", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setKategorije(response.data);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja kategorija:", error);
    }
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    handleFilterByPrice(minPrice, maxPrice);
  };

  return (
    <div className="kategorije">
      <br /><br />
      <Link className="show-all-button" onClick={handleShowAll}>- Prikaži sve artikle</Link>
      <ul>
        {kategorije.map((kategorija) => (
          <li key={kategorija.id}>
            <Link className="btnArtikli" onClick={() => handleFilterByCategory(kategorija.id)}>
              - {kategorija.naziv}
            </Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handlePriceFilter}>
        <label htmlFor="minPrice" className="form-label">Minimalna cijena</label>
        <input type="number" className="form-control" name="minPrice" min="0" step="0.01" value={minPrice} onChange={(e) => handleFilterByPrice(e.target.value, maxPrice)} />
        
        <label htmlFor="maxPrice" className="form-label">Maksimalna cijena</label>
        <input type="number" className="form-control" name="maxPrice" min="0" step="0.01" value={maxPrice} onChange={(e) => handleFilterByPrice(minPrice, e.target.value)} />
        
        <br />
        <button className="btn btn-dark" type="submit">Filtriraj</button>
      </form>
    </div>
  );
}

export default Kategorije;