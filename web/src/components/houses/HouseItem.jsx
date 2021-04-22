import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import './houses.css';

function HouseItem({ house: { id, images, description, capacity, enabled, pet, sponsored, address, city, postalCode, farmacia, supermercado, escuela, metro, idHost, location, start, end } }) {

    const { user } = useContext(AuthContext);

    return (
        <div className={`card bg-light text-secondary shadow-sm ${user?.id === idHost ? 'border border-left-color border-info rounded' : 'border rounded'}`}>
            <div className="row g-0">
                <div className="col-xl-7">
                    <div className="ratio ratio-4x3">
                        <img src={images} alt="images" className="image-fluid rounded"/>
                        {
                            sponsored && (
                                <div className="sponsored p-1">Vivienda patrocinada</div>
                            )
                        }
                    </div>
                </div>
                <div className="col-xl-5 text-start bg-light">
                    <div className="card-body" >

                        <p className="card-text"><small className="text-danger">Libre a partir del:
                        <i className=""></i> {moment(end).format('llll')}</small></p>

                        <p className="card-text">{description}</p>
                        <p className="card-text">Dirección: {address}. {city}</p>

                        <div className="d-flex flex-row mb-2">
                            <span className="badge rounded-pill border border-secondary text-secondary me-1">
                                <i className="fa fa-users me-1"></i>{capacity}</span>

                            {
                                enabled && (
                                    <span className="badge rounded-pill border border-secondary text-secondary  me-1">
                                        Adaptada</span>
                                )
                            }
                            
                            {
                                pet && (
                                    <span className="badge rounded-pill border border-secondary text-secondary me-1">
                                        Mascotas</span>
                                )
                            }
                            
                        </div>

                        {
                            farmacia && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1">
                                    farmacia</span>
                            )
                        }

                        {
                            metro && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1">
                                    metro</span>
                            )
                        }

                        {
                            escuela && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1">
                                    escuela</span>
                            )
                        }

                        {
                            supermercado && (
                                <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1 mt-2">
                                    supermercado</span>
                            )
                        }
                        <Link className="stretched-link" to={`/houses/${id}`} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HouseItem;
