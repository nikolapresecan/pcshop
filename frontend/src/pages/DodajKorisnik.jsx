import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DodajKorisnik({ isAuthenticated, userDetails }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Zaposlenik');
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);
        setPasswordValid(isValid);
        return isValid;
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        validatePassword(value);
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !username || !email || !password) {
            setError('Molimo popunite sva polja!');
            return;
        }

        if (!validatePassword(password)) {
            setError('Lozinka mora sadržavati minimalno 6 znakova, barem jedno veliko i malo slovo, broj i znak!');
            return;
        }

        if (!isAuthenticated || !userDetails.roles.includes('Administrator')) {
            setError('Nemate prava pristupa ovoj stranici jer niste administrator!');
            return;
        }

        try {
            const response = await axios.post('https://localhost:5001/api/auth/register', {
                Ime: firstName,
                Prezime: lastName,
                Username: username,
                Email: email,
                Password: password,
                Role: role
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("Registracija uspješna:", response.data);
            setRedirect(true);
            alert('Novi zaposlenik je uspješno dodan!');
        } catch (err) {
            console.error("Greška pri registraciji:", err.response ? err.response.data : err.message);
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Došlo je do pogreške pri registraciji korisnika!');
            }
        }
    };

    useEffect(() => {
        if (!isAuthenticated || !userDetails.roles.includes('Administrator')) {
            setError('Nemate prava pristupa ovoj stranici jer niste administrator!');
        } else {
            setError('');
        }
    }, [isAuthenticated, userDetails.roles]);

    if (!isAuthenticated || !userDetails.roles.includes('Administrator')) {
        return (
            <div className='container'>
                <h5 className='text-center'>{error}</h5>
            </div>
        );
    }

    if (redirect) {
        navigate('/korisnici');
    }

    return (
        <div className='container'>
            <form onSubmit={submit} className="">
                <h4 className="text-center mb-4">Dodaj novoga zaposlenika</h4>
                {error && <p style={{ color: 'red' }} className='text-center'>{error}</p>}
                <div className="d-flex mb-3">
                    <div className="w-50 me-3">
                        <label htmlFor="firstName" className="form-label">Ime</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="w-50">
                        <label htmlFor="lastName" className="form-label">Prezime</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="w-50 me-3">
                        <label htmlFor="username" className="form-label">Korisničko ime</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="w-50">
                        <label htmlFor="role" className="form-label">Uloga</label>
                        <input type="text" className="form-control" id="role" value={role} onChange={e => setRole(e.target.value)} disabled />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="w-50 me-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="w-50">
                        <label htmlFor="password" className="form-label">Lozinka</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Prikaži lozinku
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <button className="w-50 btn btn-lg btn-dark mt-3" type="submit">Dodaj</button>
                </div>
            </form>
        </div>
    );
}

export default DodajKorisnik;
