import { useContext, Fragment } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo-web.png';
import { logout } from '../../services/users-service';
import { AuthContext } from '../../contexts/AuthStore';
// import { useTranslation } from 'react-i18next';
// import Langs from '../langs/Langs';

function Navbar() {
    // const { t } = useTranslation()
    const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
    const history = useHistory();
    console.log(user);
    async function handleLogout() {
        await logout();
        onUserChange(undefined);
        history.push('/login');
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light p-0" >
            <div className="container-fluid p-0">
                <a href="/home"><img className="nav-link active p-0 m-0" src={logo} alt="logo" width="320" link="/home" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="mx-5" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <a className="nav-link text-secondary" href="/login" >Inicia sesión</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-secondary" href="/register" tabIndex="-1" aria-disabled="true">|  Regístrate</a>
                                </li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item"><NavLink className={`nav-link text-secondary pe-1 ${user.role === "admin" ? "text-danger" : 'd-none'} `} to="/users-list">Zona admin</NavLink></li>
                                <li className="nav-item"><p className={`nav-link mx-2 ${user.role === "admin" ? "text-danger" : 'd-none'} `} > |</p></li>
                                <li className="nav-item"><Link className={`nav-link text-secondary pe-1 ${user.role === "guest" ? "text-secondary" : 'text-danger'} `} to="/create-house">¿Tienes una vivienda solidaria?</Link></li>
                                <li className="nav-item"><p className={`nav-link mx-2 text-secondary ${user.role === "admin" ? "text-danger" : ' text-secondary'} `} > |</p></li>
                                <li className="nav-item"><Link className={`nav-link text-secondary pe-1 ${user.role === "guest" ? "text-secondary" : 'text-danger'} `} to="/bookings">Mis reservas</Link></li>
                                <li className="nav-item"><p className={`nav-link mx-2 text-secondary ${user.role === "admin" ? "text-danger" : ' text-secondary'} `} > |</p></li>
                                <li className="nav-item"><NavLink className={`nav-link text-secondary ps-2 ${user.role === "admin" ? "text-danger" : ''} `}  to="/profile">Bienvenido/a {user.name}</NavLink></li>
                                <li>
                                    <div className="inline-block " style={{ width: "40px", height: "40px", backgroundImage: `url(${user.avatar})`, borderRadius: "100px", backgroundSize: "cover", backgroundPosition: "center" }}>
                                    </div>
                                </li>
                                <li className="nav-item ps-2"><button type="submit" className="btn btn-link link-unstyled text-secondary" onClick={handleLogout}><h3><i className="fa fa-sign-out ms-2" ></i></h3></button></li>

                            </Fragment>
                        )}

                        {/* <Link className="navbar-brand" to="/events">
                            <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-middle" />
                            {t('Navbar.title')}
                        </Link> */}
                        {/* <li className="nav-item" style={{ paddingTop: '5px'}}><Langs /></li> */}
                    </ul>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;