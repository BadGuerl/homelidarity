import HouseDetail from '../components/houses/HouseDetail';

function Houses({ history, match, query }) {

    const houseId = match.params.id;
    
    return (
        <div><HouseDetail id={houseId} /></div>
    );
}

export default Houses;