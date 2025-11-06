import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated, setUserDetails }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5001/api/auth/login', {
                username,
                password
            });

            const { token, fullName, roles, id } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('roles', JSON.stringify(roles));
            localStorage.setItem('id', id);
            setIsAuthenticated(true);
            setUserDetails({ id, fullName, roles });
            
            if (roles.includes('Administrator')) {
                navigate('/korisnici');
            } else if (roles.includes('Zaposlenik')) {
                navigate('/artikliikategorije');
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Pogrešno korisničko ime ili lozinka, molimo Vas pokušajte ponovno!');
            }
        }
    }

    return (
        <div className='container'>
            <form onSubmit={submit} className="d-flex flex-column align-items-center">
                <h1 className='text-center mb-3'>Prijava</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="mb-3 w-50">
                    <label htmlFor="username" className="form-label">Korisničko ime</label>
                    <input type="text" className="form-control" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                </div>
                <div className="mb-3 w-50">
                    <label htmlFor="password" className="form-label">Lozinka</label>
                    <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Prikaži lozinku
                </div>
                <button className="w-25 btn btn-lg btn-dark" type="submit">Prijavi se</button>
            </form>
        </div>
    )
}

export default Login;
