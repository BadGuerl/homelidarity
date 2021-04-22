import { useState } from 'react';
import './houses.css';

function HousesFilter({ className, onSearch, loading }) {

  const [search, setSearch] = useState({end:''});

  const resetDate = () =>{
    search.end='';
    setSearch({
      ...search
    }) 
  }

  const handleCheckChange = (event) => {
    
    if (!event.target.checked) {
      delete search[event.target.name];      
    } else {
      search[event.target.name]=true;
    }

    setSearch({
      ...search
    })
  }
  const handleInputChange = (event) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value
    })
  }
  const enviarSearch = () => {
    onSearch(search);
  }

  return (
    <div className={`row ${className}`}>
      <div className="col text-start">
        <h5 className="text-secondary m-3">Buscar</h5>

        <div className="m-3">
          <label htmlFor="end" className="form-label text-secondary">Fecha de entrada</label>
          <div className="position-relative">
            <input type="datetime-local" className="form-control" id="end" name="end" onChange={handleInputChange} value={search.end} />
            {
              search.end && (
                <i className="fa fa-times resetDate" onClick={resetDate}></i>
              )
            }
          </div>
          
        </div>

        <div className="m-3">
          <input className="form-control" type="text" placeholder="Número de huespedes" onChange={handleInputChange} aria-label="capacity" id="capacity" name="capacity" />
        </div>

        <div className="form-check form-switch ms-3 text-start text-secondary mt-5">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="enabled" onChange={handleCheckChange} />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Adaptada a movilidad reducida</label>
        </div>

        <div className="form-check form-switch ms-3 text-start text-secondary">
          <input className="form-check-input" type="checkbox" name="pet" id="flexSwitchCheckDefault" onChange={handleCheckChange} />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Se admiten mascotas
          </label>
        </div>

        <div className="mb-4">
          <h5 className="text-secondary ms-3 mt-4">Servicios cercanos</h5>
        </div>

        <div className="ms-3 text-start text-secondary mb-3">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="farmacia" onChange={handleCheckChange} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Farmacia</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="supermercado" onChange={handleCheckChange} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Supermercado</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="metro" onChange={handleCheckChange} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Metro</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="escuela" onChange={handleCheckChange} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Escuela</label>
          </div>
        </div>

        <div className="text-center mt-4 mb-3">
          {/* <button type="text" className="btn btn-secondary" value={search} onChange={handleChange}>
            Buscar
          </button> */}
          <button type="text" className="btn btn-secondary" onClick={enviarSearch}>
            Buscar
          </button>
        </div>

      </div>
    </div>
  )
}

HousesFilter.defaultProps = {
  loading: false,
  className: '',
  onSearch: () => { }
}

export default HousesFilter;