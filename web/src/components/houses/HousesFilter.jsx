import { useState } from 'react';

function HousesFilter({ className, onSearch, loading }) {

  const [search, setSearch] = useState('');

  const handleChange = (house) => {
    const { value } = house.target;
    setSearch(value);
    onSearch(value);
  }

  return (
    <div className={`row ${className}`}>
      <div className="col text-start">
        <h5 className="text-secondary m-3">Buscar</h5>

        <div className="m-3">
          <label for="end" className="form-label text-secondary">Fecha de salida</label>
          <input type="datetime-local" className="form-control" id="end" />
        </div>

        <div className="m-3">
          <input className="form-control" type="text" placeholder="Número de huespedes" aria-label="capacity" id="capacity" />
        </div>

        <div class="form-check form-switch ms-3 text-start text-secondary mt-5">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">Adaptada a movilidad reducida</label>
        </div>

        <div class="form-check form-switch ms-3 text-start text-secondary">
          <input className="form-check-input" type="checkbox" name="flexSwitchCheckDefault" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Se admiten mascotas
          </label>
        </div>

        <div className="mb-4">
          <h5 className="text-secondary ms-3 mt-4">Servicios cercanos</h5>
        </div>

        <div className="ms-3 text-start text-secondary mb-3">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" for="flexSwitchCheckDefault">Farmacia</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" for="flexSwitchCheckDefault">Supermercado</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" for="flexSwitchCheckDefault">Metro</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" for="flexSwitchCheckDefault">Escuela</label>
          </div>
        </div>

        <div className="text-center mt-4 mb-3">
          <button type="text" className="btn btn-secondary" value={search} onChange={handleChange}>
            <i className={`fa fa-${loading ? 'refresh fa-spin' : 'search'}`}></i>
            Buscar
          </button>
        </div>

        {/* <div className="input-group mb-2">
          <span className="input-group-text ms-3">
            <i className={`fa fa-${loading ? 'refresh fa-spin' : 'search'}`}></i>
          </span>
          <input type="text" name="title" className="form-control me-2" placeholder="Search by title..."
            value={search} onChange={handleChange} />
        </div> */}

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