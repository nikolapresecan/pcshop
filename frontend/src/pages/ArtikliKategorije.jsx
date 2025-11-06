import React, { useState, useEffect } from "react";
import axios from "axios";
import ArtiklKartica from "./ArtiklKartica";
import Kategorije from "./KategorijaSve";
import './artikls.css';
import './users.css';
import { Link } from "react-router-dom";

function ArtikliIKategorije({ isAuthenticated, userDetails }) {
  const [artikli, setArtikli] = useState([]);
  const [filteredArtikli, setFilteredArtikli] = useState([]);
  const [artiklCount, setArtiklCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (isAuthenticated && (userDetails.role === "Administrator" || userDetails.role === "Zaposlenik")) {
      handleShowAll();
    }
  }, [isAuthenticated, userDetails]);

  const handleShowAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://localhost:5001/api/artikl/allquantity", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setArtikli(response.data);
      setFilteredArtikli(response.data);
      setArtiklCount(response.data.filter(artikl => artikl.kolicina > 0).length);
      setSelectedCategory(null);
      setMinPrice('');
      setMaxPrice('');
      setSortBy('');
    } catch (error) {
      console.error("Error fetching all articles:", error);
    }
  };

  const handleFilterByCategory = async (kategorijaId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://localhost:5001/api/kategorija/kategorija_id/${kategorijaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const filteredArtikli = response.data.artikli;
      const artiklCount = filteredArtikli.filter(artikl => artikl.kolicina > 0).length;

      setFilteredArtikli(filteredArtikli);
      setArtiklCount(artiklCount);
      setSelectedCategory(kategorijaId);
      setMinPrice('');
      setMaxPrice('');
      setSortBy('');
    } catch (error) {
      console.error(`Error fetching articles for category ID ${kategorijaId}:`, error);
    }
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
    let sortedArtikli = [...filteredArtikli];

    switch (sortBy) {
      case 'name_asc':
        sortedArtikli.sort((a, b) => a.naziv.localeCompare(b.naziv));
        break;
      case 'name_desc':
        sortedArtikli.sort((a, b) => b.naziv.localeCompare(a.naziv));
        break;
      case 'price_asc':
        sortedArtikli.sort((a, b) => a.jedCijena - b.jedCijena);
        break;
      case 'price_desc':
        sortedArtikli.sort((a, b) => b.jedCijena - a.jedCijena);
        break;
      default:
        break;
    }
    setFilteredArtikli(sortedArtikli);
  };

  const handleFilterByPrice = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);

    let filtered = artikli.filter(artikl => {
      return (selectedCategory === null || artikl.kategorijaId === selectedCategory) &&
             (minPrice === '' || artikl.jedCijena >= minPrice) &&
             (maxPrice === '' || artikl.jedCijena <= maxPrice);
    });

    setFilteredArtikli(filtered);
    setArtiklCount(filtered.filter(artikl => artikl.kolicina > 0).length);
  };

  return (
    <div>
      <div className="container">
        <h2 className="mb-4 text-center">Artikli</h2>
        <div className="text-start"><Link className='btnAdd' to='/artikli'>Dodavanje, uređivanje i brisanje artikala</Link></div>
      </div>
      <div className="main">
        <div className="content">
          <Kategorije 
            handleFilterByCategory={handleFilterByCategory} 
            handleShowAll={handleShowAll} 
            handleFilterByPrice={handleFilterByPrice} 
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
          <ArtiklKartica 
            artikli={filteredArtikli} 
            handleSort={handleSort} 
            sortBy={sortBy}
          />
        </div>
      </div>
    </div>
  );
}

export default ArtikliIKategorije;