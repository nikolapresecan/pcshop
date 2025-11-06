import React from 'react';
import { Modal } from 'react-bootstrap';

function UserModal({ show, handleClose, user }) {

    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('hr-HR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalji zaposlenika</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <div>
                        <p><strong>Ime:</strong> {user.ime}</p>
                        <p><strong>Prezime:</strong> {user.prezime}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Datum rođenja:</strong> {formatDate(user.datumRodenja)}</p>
                        <p><strong>Spol:</strong> {user.spol}</p>
                        <p><strong>Adresa:</strong> {user.adresa}</p>
                        <p><strong>Grad:</strong> {user.grad}</p>
                        <p><strong>Datum zaposlenja:</strong> {formatDate(user.datumZaposlenja)}</p>
                    </div>
                ) : (
                    <p>Podatci nisu dostupni</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-dark" onClick={handleClose}>Zatvori</button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserModal;
