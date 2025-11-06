import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Login from './pages/Login';
import ArtikliAll from './pages/ArtikliPrikaz';
import KorisniciAll from './pages/KorisniciPrikaz';
import DodajKorisnik from './pages/DodajKorisnik';
import Profil from './pages/Profil';
import KategorijeAll from './pages/KategorijePrikaz';
import DodajArtikl from './pages/DodajArtikl';
import ArtikliIKategorije from './pages/ArtikliKategorije';
import EditArtikl from './pages/ArtiklEdit';
import KreirajRacun from './pages/KreirajRacun';
import Racuni from './pages/Racuni';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({ id: '', fullName: '', roles: [] });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fullName = localStorage.getItem('fullName');
        const id = localStorage.getItem('id');
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        if (token) {
            setIsAuthenticated(true);
            setUserDetails({ id, fullName, roles });
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('https://localhost:5001/api/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('fullName');
            localStorage.removeItem('roles');
            localStorage.removeItem('id');
            setIsAuthenticated(false);
            setUserDetails({ id: '', fullName: '', roles: [] });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <BrowserRouter>
            <Nav isAuthenticated={isAuthenticated} userDetails={userDetails} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={
                    isAuthenticated ?
                        (userDetails.roles.includes('Administrator') ? <KorisniciAll isAuthenticated={isAuthenticated} userDetails={userDetails} />:
                            userDetails.roles.includes('Zaposlenik') ? <ArtikliIKategorije isAuthenticated={isAuthenticated} userDetails={userDetails} /> :
                                <div className='container'><h5 className='text-center'>Unauthorized Access</h5></div>) :
                        <Login setIsAuthenticated={setIsAuthenticated} setUserDetails={setUserDetails} />
                } />
                <Route path="/artikliikategorije" element={<ArtikliIKategorije isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/korisnici" element={<KorisniciAll isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/dodajKor" element={<DodajKorisnik isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/profil/:userId" element={<Profil isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/kategorije" element={<KategorijeAll isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/artikli" element={<ArtikliAll isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/dodajArtikl" element={<DodajArtikl isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
                <Route path="/editArtikl/:artiklId" element={<EditArtikl  />} />
                <Route path="/racuni/:zaposlenikId" element={<Racuni  />} />
                <Route path="/noviracun" element={<KreirajRacun isAuthenticated={isAuthenticated} userDetails={userDetails} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
