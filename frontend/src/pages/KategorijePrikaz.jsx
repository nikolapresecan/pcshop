import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './users.css';
import ModalKategorija from './ModalKategorija';

function KategorijeAll({ isAuthenticated, userDetails }) {
    const [kategorije, setKategorije] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const fetchKategorije = async () => {
        if (isAuthenticated && userDetails.roles.includes('Administrator')) {
            try {
                const response = await axios.get('https://localhost:5001/api/kategorija/kategorije_all', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setKategorije(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        } else {
            setError('Nemate prava pristupa ovoj stranici jer niste administrator!');
        }
    };

    useEffect(() => {
        fetchKategorije();
    }, [isAuthenticated, userDetails.roles]);

    if (!isAuthenticated) {
        return <div className='container'><h5 className='text-center'>Niste prijavljeni, molimo Vas da se prijavite!</h5></div>;
    }

    if (!userDetails.roles.includes('Administrator')) {
        return (
            <div className='container'>
                <h5 className='text-center'>{error}</h5>
            </div>
        );
    }

    return (
        <>
            <div className='container'>
                <h4 className='mb-4 text-center'>Kategorije</h4>

                <Link className='btnAdd' onClick={handleShowModal}>Dodaj novu kategoriju</Link>
                <ModalKategorija show={showModal} handleClose={handleCloseModal} fetchKategorije={fetchKategorije} />

                <br /><br />

                <ListGroup className="w-50">
                    {kategorije.map((kategorija) => (
                        <ListGroup.Item key={kategorija.id}>
                            {kategorija.naziv}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </>
    );
}

export default KategorijeAll;