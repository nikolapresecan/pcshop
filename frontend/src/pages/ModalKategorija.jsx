import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ModalKategorija({ show, handleClose, fetchKategorije }) {
    const [naziv, setNaziv] = useState('');
    const [error, setError] = useState(null);

    const handleAddKategorija = async () => {
        if (!naziv) {
            setError('Molimo unesite naziv kategorije!');
            return;
        }
        try {
            const response = await axios.post('https://localhost:5001/api/Kategorija/kategorije_add', { naziv }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Nova kategorija je uspješno dodana!');
            setNaziv('');
            fetchKategorije();
            handleClose();
        } catch (error) {
            setError('Došlo je do greške prilikom dodavanja kategorije.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dodaj novu kategoriju</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form>
                    <Form.Group controlId="naziv">
                        <Form.Label>Naziv</Form.Label>
                        <Form.Control 
                            type="text"
                            value={naziv} 
                            onChange={(e) => setNaziv(e.target.value)} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Odustani
                </Button>
                <Button variant="dark" onClick={handleAddKategorija}>
                    Dodaj
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalKategorija;
