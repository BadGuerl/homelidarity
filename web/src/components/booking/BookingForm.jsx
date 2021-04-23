import { useEffect, useState, useContext, Fragment } from 'react';
import { useParams, useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthStore';
import bookingsService from '../../services/bookings-service';
import { Link } from 'react-router-dom';
import moment from 'moment';
import housesService from '../../services/houses-service';

const validations = {

    start: (value) => {
        let message;
        if (!value) {
            message = 'Se requiere fecha de entrada';
        }
        return message;
    },
    end: (value) => {
        let message;
        if (!value) {
            message = 'Se requiere fecha de salida';
        }
        return message;
    },
    docImage: (value) => {
        let message;
        if (!value) {
            message = 'Se requiere documento acreditativo';
        }
        return message;
    }
}

function BookingForm() {

    const params = useParams();
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const [house,setHouseState] = useState({});
    useEffect(()=>{
        async function fetchHouse() {
            const { id } = params;
            console.info(`Buscando casa ${id}...`)
            const house = await housesService.get(id)
            if (!isUnmounted) {
                setHouseState(house);
            }
        }
        let isUnmounted = false;
        fetchHouse();

        return () => {
        console.info(`Unmounting component...`);
        isUnmounted = true;
        }
    },[history,params]);

    const [state, setState] = useState({
        booking: {
            start: '',
            end: '',
            docImage: ''
        },
        touch: {}
    });

    const handleChange = (booking) => {
        const { name, value } = booking.target;
        setState(state => {
            return {
                ...state,
                event: {
                    ...state.booking,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value),
                }
            }
        });
    }

    const handleBlur = (booking) => {
        const { name } = booking.target;
        setState(state => ({
            ...state,
            touch: {
                ...state.touch,
                [name]: true
            }
        }));
    }

    const handleSubmit = async (booking) => {
        booking.preventDefault();

        if (isValid()) {
            try {
                const bookingData = state.booking;
                const booking = bookingData.id ? await bookingsService.update(bookingData) : await bookingsService.create(bookingData);
                history.push(`/bookings/${booking.id}`);
            } catch (error) {
                const { message, errors } = error.response?.data || error;

                setState(state => ({
                    ...state,
                    errors: {
                        ...errors,
                        title: !errors && message
                    },
                    touch: {
                        ...errors,
                        title: !errors && message
                    }
                }));
            }
        }
    }

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    }

    const { booking/*, errors, touch*/ } = state;

    const { images, description, capacity, pet, enabled, sponsored, address, city, /*idHost,*/ end, farmacia, supermercado, escuela, metro } = house;

    return (
        <Fragment>

            <div className="container">
                <form className="row card-body justify-content-center" onSubmit={handleSubmit}>

                    <div className="col-5 bg-light">
                        <div className="ratio ratio-4x3">
                            <img src={images} alt="images" className="image-fluid rounded" />
                            {
                                sponsored && (
                                    <div className="sponsored p-1">Vivienda patrocinada</div>
                                )
                            }
                        </div>

                        <div className="card-body">
                            <div className="text-start">
                                <div className="card-body">

                                    <p className="card-text"><small className="text-danger">Libre a partir del:
                                        <i className=""></i> {moment(end).format('llll')}</small></p>

                                    <p className="card-text">{description}</p>
                                    <p className="card-text">Dirección: {address}. {city}</p>

                                    <div className="d-flex flex-row mb-2">
                                        <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                                            <i className="fa fa-users me-1"></i>{capacity}</span>
                                        {enabled && (
                                            <span className="badge rounded-pill border border-secondary text-secondary me-1">
                                                Adaptada</span>
                                        )}
                                        {pet && (
                                            <span className="badge rounded-pill border border-secondary text-secondary me-1">
                                                Mascotas</span>
                                        )}
                                    </div>
                                    {farmacia && (
                                        <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1">
                                            farmacia</span>
                                    )}
                                    {metro && (
                                        <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1">
                                            metro</span>
                                    )}
                                    {escuela && (
                                        <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1">
                                            escuela</span>
                                    )}
                                    {supermercado && (
                                        <span className="badge rounded-pill border border-secondary text-white bg-secondary me-1 mt-2">
                                            supermercado</span>
                                    )}
                                </div>
                            </div>

                            <input
                                className="form-control mb-3"
                                type="file"
                                id="formFile"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={user.docImage}
                            />
                            <Link className="btn btn-secondary mt-3" to={`/bookings/${booking.id}/booking`} >Reservar</Link>
                        </div>
                    </div>
                </form>
            </div>

        </Fragment>
    );
}

export default BookingForm;