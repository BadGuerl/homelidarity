import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import './houses.css';

function HouseItem({ house: { id, images, description, capacity, enabled, pet, sponsored, address, city, farmacia, supermercado, escuela, metro, idHost, end } }) {

    const { user } = useContext(AuthContext);

    return (
        <div className={`card text-secondary shadow-sm`}>
            <div className={`row g-0 ${user?.id === idHost.id ? 'border-end border-warning border-3 rounded' : 'border rounded'}`}>
                <div className="col-xl-7">
                    <div className="ratio ratio-4x3">
                        <img src={images[0]} alt="images" className="image-fluid rounded" />
                        {sponsored && (
                            <div className="sponsored p-1">Vivienda patrocinada</div>
                        )}
                    </div>
                </div>
                <div className="col-xl-5 text-start bg-light rounded">
                    <div className="card-body" >

                        <p className="card-text"><small className="text-danger">Libre a partir del:
                            <i className=""></i> {moment(end).format('llll')}</small></p>

                        <p className="card-text">{description}</p>
                        <p className="card-text mb-5">Dirección: {address}. {city}</p>

                        <div className="d-flex flex-row mb-2 justify-content-center">
                            <span className="badge rounded-pill border border-secondary text-secondary me-2">
                                <i className="fa fa-users me-2"></i>{capacity}</span>

                            {enabled && (
                                <span className="badge rounded-pill border border-secondary text-secondary  me-2">
                                    <i className="fa fa-wheelchair-alt me-2" aria-hidden="true"></i>
                                    Adaptada</span>
                            )}
                            {pet && (
                                <span className="badge rounded-pill border border-secondary text-secondary me-2">
                                    <i className="fa fa-paw me-2" aria-hidden="true"></i>
                                    Mascotas</span>
                            )}

                        </div>
                        <div className="d-flex justify-content-center">
                            {farmacia && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-2">
                                    farmacia</span>
                            )}
                            {metro && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-2">
                                    metro</span>
                            )}
                            {escuela && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-2">
                                    escuela</span>
                            )}
                            {supermercado && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-2">
                                    supermercado</span>
                            )}
                        </div>

                        <Link className="stretched-link" to={`/houses/${id}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HouseItem;
