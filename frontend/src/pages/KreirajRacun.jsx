import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stavke from './StavkeRacun';

function CreateRacun({ isAuthenticated, userDetails }) {
    const [artikli, setArtikli] = useState([]);
    const [stavke, setStavke] = useState([]);
    const [trenutnaStavka, setTrenutnaStavka] = useState(null);
    const [uredjivanjeStavke, setUredjivanjeStavke] = useState(null);

    useEffect(() => {
        const handleShowAll = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("https://localhost:5001/api/artikl/allquantity", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                });
                setArtikli(response.data);
            } catch (error) {
                console.error("Error fetching all articles:", error);
            }
        };
        handleShowAll();
    }, []);

    const dodajStavku = (stavka) => {
        setStavke(prevStavke => [...prevStavke, stavka]);
    };

    const azurirajStavku = (azuriranaStavka) => {
        setStavke(prevStavke => 
            prevStavke.map(stavka => 
                stavka.artiklId === azuriranaStavka.artiklId ? azuriranaStavka : stavka
            )
        );
        setUredjivanjeStavke(null);
    };

    const handleKolicinaChange = (artiklId, novaKolicina) => {
        setStavke(prevStavke =>
            prevStavke.map(stavka =>
                stavka.artiklId === artiklId ? { ...stavka, kolicina: novaKolicina, ukupno: novaKolicina * stavka.ukupno / stavka.kolicina } : stavka
            )
        );
    };

    const sacuvajKolicinu = (artiklId) => {
        setUredjivanjeStavke(null);
    };

    const obrisiStavku = (artiklId) => {
        setStavke(prevStavke => prevStavke.filter(stavka => stavka.artiklId !== artiklId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (stavke.length === 0) {
            alert("Račun mora sadržavati barem jednu stavku.");
            return;
        }

        const potvrda = window.confirm("Jeste li sigurni da želite kreirati račun?");
        if (!potvrda) {
            return;
        }

        try {
          const racun = {
            ZaposlenikId: userDetails.id,
            Stavke: stavke
          };
          const response = await axios.post('https://localhost:5001/api/racun/add_racun', racun, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Novi račun ID:', response.data.id);
          alert("Uspješno kreiran račun!");
          setStavke([]);
        } catch (error) {
          console.error('Greška prilikom kreiranja računa:', error);
          alert("Greška prilikom kreiranja računa. Pokušajte ponovno.");
        }
      };

    return (
        <div className='container'>
            <h4 className='text-center mb-3'>Kreiraj novi račun</h4>
            <Stavke 
                addStavka={dodajStavku} 
                artikli={artikli} 
                trenutnaStavka={trenutnaStavka}
                azurirajStavku={azurirajStavku}
            />
            <table className='table text-center'>
                <thead>
                <tr>
                    <th>Artikl</th>
                    <th>Količina</th>
                    <th>Ukupno</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {stavke.map((stavka, index) => (
                    <tr key={index}>
                    <td>{stavka.artiklId}</td>
                    <td>
                        {uredjivanjeStavke === stavka.artiklId ? (
                            <input
                                type="number"
                                value={stavka.kolicina}
                                onChange={(e) => handleKolicinaChange(stavka.artiklId, parseInt(e.target.value))}
                                min="1"
                                max="100"
                            />
                        ) : (
                            stavka.kolicina
                        )}
                    </td>
                    <td>{stavka.ukupno.toFixed(2)}</td>
                    <td>
                        {uredjivanjeStavke === stavka.artiklId ? (
                            <button className='btn btn-dark' onClick={() => sacuvajKolicinu(stavka.artiklId)}>Spremi</button>
                        ) : (
                            <button className='btn btn-dark' onClick={() => setUredjivanjeStavke(stavka.artiklId)}>Uredi</button>
                        )}
                    </td>
                    <td><button className='btn btn-light' onClick={() => obrisiStavku(stavka.artiklId)}>Obriši</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-center mb-3">
                <button className="w-50 btn btn-dark mt-3" type="button" onClick={handleSubmit}>Kreiraj račun</button>
            </div>
        </div>
      );
}

export default CreateRacun;
