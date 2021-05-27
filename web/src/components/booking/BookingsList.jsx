import React, { useState, useEffect, useContext } from 'react'
import bookingsService from "../../services/bookings-service";
import { AuthContext } from '../../contexts/AuthStore';
// import './bookings-list.css'

import moment from 'moment';

function BookingsList() {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState({
        bookings: [],
        errors: {}
    })
    useEffect(() => {
        async function fetchBookings() {
            const bookings = await bookingsService.list();
            if (!isUnmounted) {
                console.log(bookings);
                setState({
                    bookings: bookings
                })
            }
        }
        let isUnmounted = false;
        fetchBookings();
        return () => {
            isUnmounted = true;
        }
    }, [user.id]);
    const handleApprove = async (booking) => {
        const updatedBooking = {
            id: booking.id,
            status: 'Aceptado'
        }
        await bookingsService.update(updatedBooking);
        const bookings = await bookingsService.list();
        setState({
            bookings: bookings
        })
    };
    const handleDenegate = async (booking) => {
        const updatedBooking = {
            id: booking.id,
            status: 'Cancelado'
        }
        await bookingsService.update(updatedBooking);
        const bookings = await bookingsService.list();
        setState({
            bookings: bookings
        })
    };

    const { bookings } = state;
    console.log(bookings);
    return (
        <div className="container login-card col-8">
            <div className="title bg-secondary p-3 mb-3">
                <div>
                    <h2 className="text-light">Listado de reservas</h2>
                </div>
            </div>

            <div className="card-group">

                {bookings.map(booking => (
                    <div key={booking.id} className={`col-4 p-1 ${(booking.idHouse.idHost.id === user.id || booking.idGuest.id === user.id || user.role === 'admin')?"d-block":"d-none"}`}>

                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <a href={booking.docImage} target="_blank" rel="noreferrer">
                                        <img src={booking.docImage} alt="docImage" className="w-75 mt-3" />
                                    </a>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body text-start">
                                        <h6 className="card-subtitle mb-2">
                                            <span className="badge bg-warning text-white">Propietario</span>
                                        </h6>
                                        <h5 className="card-title mb-4">{booking.idHouse.idHost.name}</h5>
                                        <h6 className="card-subtitle mb-2">
                                            <span className="badge bg-info text-white">Solicitante</span>
                                        </h6>
                                        <h5 className="card-title">{booking.idGuest.name}</h5>
                                        <p className="card-text">{booking.start && moment(booking.start).format('DD-MM-YYYY')}</p>
                                        <p className="card-text">{booking.end && moment(booking.end).format('DD-MM-YYYY')}</p>
                                        {
                                            ((booking.idHouse.idHost.id === user.id || user.role === 'admin') && booking.status === 'Pendiente') && (
                                                <div>
                                                    <button className="btn btn-success m-2" onClick={() => handleApprove(booking)}>Aprobar</button>
                                                    <button className="btn btn-danger m-2" onClick={() => handleDenegate(booking)}>Denegar</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="card-footer">
                                        <p className="card-text">{booking.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )

}

export default BookingsList;
