import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalStavke from './ModalStavke';
import { useParams } from 'react-router-dom';

function Racuni ({ isAuthenticated, userDetails }) {
    const { zaposlenikId } = useParams();
    const [racuni, setRacuni] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedRacun, setSelectedRacun] = useState(null);

    useEffect(() => {
        fetchRacuni();
    }, []);

    const fetchRacuni = async () => {
        try {
            const response = await axios.get(`https://localhost:5001/api/racun/zaposlenik_id/${zaposlenikId}`,  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRacuni(response.data);
        } catch (error) {
            console.error('Greška prilikom dohvaćanja računa:', error);
        }
    };

    const toggleModal = (racun) => {
        setSelectedRacun(racun);
        setModal(!modal);
    };

    const formatDate = (dateString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Date(dateString).toLocaleString('hr-HR', options);
    };

    return (
        <div className="container">
            <h4 className="text-center mb-5">Popis izdatih računa</h4>
            <table className='table text-center'>
                <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th>Datum kreiranja</th>
                        <th>Iznos</th>
                    </tr>
                </thead>
                <tbody>
                    {racuni.map((racun, index) => (
                        <tr key={racun.id} onClick={() => toggleModal(racun)}>
                            <td>{index + 1}</td>
                            <td>{formatDate(racun.datumIzdavanja)}</td>
                            <td>{racun.iznos} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRacun && (
                <ModalStavke isOpen={modal} toggle={toggleModal} racun={selectedRacun} />
            )}
        </div>
    );
};

export default Racuni;
