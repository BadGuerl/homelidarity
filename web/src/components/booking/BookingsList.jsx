import React, { useState, useEffect, useContext } from 'react'
import bookingsService from "../../services/bookings-service";
import { AuthContext } from '../../contexts/AuthStore';
// import './bookings-list.css'

// const moment = require('moment');

function BookingsList() {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState({
        bookings: [],
        errors: {}
    })
    useEffect(() => {
        async function fetchBookings() {
            const bookings = await bookingsService.list({ id: user.id });
            if (!isUnmounted) {
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

    };
    const handleDenegate = async (booking) => {
        const updatedBooking = {
            id: booking.id,
            status: 'Cancelado'
        }
        await bookingsService.update(updatedBooking);
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
                    <div key={booking.id} className="col-4 p-1">

                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={booking.docImage} alt="docImage" className="w-75 mt-3" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">{booking.idGuest.name}</h5>
                                        <p class="card-text">{booking.start}</p>
                                        <p class="card-text">{booking.end}</p>
                                        {
                                            (booking.idHouse.idHost === user.id && booking.status === 'Pendiente') && (
                                                <div>
                                                    <button className="btn btn-success m-2" onClick={() => handleApprove(booking)}>Aprobar</button>
                                                    <button className="btn btn-danger m-2" onClick={() => handleDenegate(booking)}>Denegar</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="card-footer">
                                        <p class="card-text">{booking.status}</p>
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
