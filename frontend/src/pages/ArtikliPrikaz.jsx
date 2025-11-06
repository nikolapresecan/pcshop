import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ArtikliAll({ isAuthenticated, userDetails }) {
    const [artikli, setArtikli] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchArtikli = async () => {
            if (isAuthenticated && (userDetails.roles.includes('Zaposlenik') || userDetails.roles.includes('Administrator'))) {
                try {
                    const response = await axios.get('https://localhost:5001/api/artikl/alldomain', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setArtikli(response.data);
                    
                    console.log("userDetails:", userDetails);
                } catch (error) {
                    console.error('Error fetching artikli:', error);
                }
            }
        };

        fetchArtikli();
    }, [isAuthenticated, userDetails.roles]);

    const handleDelete = async (artiklId, artik) => {
        if (window.confirm(`Jeste li sigurni da želite izbrisati artikl ${artik}?`)) {
            try {
                const response = await axios.post('https://localhost:5001/api/artikl/delete_artikl', { id: artiklId }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const updatedArtikli = artikli.filter(artikl => artikl.id !== artiklId);
                setArtikli(updatedArtikli);

            } catch (error) {
                console.error('Error deleting artikl:', error);
            }
        }
    };

    if (!isAuthenticated) {
        return <div className='container'><h5 className='text-center'>Niste prijavljeni, molimo Vas da se prijavite!</h5></div>;
    }

    const handleEditClick = (artiklId) => {
        navigate(`/editArtikl/${artiklId}`);
      };

    return (
        <div className='container'>
            <Link className='btnAdd' to='/dodajArtikl'>Dodaj novi artikl</Link>
            
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th>Naziv</th>
                        <th>Opis</th>
                        <th>Količina</th>
                        <th>Kategorija</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {artikli.map((artikl, index) => (
                        <tr key={artikl.id}>
                            <td>{index + 1}</td>
                            <td>{artikl.naziv}</td>
                            <td>{artikl.opis}</td>
                            <td>{artikl.kolicina}</td>
                            <td>{artikl.kategorija}</td>
                            <td><button className='btn btn-dark' onClick={() => handleEditClick(artikl.id)}>Uredi</button></td>
                            <td><button className='btn btn-light' onClick={() => handleDelete(artikl.id, `${artikl.naziv} ${artikl.opis}`)}>Obriši</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArtikliAll;
