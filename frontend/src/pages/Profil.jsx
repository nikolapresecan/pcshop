import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import './users.css';
import 'react-datepicker/dist/react-datepicker.css';

function Profil({ isAuthenticated, userDetails }) {
    const { userId } = useParams();

    const [user, setUser] = useState({
        id: '',
        ime: '',
        prezime: '',
        datumRodenja: null,
        spol: '',
        adresa: '',
        grad: '',
        datumZaposlenja: null
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://localhost:5001/api/user/user_id/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                setUser({
                    id: response.data.id,
                    ime: response.data.ime || '',
                    prezime: response.data.prezime || '',
                    datumRodenja: response.data.datumRodenja ? new Date(response.data.datumRodenja) : null,
                    spol: response.data.spol || '',
                    adresa: response.data.adresa || '',
                    grad: response.data.grad || '',
                    datumZaposlenja: response.data.datumZaposlenja ? new Date(response.data.datumZaposlenja) : null
                });
            } catch (error) {
                console.error('Greška prilikom dohvata podataka o korisniku:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (name, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleDateChange = (name, date) => {
        if (date instanceof Date && !isNaN(date)) {
            setUser(prevUser => ({
                ...prevUser,
                [name]: date
            }));
        } else {
            setUser(prevUser => ({
                ...prevUser,
                [name]: null
            }));
        }
    };

    const toLocalISOString = (date) => {
        if (!date) return null;
        const tzOffset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date - tzOffset).toISOString().slice(0, -1);
        return localISOTime;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            datumRodenja: toLocalISOString(user.datumRodenja),
            datumZaposlenja: toLocalISOString(user.datumZaposlenja)
        };

        try {
            const response = await axios.post('https://localhost:5001/api/user/edit', updatedUser, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert("Podaci uspješno ažurirani!");
            console.log(response.data);
        } catch (error) {
            console.error('Greška prilikom uređivanja korisnika:', error);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h4 className='text-center mb-4'>Uredi profil</h4>
                <div className="d-flex mb-3">
                    <div className='w-50 me-3'>
                        <label htmlFor="ime" className="form-label">Ime</label>
                        <input type='text' className='form-control' name='ime' id='ime' value={user.ime || ''} onChange={(e) => handleChange('ime', e.target.value)} />
                    </div>
                    <div className='w-50'>
                        <label htmlFor="prezime" className="form-label">Prezime</label>
                        <input type='text' className='form-control' name='prezime' id='prezime' value={user.prezime || ''} onChange={(e) => handleChange('prezime', e.target.value)} />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className='me-3'>
                        <label htmlFor="datumrodenja" className="form-label">Datum Rođenja</label><br />
                        <DatePicker
                            showYearDropdown
                            showMonthDropdown
                            selected={user.datumRodenja}
                            onChange={(date) => handleDateChange('datumRodenja', date)}
                            dateFormat='dd.MM.yyyy.'
                            className='datepicker'
                        />
                    </div>
                    <div className='w-100'>
                        <label htmlFor="spol" className="form-label">Spol</label>
                        <select className="form-control" name="spol" id='spol' value={user.spol || ''} onChange={(e) => handleChange('spol', e.target.value)}>
                            <option value="">Odaberite spol</option>
                            <option value="M">Muški</option>
                            <option value="Ž">Ženski</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className='w-50 me-3'>
                        <label htmlFor="adresa" className="form-label">Adresa</label>
                        <input type='text' className='form-control' name='adresa' id='adresa' value={user.adresa || ''} onChange={(e) => handleChange('adresa', e.target.value)} />
                    </div>
                    
                    <div className='w-50'>
                        <label htmlFor="grad" className="form-label">Grad</label>
                        <input type='text' className='form-control' name='grad' id='grad' value={user.grad || ''} onChange={(e) => handleChange('grad', e.target.value)} />
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="datumzaposlenja" className="form-label">Datum zaposlenja</label><br />
                    <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        selected={user.datumZaposlenja}
                        onChange={(date) => handleDateChange('datumZaposlenja', date)}
                        dateFormat='dd.MM.yyyy.'
                        className='datepicker' disabled
                    />
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <button className="w-50 btn btn-lg btn-dark mt-3" type="submit">Ažuriraj podatke</button>
                </div>
            </form>
        </div>
    );
}

export default Profil;
