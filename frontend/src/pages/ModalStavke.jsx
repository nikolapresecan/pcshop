import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalStavke ({ isOpen, toggle, racun }){
    return (
        <Modal show={isOpen} onHide={toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Stavke računa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Redni broj</th>
                            <th>Artikl</th>
                            <th>Jedinična cijena</th>
                            <th>Količina</th>
                            <th>Ukupno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {racun.stavke.map((stavka, index) => (
                            <tr key={stavka.id}>
                                <td>{index + 1}</td>
                                <td>{stavka.artikl.naziv} {stavka.artikl.opis}</td>
                                <td>{stavka.jedCijena} €</td>
                                <td>{stavka.kolicina}</td>
                                <td>{stavka.ukupno.toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal>
    );
};

export default ModalStavke;
