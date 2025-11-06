import React, { useState, useEffect } from 'react';

function Stavke({ addStavka, artikli, trenutnaStavka, azurirajStavku }) {
    const [artiklId, setArtiklId] = useState('');
    const [kolicina, setKolicina] = useState(1);
    const [ukupno, setUkupno] = useState(0);
    const [dostupnaKolicina, setDostupnaKolicina] = useState(0);

    useEffect(() => {
        const selectedArtikl = artikli.find(artikl => artikl.id === parseInt(artiklId));
        if (selectedArtikl) {
            setUkupno(selectedArtikl.jedCijena * kolicina);
            setDostupnaKolicina(selectedArtikl.kolicina);
        }
    }, [artiklId, kolicina, artikli]);

    const handleArtiklChange = (e) => {
        setArtiklId(e.target.value);
        setKolicina(1);
    };

    const handleKolicinaChange = (e) => {
        const enteredKolicina = parseInt(e.target.value);
        if (enteredKolicina <= dostupnaKolicina) {
            setKolicina(enteredKolicina);
        } else {
            alert(`Maksimalna dostupna količina je ${dostupnaKolicina}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedArtikl = artikli.find(artikl => artikl.id === parseInt(artiklId));
        if (selectedArtikl) {
            addStavka({
                artiklId: parseInt(artiklId),
                kolicina,
                ukupno
            });
            setArtiklId('');
            setKolicina(1);
            setUkupno(0);
            setDostupnaKolicina(0);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>    
                <div className='mb-3'>
                    <label htmlFor='artikl' className='form-label'>Artikl</label>
                    <select value={artiklId} className='form-control' onChange={handleArtiklChange} required>
                        <option value="">Odaberi artikl</option>
                        {artikli.map(artikl => (
                            <option key={artikl.id} value={artikl.id}>
                                {artikl.kategorija} - {artikl.naziv} {artikl.opis}
                            </option>
                        ))}
                    </select>
                </div>
                {artiklId && (
                    <div>
                        <label htmlFor='dostkolicina' className='form-label mb-3'>Dostupno {dostupnaKolicina} artikala</label>
                    </div>
                )}
                <div className='mb-3'>
                    <label htmlFor='kolicina' className='form-label'>Količina</label>
                    <input className='form-control'
                        type="number"
                        value={kolicina}
                        onChange={handleKolicinaChange}
                        min="1"
                        max={dostupnaKolicina}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='ukupno' className='form-label'>Ukupno</label>
                    <input type="text" className='form-control' value={ukupno.toFixed(2)} readOnly />
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <button className="w-25 btn btn-dark mt-3" type="submit">Dodaj stavku</button>
                </div>
            </form>
        </div>
    );
}

export default Stavke;
