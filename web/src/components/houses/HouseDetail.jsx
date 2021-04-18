import { useState, useEffect, Fragment, /*useContext*/ } from 'react';
import { useParams, useHistory } from 'react-router';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthStore';
import moment from 'moment';
// import HouseForm from './HouseForm';

import housesService from '../../services/houses-service';

function HouseDetail() {

  const params = useParams();
  const history = useHistory();
  // const { user } = useContext(AuthContext);
  const [house, setHouse] = useState();

  useEffect(() => {
    async function fetchHouse() {
      const { id } = params;
      console.info(`Buscando casa ${id}...`)
      const house = await housesService.get(id)
      if (!isUnmounted) {
        setHouse(house);
      }
    }

    let isUnmounted = false;
    fetchHouse();

    return () => {
      console.info(`Unmounting component...`);
      isUnmounted = true;
    }
  }, [history, params]);

  // const handleDeleteHouse = async () => {
  //   await housesService.remove(house.id);
  //   history.push('/houses');
  // }

  if (!house) {
    return null;
  }

  const { images, description, capacity, pet, enabled, sponsored, address, city, keyWords,/* idHost, location, start,*/ end } = house;
  return (
    <Fragment>
      {/* <div className="col-3 ms-5 my-1">
        <div className="card bg-light">
          <HouseForm className="mb-3" />
        </div>
      </div> */}

      <div className="container col-5 bg-light p-1 rounded">
        <img src={images} className="card-img-top w-75" alt="images" />
        <div className="card-body">
          <div className="text-start">
            <div className="card-body ">
              <h5 className="card-title text-warning">{sponsored}</h5>

              <p className="card-text"><small className="text-danger">Libre a partir del:
                        <i className=""></i> {moment(end).format('llll')}</small></p>

              <p className="card-text">{description}</p>
              <p className="card-text">Dirección: {address}. {city}</p>

              <div className="d-flex flex-row mb-2">
                <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                  <i className="fa fa-users me-1"></i>{capacity}</span>
                <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 
                                    7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                  </svg>{enabled} Adaptada</span>
                <span className="badge rounded-pill border border-secondary text-secondary me-2 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 
                                    7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                  </svg>{pet} Acepta mascotas</span>
              </div>

              {keyWords && (
                <div className="">
                  {keyWords.map(keyWords => <span key={keyWords}>{<span className="badge rounded-pill bg-secondary me-2">{keyWords}</span>}</span>)}
                </div>
              )}
            </div>
          </div>
          <a href="/" className="btn btn-secondary">Reservar</a>
        </div>
      </div>

      {/* <div className="row row-cols-1 mb-4">
        <div className="col text-center">
          <img src={images} alt={title} className="img-fluid" />
        </div>
        <div className="col">
          <h1 className="mt-4 mb-2">{sponsored}</h1>
          <div className="d-flex flex-row mb-2">
            <span className="badge rounded-pill bg-info me-2 p-2"><i className="fa fa-users me-1"></i>0 / {capacity}</span>
            <span className="badge rounded-pill bg-danger me-2 p-2"><i className="fa fa-clock-o me-1"></i>{moment(start).format('llll')} to {moment(end).format('llll')}</span>
          </div>
          <div className="text-muted fst-italic fw-light mb-2">By {sponsored}</div>
          {description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {tags && (
          <div className="col">
            {tags.map(tag => <span key={tag}>{<span className="badge rounded-pill bg-secondary me-2">{tag}</span>}</span>)}
          </div>
        )}
      </div>
      {user?.id === house.idHouse && (
        <div className="col my-3 text-center">
          <div className="alert alert-secondary" role="alert">
            <h4 className="fw-light mb-2">Admin Area</h4>
            <div className="btn-group" role="group">
              <Link className="btn btn-secondary" to={`/houses/${house.id}/edit`}>Update</Link>
              <button type="button" className="btn btn-danger" onClick={handleDeleteHouse}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col">
          <Link to="/houses" className="fw-lighter"><i className="fa fa-angle-left"></i> Back to Houses</Link>
        </div>
      </div> */}
    </Fragment>
  );
}

export default HouseDetail;