import { useState, useEffect } from 'react';
import HouseItem from './HouseItem';
import HousesFilter from './HousesFilter'

import housesService from '../../../src/services/houses-service';
import { Fragment } from 'react';

function HousesList({ minSearchChars }) {

    const [state, setState] = useState({
        houses: [],
        loading: false
    });
    const [search, setSearch] = useState('');

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

        if (search.length >= minSearchChars || search.length === 0) {
            fetchHouses();
        }

        return () => {
            isUnmounted = true;
        }
    }, [search, minSearchChars]);

    const handleSearch = search => setSearch(search);

    const { houses, loading } = state;

    return (
        <Fragment className="container">
            <div className="row row-col-3">
                <div className="col-3 ms-5 my-2">
                    <div className="card bg-light">
                        <HousesFilter className="mb-3" onSearch={handleSearch} loading={loading} />
                    </div>
                </div>
                <div className="col-6 my-2">
                    {houses.map(house => (
                        <div key={house.id} className="col mb-4"><HouseItem house={house} /></div>
                    ))}
                </div>
                <div className="col-2 my-2">
                    <div className="card bg-light text-secondary">
                        <h3 className="mx-3">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            Si tienes una casa                            
                            y no le das uso
                            <br/>
                            <br/>
                            <br/>
                            colabora con nosotros
                            <br/>
                            <br/>
                            <br/>
                            y tendras muchas ventajas
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </h3>
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
