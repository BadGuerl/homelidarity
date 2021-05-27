import { useEffect, useState, useContext, Fragment } from 'react';
import { useParams, useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthStore';
import bookingsService from '../../services/bookings-service';
import moment from 'moment';
import housesService from '../../services/houses-service';
import axios from 'axios';

function BookingForm({ booking: bookingToEdit = {} }) {

    const params = useParams();
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const [house, setHouseState] = useState({ images: [] });
    useEffect(() => {
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
    }, [history, params]);
    const validations = {
        start: (value) => {

            let message;
            if (!value) {
                message = 'Introduzca una fecha de entrada';
            }
            console.log(message);
            return message;
        },
        docImage: (value) => {
            console.log(value);
            let message;
            if (!value) {
                message = 'Introduzca el documento acreditativo';
            }
            console.log(message);
            return message;
        },
    }
    const [state, setState] = useState({
        booking: {
            start: '',
            end: '',
            docImage: '',
            ...bookingToEdit
        },
        errors: {
            start: validations.start(bookingToEdit.start),
            docImage: validations.docImage(bookingToEdit.docImage)
        },
        touch: {}
    });

    const handleChange = (booking) => {
        const { name, value } = booking.target;
        setState(state => {
            return {
                ...state,
                booking: {
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
    const resetDate = () => {
        state.booking.start = '';
        setState({
            ...state,
            booking: {
                ...state.booking
            },
            errors: {
                ...state.errors
            }
        })
    }

    const handleSubmit = async (booking) => {
        booking.preventDefault();

        if (isValid()) {
            try {
                const bookingData = state.booking;
                bookingData.status = 'Pendiente';
                bookingData.idHouse = params.id;
                bookingData.idGuest = user.id;
                const booking = bookingData.id ? await bookingsService.update(bookingData) : await bookingsService.create(bookingData);
                history.push(`/bookings/`);
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
    const handleChangeDoc = (e) => {

        const files = [...e.target.files];

        const fd = new FormData();
        fd.append("file", files[0]);
        fd.append("upload_preset", process.env.CLOUDINARY_PRESET || "a8jfd2ec");
        fd.append("api_key", process.env.CLOUDINARY_KEY || "322462519218433");
        fd.append("timestamp", (Date.now() / 1000) | 0);
        axios.post(process.env.CLOUDINARY_URL || "https://api.cloudinary.com/v1_1/anthillweb/image/upload", fd, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        })
            .then(response => {
                const data = response.data;
                const fileUrl = data.secure_url;

                setState(state => ({
                    ...state,
                    booking: {
                        ...state.booking,
                        docImage: fileUrl
                    },
                    errors: {
                        ...state.errors,
                        docImage: validations.docImage && validations.docImage(fileUrl),
                    }
                }));
                console.log(state.booking);
            })
    }
    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    }

    const { booking/*, errors, touch*/ } = state;

    const { images, description, capacity, pet, enabled, sponsored, address, city, end, farmacia, supermercado, escuela, metro } = house;

    return (
        <Fragment>

            <div className="container">
                <form className="row card-body justify-content-center" onSubmit={handleSubmit}>

                    <div className="col-5 bg-light g-0">
                        <div className="ratio ratio-4x3">
                            <img src={images[0]} alt="images" className="image-fluid rounded" />
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
                                        <i className="me-1"></i> {moment(end).format('DD-MM-YYYY')}</small></p>

                                    <p className="card-text">{description}</p>
                                    <p className="card-text">Dirección: {address}. {city}</p>

                                    <div className="d-flex flex-row">
                                        <span className="badge rounded-pill border border-secondary text-secondary me-2">
                                            <i className="fa fa-users me-1"></i>{capacity}</span>
                                        {enabled && (
                                            <span className="badge rounded-pill border border-secondary text-secondary me-1">
                                                <i className="fa fa-wheelchair-alt me-1" aria-hidden="true"></i>
                                                Adaptada</span>
                                        )}
                                        {pet && (
                                            <span className="badge rounded-pill border border-secondary text-secondary me-1">
                                                <i className="fa fa-paw me-1" aria-hidden="true"></i>
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
                            <div className="m-3">
                                <label htmlFor="start" className="form-label text-secondary">Fecha de entrada</label>
                                <div className="position-relative">
                                    <input type="datetime-local" className="form-control" id="start" name="start" onChange={handleChange} value={booking.start} />
                                    {booking.start && (
                                        <i className="fa fa-times resetDate" onClick={resetDate}></i>
                                    )}
                                </div>
                            </div>
                            <div className="m-3">
                                <label htmlFor="docImage" className="form-label text-secondary">Documento acreditativo</label>
                                <input
                                    className="form-control mb-3"
                                    type="file"
                                    id="formFile"
                                    name="docImage"
                                    onChange={handleChangeDoc}
                                />
                            </div>
                            {/* <Link className="btn btn-secondary mt-3" to={`/bookings`} >Reservar</Link> */}
                            <button type="submit" className="btn btn-secondary" disabled={!isValid()}>
                                {/* {house.id && <span>Actualizar vivienda</span>} */}
                                {!booking.id && <span>Reservar</span>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </Fragment>
    );
}

export default BookingForm;