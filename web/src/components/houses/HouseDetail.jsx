import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';
import moment from 'moment';

import housesService from '../../services/houses-service';

const validations = {
  docImage: (value) => {
    let message;
    if (!value) {
      message = 'El documento es requerido';
    }
    return message;
  }
}

function HouseDetail() {

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [house, setState] = useState({
    booking: {
      docImage: ''
    },
    errors: {
      docImage: validations.docImage()
    },
    touch: {}
  });

  useEffect(() => {
    async function fetchHouse() {
      const { id } = params;
      console.info(`Buscando casa ${id}...`)
      const house = await housesService.get(id)
      if (!isUnmounted) {
        setState(house);
      }
    }

    let isUnmounted = false;
    fetchHouse();

    return () => {
      console.info(`Unmounting component...`);
      isUnmounted = true;
    }
  }, [history, params]);

  const handleDeleteHouse = async () => {
    await housesService.remove(house.id);
    history.push('/houses');
  }

  const handleClick = () => {

  }

  if (!house) {
    return null;
  }

  // const isValid = () => {
  //   const { errors } = state;
  //   return !Object.keys(errors).some(error => errors[error]);
  // }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      user: {
        ...state.user,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  }

  const { images, description, capacity, pet, enabled, sponsored, address, city, idHost, end, farmacia, supermercado, escuela, metro } = house;
  return (
    <Fragment>

      <div className="row row-col-3 justify-content-center">
        {/* <div className="col-4 mx-5 my-2 d-flex align-items-center">
          <div className="card bg-light p-4 border-danger">
            <label className="mt-3 text-danger"><h3>¡Importante!</h3></label>
            <label htmlFor="formFile" className="form-label my-4 text-secondary"><h4>Para reservar la vivienda,<br />
            registre el documento que acredita la hospitalización.</h4></label>
            <input
              className="form-control mb-3"
              type="file"
              id="formFile"
              onBlur={handleBlur}
              onChange={handleChange}
            />

          </div>
        </div> */}

        <div className="col-4 my-2 bg-light text-secondary border rounded">
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

              </div>
            </div>

            {user?.id === house.idHost && (
              <div className="col my-3 text-center">
                <div className="alert alert-secondary" role="alert">
                  <h4 className="fw-light mb-2">Admin Area</h4>
                  <div className="btn-group" role="group">
                    <Link className="btn btn-secondary" to={`/houses/${idHost}/edit`}>Actualiza</Link>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteHouse}>Delete</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
      <a href="/" className="btn btn-secondary mt-3" onClick={handleClick} type="submit" disabled/*={!isValid()} */ >Reservar</a>

    </Fragment>
  );
}

export default HouseDetail;
