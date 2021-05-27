import { useState, useEffect } from 'react';
import HouseItem from './HouseItem';
import HousesFilter from './HousesFilter';
import child from '../../images/child-and-clown.jpg';
import family from '../../images/family.jpg';

import housesService from '../../services/houses-service';
import { Fragment } from 'react';

function HousesList({ minSearchChars }) {

    const [state, setState] = useState({
        houses: [],
        loading: false
    });
    const [search, setSearch] = useState({});

    useEffect(() => {
        async function fetchHouses() {
            console.log('Buscando casas...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const houses = await housesService.list(search);
            if (!isUnmounted) {
                setState({
                    houses: houses,
                    loading: false
                })
            }
        }

        let isUnmounted = false;

        fetchHouses();


        return () => {
            isUnmounted = true;
        }
    }, [search, minSearchChars]);

    const handleSearch = search => {
        //Aqui habria que hacer comprobaciones. Si se pasa capacity en blanco, o es un texto, etc.
        //Comprobacion que capacity sea un numero
        if (Number.isNaN(parseInt(search.capacity))) {
            delete search.capacity;
        }
        setSearch(search);
    }

    const { houses, loading } = state;

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 ms-5 my-2">
                        <div className="card bg-light">
                            <HousesFilter className="mb-3" onSearch={handleSearch} loading={loading} />
                        </div>
                    </div>

                    <div className="col-6 mt-2">
                        {houses.map(house => (
                            <div key={house.id} className="col mb-4"><HouseItem house={house} /></div>
                        ))}
                    </div>
                    <div className="col-2 my-2">
                        <div className="card bg-light text-secondary">

                            <img src={family} alt="child" className="ratio ratio-16x9 image-fluid mb-4" />

                            <p>Si tienes una casa y no le das uso colabora con nosotros, tendrás muchas ventajas.</p>
                            <img src={child} alt="child" className="ratio ratio-16x9 image-fluid my-3" />

                            <p className="mt-2">O también puedes hacer una donación para los gastos de la vivienda con un simple Bizum al</p>
                            <p><i className="fa fa-whatsapp me-2 mb-3"></i>555 666 777</p>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

HousesList.defaultProps = {
    minSearchChars: 4
}

export default HousesList;
