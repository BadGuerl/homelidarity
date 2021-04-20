import { useState } from 'react';
import { useHistory } from 'react-router';
import housesService from '../../services/houses-service';

const validations = {
    images: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca imagenes';
        }
        return message;
    },
    description: (value) => {
        let message;
        if (!value) {
            message = 'Describa la vivienda';
        } else if (value && value.length < 10) {
            message = 'La descripción debe tener mínimo 10 caracteres'
        }
        return message;
    },
    capacity: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca la capacidad';
        } else if (value && Number(value) <= 0) {
            message = 'La capacidad tiene que ser mayor que 0';
        }
        return message;
    },
    enabled: (Boolean) => {
        let message;
        if (Boolean === true) {
            message = 'Habilitada para movilidad reducida';
        } else if (Boolean === false) {
            message = 'No habilitada para movilidad reducida';
        }
        return message;
    },
    farmacia: (Boolean) => {
        let message;
        if (Boolean === true) {
            message = 'Farmacia cercana a la vivienda';
        } else if (Boolean === false) {
            message = 'No hay farmacias cercanas';
        }
        return message;
    },
    supermercado: (Boolean) => {
        let message;
        if (Boolean === true) {
            message = 'Supermercdo cercano a la vivienda';
        } else if (Boolean === false) {
            message = 'No hay supermercados cercanos';
        }
        return message;
    },
    metro: (Boolean) => {
        let message;
        if (Boolean === true) {
            message = 'Metro cercano a la vivienda';
        } else if (Boolean === false) {
            message = 'No hay metro cercano a la vivienda';
        }
        return message;
    },
    escuela: (Boolean) => {
        let message;
        if (Boolean === true) {
            message = 'Escuela cercana a la vivienda';
        } else if (Boolean === false) {
            message = 'No hay escuela cercana a la vivienda';
        }
        return message;
    },
    sponsored: (Boolean) => {
        let message;
        if (Boolean === true) {
            message = 'Vivienda patrocinada';
        } else if (Boolean === false) {
            message = 'Vivienda no patrocinada';
        }
        return message;
    },
    address: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca la dirección';
        } else if (value && value.length < 5) {
            message = 'La dirección debe tener mínimo 5 caracteres'
        }
        return message;
    },
    city: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca la ciudad';
        } else if (value && value.length < 2) {
            message = 'La ciudad debe tener mínimo 2 caracteres'
        }
        return message;
    },
    postalCode: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca el código postal';
        } else if (value && value.length === 5) {
            message = 'El código postal debe tener 5 caracteres'
        }
        return message;
    },
    start: (value) => {
        let message;
        if (!value) {
            message = 'Start date is required';
        }
        return message;
    },
    end: (value) => {
        let message;
        if (!value) {
            message = 'La fecha de salida es obligatoria';
        }
        return message;
    },
    latitude: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca la latitud';
        } else if (Math.abs(Number(value)) > 90) {
            message = 'La latitud debe oscilar entre -90 y 90';
        }
        return message;
    },
    longitude: (value) => {
        let message;
        if (!value) {
            message = 'Introduzca la longitud';
        } else if (Math.abs(Number(value)) > 180) {
            message = 'La longitud debe oscilar entre -180 y 180';
        }
        return message;
    },
}

function HouseForm({ house: houseToEdit = {} }) {

    const history = useHistory();
    const [state, setState] = useState({
        house: {
            images: '',
            description: '',
            capacity: '',
            enabled: '',
            sponsored: '',
            address: '',
            city: '',
            postalCode: '',
            farmacia: '',
            escuela: '',
            metro: '',
            supermercado: '',
            start: '',
            end: '',
            latitude: '',
            longitude: '',
            ...houseToEdit
        },
        errors: {
            images: validations.images(houseToEdit.images),
            description: validations.description(houseToEdit.description),
            capacity: validations.capacity(houseToEdit.capacity),
            enabled: validations.enabled(houseToEdit.enabled),
            farmacia: validations.farmacia(houseToEdit.farmacia),
            supermercado: validations.supermercado(houseToEdit.supermercado),
            metro: validations.metro(houseToEdit.metro),
            escuela: validations.escuela(houseToEdit.escuela),
            sponsored: validations.sponsored(houseToEdit.sponsored),
            address: validations.address(houseToEdit.address),
            city: validations.city(houseToEdit.city),
            postalCode: validations.postalCode(houseToEdit.postalCode),
            start: validations.start(houseToEdit.start),
            end: validations.end(houseToEdit.end),
            latitude: validations.latitude(houseToEdit.latitude),
            longitude: validations.longitude(houseToEdit.longitude)
        },
        touch: {}
    });

    const handleChange = (house) => {
        const { name, value } = house.target;
        setState(state => {
            return {
                ...state,
                house: {
                    ...state.house,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value),
                }
            }
        });
    }

    const handleBlur = (house) => {
        const { name } = house.target;
        setState(state => ({
            ...state,
            touch: {
                ...state.touch,
                [name]: true
            }
        }));
    }

    const handleSubmit = async (house) => {
        house.preventDefault();

        if (isValid()) {
            try {
                const houseData = state.house;
                houseData.location = [houseData.longitude, houseData.latitude];
                const house = houseData.id ? await housesService.update(houseData) : await housesService.create(houseData);
                history.push(`/houses/${house.id}`);
            } catch (error) {
                const { message, errors } = error.response?.data || error;

                if (errors?.location) {
                    errors.latitude = errors.location;
                    errors.longitude = errors.location;
                    delete errors.location;
                }

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

    const { house, errors, touch } = state;

    return (
        <div className="container col-5 my-5">
            <div className="form-check form-switch ms-3 text-start text-secondary mt-3">
                <h4><input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
                    <label className="form-check-label" for="flexSwitchCheckDefault">Patrocinada</label></h4>
            </div>

            <div className="mb-2">
                <label for="formFileMultiple" className="form-label"></label>
                <input
                    className={`form-control ${(touch.image && errors.image) ? 'is-invalid' : ''}`}
                    type="file"
                    src={house.images}
                    id="formFileMultiple"
                    multiple
                    onError={(house) => house.target.src = 'https://via.placeholder.com/800x400'}
                    onBlur={handleChange}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
                <div className="invalid-feedback">{errors.image}</div>
            </div>

            <div className="col">
                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><i className="fa fa-edit fa-fw"></i></span>
                        <textarea
                            name="description"
                            className={`form-control ${(touch.description && errors.description) ? 'is-invalid' : ''}`}
                            placeholder="describe la vivienda..."
                            value={house.description}
                            onBlur={handleBlur}
                            onChange={handleChange}>
                        </textarea>
                        <div className="invalid-feedback">{errors.description}</div>
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><i className="fa fa-users fa-fw"></i></span>
                        <input
                            type="number"
                            name="capacity"
                            className={`form-control ${(touch.capacity && errors.capacity) ? 'is-invalid' : ''}`}
                            placeholder="capacidad de la vivienda..."
                            value={house.capacity}
                            onBlur={handleBlur}
                            onChange={handleChange} />
                        <div className="invalid-feedback">{errors.capacity}</div>
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><i className="fa fa-globe fa-fw"></i></span>
                        <span className="input-group-text">Latitud</span>
                        <input
                            name="latitude"
                            type="number"
                            className={`form-control ${(touch.latitude && errors.latitude) ? 'is-invalid' : ''}`}
                            value={house.latitude}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="entre -90 y 90" />

                        <span className="input-group-text">Longitud</span>
                        <input
                            name="longitude"
                            type="number"
                            className={`form-control ${(touch.longitude && errors.longitude) ? 'is-invalid' : ''}`}
                            value={house.longitude}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="entre -180 y 180" />
                        {touch.latitude && errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
                        {touch.longitude && errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
                    </div>

                    <div className="input-group mb-2">
                        <span className="input-group-text"><i className="fa fa-clock-o fa-fw"></i></span>
                        <span className="input-group-text">Entrada</span>
                        <input
                            type="datetime-local"
                            name="start"
                            className={`form-control ${(touch.start && errors.start) ? 'is-invalid' : ''}`}
                            placeholder="dd/mm/yyyy hh:mm"
                            value={house.start}
                            onBlur={handleBlur}
                            onChange={handleChange} />
                        <span className="input-group-text">Salida</span>
                        <input
                            name="end"
                            type="datetime-local"
                            className={`form-control ${(touch.end && errors.end) ? 'is-invalid' : ''}`}
                            placeholder="dd/mm/yyyy hh:mm"
                            value={house.end}
                            onBlur={handleBlur}
                            onChange={handleChange} />
                        {touch.start && errors.start && <div className="invalid-feedback">{errors.start}</div>}
                        {touch.end && errors.end && <div className="invalid-feedback">{errors.end}</div>}
                    </div>

                    <div className="mb-3">
                        <h5 className="text-secondary ms-3 mt-4">Características</h5>
                    </div>

                    <div className="form-check form-switch ms-3 text-start text-secondary mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            value={house.enabled}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" for="flexSwitchCheckDefault">Adaptada a movilidad reducida</label>
                    </div>

                    <div className="form-check form-switch ms-3 text-start text-secondary">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="flexSwitchCheckDefault"
                            id="flexSwitchCheckDefault"
                            value={house.pet}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" for="flexSwitchCheckDefault">
                            Se admiten mascotas
                        </label>
                    </div>

                    <div className="mb-3">
                        <h5 className="text-secondary ms-3 mt-4">Servicios cercanos</h5>
                    </div>

                    <div className="ms-3 text-start text-secondary">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                value={house.farmacia}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" for="flexSwitchCheckDefault">Farmacia</label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                value={house.supermercado}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" for="flexSwitchCheckDefault">Supermercado</label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                value={house.metro}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" for="flexSwitchCheckDefault">Metro</label>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                value={house.escuela}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" for="flexSwitchCheckDefault">Escuela</label>
                        </div>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-secondary" disabled={!isValid()}>
                            {house.id && <span>Actualizar vivienda</span>}
                            {!house.id && <span>Añadir vivienda</span>}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default HouseForm;