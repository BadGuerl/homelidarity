import { isValidElement, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthStore';
import bookingsService from '../../services/bookings-service';

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

function BookingForm({ booking: bookingToEdit = {} }) {

    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [state, setState] = useState({
        booking: {
            start: '',
            end: '',
            docImage: '',
            ...bookingToEdit
        },
        errors: {
            start: validations.start(bookingToEdit.start),
            end: validations.end(bookingToEdit.end),
            docImage: validations.docImage(bookingToEdit.docImage)
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

    const { booking, errors, touch } = state;

    return (
        <div className="col-3 ms-5 my-2 d-flex align-items-center">
          <div className="card bg-light p-4">
            <label className="mt-3 text-danger"><h3>¡Importante!</h3></label>
            <label for="formFile" className="form-label my-4 text-secondary"><h4>Para reservar la vivienda,<br />registre el documento que acredita la hospitalización.</h4></label>
            <input
              className="form-control mb-3"
              type="file"
              id="formFile"
              onBlur={handleBlur}
              onChange={handleChange}
              value={user.docImage}
            />

          </div>
        </div>
    );
}

export default BookingForm;