import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';

function HouseItem({ house: { id, images, description, capacity, enabled, pet, sponsored, address, city, postalCode, keyWords, idHost, location, start, end } }) {

    const { user } = useContext(AuthContext);

    return (
        <div className={`card bg-light text-secondary shadow-sm ${user?.id === idHost ? 'border border-left-color border-info rounded' : 'border rounded'}`}>
            <div className="row g-0">
                <div className="col-md-7">
                    <Link to={`/houses/${id}`}><img src={images} alt="images" className="image-fluid h-100 rounded" link="/house" /></Link>
                </div>
                <div className="col-md-4 text-start ms-4 bg-light">
                    <div className="card-body">
                        <h5 className="card-title text-warning">{sponsored}</h5>

                        <p className="card-text"><small className="text-danger">Libre a partir del:
                        <i className=""></i> {moment(end).format('llll')}</small></p>

                        <p className="card-text">{description}</p>
                        <p className="card-text">Dirección: {address}. {city}</p>

                        <div className="d-flex flex-row mb-2">
                            <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                                <i className="fa fa-users me-1"></i>{capacity}</span>
                            <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 
                                    7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                </svg>{enabled} Adaptada</span>
                            <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 
                                    7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                </svg>{pet} Mascotas</span>
                        </div>

                        {keyWords && (
                            <div className="col">
                                {keyWords.map(keyWords => <span key={keyWords}>{<span className="badge rounded-pill bg-secondary me-2">{keyWords}</span>}</span>)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        // <div className={`card shadow-sm ${user?.id === idHost ? 'border-info rounded' : 'border-0 rounded-0'}`}>
        //     
        // </div>
    )
}

export default HouseItem;
