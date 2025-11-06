import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './ModalKorinik';
import './users.css';

function KorisniciAll({ isAuthenticated, userDetails }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            if (isAuthenticated && userDetails.roles.includes('Administrator')) {
                try {
                    const response = await axios.get('https://localhost:5001/api/user/users_domain', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setUsers(response.data);
                    
                    console.log("userDetails:", userDetails);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
            else{
                setError('Nemate prava pristupa ovoj stranici jer niste administrator!');
            }
        };

        fetchUsers();
    }, [isAuthenticated, userDetails.roles]);

    if (!isAuthenticated || !userDetails.roles.includes('Administrator')) {
        return (
            <div className='container'>
                <h5 className='text-center'>{error}</h5>
            </div>
        );
    }

    const handleDelete = async (userId, fullName) => {
        if (window.confirm(`Jeste li sigurni da želite izbrisati zaposlenika ${fullName}?`)) {
            try {
                const response = await axios.post('https://localhost:5001/api/user/delete', { id: userId }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const updatedUsers = users.filter(user => user.id !== userId);
                setUsers(updatedUsers);

            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleRowClick = async (userId) => {
        try {
            const response = await axios.get(`https://localhost:5001/api/user/user_id/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSelectedUser(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    if (!isAuthenticated) {
        return <div className='container'><h5 className='text-center'>Niste prijavljeni, molimo Vas da se prijavite!</h5></div>;
    }

    const sortedUsers = users.sort((a, b) => {
        if (a.uloga === 'Administrator' && b.uloga !== 'Administrator') {
            return -1;
        } else if (a.uloga !== 'Administrator' && b.uloga === 'Administrator') {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <div className='container'>
            <h4 className='text-center'>Korisnici</h4>
            <Link className='btnAdd' to='/dodajKor'>Dodaj novoga zaposlenika</Link>
            
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Uloga</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                            <td>{index + 1}</td>
                            <td>{user.ime}</td>
                            <td>{user.prezime}</td>
                            <td>{user.uloga}</td>
                            <td>
                                {user.id !== userDetails.id && (
                                    <button className='btn btn-dark' onClick={(e) => {e.stopPropagation(); handleDelete(user.id, `${user.ime} ${user.prezime}`)}}>Obriši</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} handleClose={handleCloseModal} user={selectedUser} />
        </div>
    );
}

export default KorisniciAll;