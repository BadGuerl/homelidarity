import { useContext, Fragment } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo-web.png';
import { logout } from '../../services/users-service';
import { AuthContext } from '../../contexts/AuthStore';

function Navbar() {
    const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
    const history = useHistory();

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
                                    <a className="nav-link text-secondary" href="/login">| Inicia sesión</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-secondary" href="/register" tabIndex="-1" aria-disabled="true">|  Regístrate</a>
                                </li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item"><Link className="nav-link text-secondary me-5" to="/create-house">¿Tienes una vivienda solidaria?</Link></li>
                                <li className="nav-item"><NavLink className="nav-link text-secondary" activeClassName="active" to="/profile">Bienvenido/a {user.name}</NavLink></li>
                                <li className="nav-item"><button type="submit" className="btn btn-link link-unstyled text-secondary" onClick={handleLogout}><i className="fa fa-sign-out" ></i></button></li>
                            </Fragment>
                        )}
                    </ul>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;