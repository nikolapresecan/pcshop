import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DodajArtikl({ isAuthenticated, userDetails }) {
  const [naziv, setNaziv] = useState("");
  const [opis, setOpis] = useState("");
  const [jmj, setJmj] = useState("");
  const [jedCijena, setJedCijena] = useState("");
  const [kolicina, setKolicina] = useState("");
  const [kategorijaId, setKategorijaId] = useState("");
  const [error, setError] = useState(null);
  const [kategorije, setKategorije] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategorije = async () => {
      if (isAuthenticated && (userDetails.roles.includes('Zaposlenik') || userDetails.roles.includes('Administrator'))) {
        try {
          const response = await axios.get('https://localhost:5001/api/kategorija/kategorije_all', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setKategorije(response.data);
          setError(null); 
        } catch (error) {
          console.error('Error fetching categories:', error);
          setError('Error fetching categories');
        }
      } else {
        setError('Access denied'); 
      }
    };

    fetchKategorije();
  }, [isAuthenticated, userDetails.roles]); 

  const validateInput = () => {
    if (!naziv || !opis || !jmj || !jedCijena || !kolicina || !kategorijaId) {
      setError("Molimo popunite sva polja.");
      return false;
    }
    if (parseFloat(jedCijena) < 0 || parseInt(kolicina) < 0) {
      setError("Jedinična cijena i količina ne mogu biti manje od nule.");
      return false;
    }
    return true;
  };

  const handleDodajArtikl = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    const potvrda = window.confirm("Jeste li sigurni da želite dodati novi artikl?");
    if (!potvrda) {
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:5001/api/artikl/add_artikl",
        {
          Naziv: naziv,
          Opis: opis,
          Jmj: jmj,
          JedCijena: parseFloat(jedCijena),
          Kolicina: parseInt(kolicina),
          KategorijaId: parseInt(kategorijaId),
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      console.log("Artikl uspješno dodan:", response.data);
      alert("Novi artikl je uspješno dodan!");
      setRedirect(true);
      setError(null);
      setNaziv("");
      setOpis("");
      setJmj("");
      setJedCijena("");
      setKolicina("");
      setKategorijaId("");
    } catch (error) {
      console.error("Greška pri dodavanju artikla:", error);
      setError("Došlo je do pogreške pri dodavanju artikla!");
    }
  };

  if (redirect) {
    navigate('/artikli');
  }

  return (
    <div className="container">
      <form onSubmit={handleDodajArtikl}>
        <h4 className="text-center mb-4">Dodaj novi artikl</h4>
        {error && <p style={{ color: 'red' }} className='text-center'>{error}</p>}
        <div className="d-flex mb-3">
          <div className="w-50 me-3">
            <label htmlFor="naziv" className="form-label">Naziv</label>
            <input type="text" className="form-control" id="naziv" value={naziv} onChange={(e) => setNaziv(e.target.value)} />
          </div>
          <div className="w-50">
            <label htmlFor="opis" className="form-label">Opis</label>
            <textarea rows={3} className="form-control" id="opis" value={opis} onChange={(e) => setOpis(e.target.value)} />
          </div>    
        </div>
        <div className="d-flex mb-3">
          <div className="w-50 me-3">
            <label htmlFor="jmj" className="form-label">Jedinica mjere</label>
            <input type="text" className="form-control" id="jmj" value={jmj} onChange={(e) => setJmj(e.target.value)} />
          </div>
          <div className="w-50">
            <label htmlFor="jedCijena" className="form-label">Jedinična cijena</label>
            <input type="number" className="form-control" id="jedCijena" step="0.01" min="0" value={jedCijena} onChange={(e) => setJedCijena(e.target.value)} />
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className="w-50 me-3">
            <label htmlFor="kolicina" className="form-label">Količina</label>
            <input type="number" className="form-control" id="kolicina" min="0" value={kolicina} onChange={(e) => setKolicina(e.target.value)} />
          </div>
          <div className="w-50">
            <label htmlFor="kategorija" className="form-label">Kategorija</label>
            <select value={kategorijaId} className="form-control" id="kategorija" onChange={(e) => setKategorijaId(e.target.value)} >
              <option value="">Odaberite kategoriju</option>
              {kategorije.map((kategorija) => (
                <option key={kategorija.id} value={kategorija.id}>
                  {kategorija.naziv}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button className="w-50 btn btn-lg btn-dark mt-3" type="submit">Dodaj</button>
        </div>
      </form>
    </div>
  );
}

export default DodajArtikl;