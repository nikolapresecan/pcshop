import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

function Nav({ isAuthenticated, userDetails, handleLogout }) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand">PC Shop</a>
                <div className="collapse navbar-collapse justify-content-between">
                    <ul className="navbar-nav">
                        {isAuthenticated && userDetails.roles && (
                            <>
                                {userDetails.roles.includes('Administrator') && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/korisnici" className="nav-link">Korisnici</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/artikliikategorije" className="nav-link">Artikli</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/kategorije" className="nav-link">Kategorije</Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link to="/noviracun" className='nav-link'>Kreiraj novi račun</Link>
                                        </li>
                                    </>
                                )}
                                {userDetails.roles.includes('Zaposlenik') && !userDetails.roles.includes('Administrator') && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/artikliikategorije" className="nav-link">Artikli</Link>
                                            
                                        </li>
                                        <li className='nav-item'>
                                            <Link to="/noviracun/" className='nav-link'>Kreiraj novi račun</Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle as='a' className='nav-link dropdown-toggle' id='dropdown-basic'>{userDetails.fullName}</Dropdown.Toggle>
                                    <Dropdown.Menu className='dropdown-menu-dark bg-dark'>
                                        <Dropdown.Item as={Link} to={`/profil/${userDetails.id}`}>Profil</Dropdown.Item>
                                        <Dropdown.Item as={Link} to={`/racuni/${userDetails.id}`}>Računi</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} to="/" onClick={handleLogout}>Odjava</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Prijava</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

