import React, { useState, useEffect, useContext } from 'react'
import bookingsService from "../../services/bookings-service";
import { AuthContext } from '../../contexts/AuthStore';
import './bookings-list.css'

// const moment = require('moment');

function BookingsList() {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState({
        bookings: [],
        errors: {}
    })
    useEffect(() => {
        async function fetchBookings() {
            const bookings = await bookingsService.list({id:user.id});
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
    const handleApprove = async (booking)=>{
        const updatedBooking = {
            id:booking.id,
            status:'Aceptado'
        }
       await bookingsService.update(updatedBooking);
        
    };
    const handleDenegate = async (booking)=>{
        const updatedBooking = {
            id:booking.id,
            status:'Cancelado'
        }
       await bookingsService.update(updatedBooking);
    };
    
    const { bookings } = state;
    console.log(bookings);
    return (
        <div className="grid container col-10">
            <div className="row py-5">
                <div className="col-12 d-flex justify-content-center border-2 bg-secondary text-light">
                    <h2 className="py-2">Listado de reservas</h2>
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead className="border border-dark">
                        <tr>
                            <th>Estado</th>
                            <th>Entrada</th>
                            <th>Salida</th>
                            <th>Nombre del usuario</th>
                            <th width="25%">Documento acreditativo</th>
                            <th width="20%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id} className="border border-dark">
                            <td>{booking.status}</td>
                            <td>{booking.start}</td>
                            <td>{booking.end}</td>
                            <td>{booking.idGuest.name}</td>
                            <td><img className="img-fluid" alt="docimage" src={booking.docImage} /></td>
                            <td>
                                
                                {
                                    (booking.idHouse.idHost.id === user.id && booking.status==='Pendiente') && (
                                        <div>
                                            <button className="btn btn-success m-2" onClick={()=>handleApprove(booking)}>Aprobar</button>
                                            <button className="btn btn-danger m-2" onClick={()=>handleDenegate(booking)}>Denegar</button>
                                        </div>
                                        
                                    )
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default BookingsList;
