import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditArtikl() {
  const { artiklId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [artikl, setArtikl] = useState({
    Id: null,
    Naziv: "",
    Opis: "",
    Jmj: "",
    JedCijena: null,
    Kolicina: null
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtikl = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:5001/api/artikl/artikl_id/${artiklId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setArtikl({
          Id: response.data.id,
          Naziv: response.data.naziv || '',
          Opis: response.data.opis || '',
          Jmj: response.data.jmj || '',
          JedCijena: response.data.jedCijena || null,
          Kolicina: response.data.kolicina || null
        });
      } catch (error) {
        console.error("Error fetching artikl:", error);
      }
    };

    fetchArtikl();
  }, [artiklId]);

  const handleChange = (name, value) => {
    if (name === "Kolicina") {
      value = value ? parseInt(value) : null;
    }
    if (name === "JedCijena") {
      value = value ? parseFloat(value) : null;
    }
    setArtikl(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("https://localhost:5001/api/artikl/edit_artikl", artikl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert("Artikl uspješno ažuriran!");
      setRedirect(true);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
        setMessage(`Validation error: ${errorMessages}`);
      } else {
        console.error("Error updating artikl:", error);
        setMessage("Došlo je do greške prilikom ažuriranja artikla.");
      }
    }
  };

  if (redirect) {
    navigate('/artikli');
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h4 className="text-center mb-4">Uredi artikl</h4>
        <label htmlFor="Naziv" className="form-label">Naziv</label>
        <input type="text" className="form-control" name="Naziv" value={artikl.Naziv || ''} onChange={(e) => handleChange('Naziv', e.target.value)} />
        
        <label htmlFor="Opis" className="form-label">Opis</label>
        <input type="text" className="form-control" name="Opis" value={artikl.Opis || ''} onChange={(e) => handleChange('Opis', e.target.value)} />
        
        <label htmlFor="Jmj" className="form-label">Jedinica mjere</label>
        <input type="text" className="form-control" name="Jmj" value={artikl.Jmj || ''} onChange={(e) => handleChange('Jmj', e.target.value)} />
        
        <label htmlFor="JedCijena" className="form-label">Jedinična cijena</label>
        <input type="number" className="form-control" name="JedCijena" value={artikl.JedCijena || ''} onChange={(e) => handleChange('JedCijena', e.target.value)} />
        
        <label htmlFor="Kolicina" className="form-label">Količina</label>
        <input type="number" className="form-control" name="Kolicina" value={artikl.Kolicina || ''} onChange={(e) => handleChange('Kolicina', e.target.value)} />
        
        <div className="d-flex justify-content-center mb-3">
          <button className="w-50 btn btn-lg btn-dark mt-3" type="submit">Ažuriraj podatke</button>
        </div>
      </form>
    </div>
  );
}

export default EditArtikl;

