import { useState, useEffect } from 'react';
import HouseItem from './HouseItem';
import HousesFilter from './HousesFilter'

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

        // if (search.length >= minSearchChars || search.length === 0) {
        //     fetchHouses();
        //     console.log("HOLA");
        // }
        
        fetchHouses();
         

        return () => {
            isUnmounted = true;
        }
    }, [search, minSearchChars]);

    const handleSearch = search => {
        //Aqui habria que hacer comprobaciones. Si se pasa capacity en blanco, o es un texto, etc.
        //Que hacemos con los keywords? Se mantienen? Lo cerramos como valores booleanos en mongo? Si se cambia habra que modificar el model
        
        //Comprobacion que capacity sea un numero
        if(Number.isNaN(parseInt(search.capacity))){
            delete search.capacity;
        }
        setSearch(search);
    }

    const { houses, loading } = state;

    return (
        <Fragment>
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
