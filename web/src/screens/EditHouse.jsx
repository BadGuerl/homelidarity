import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import HouseForm from '../components/houses/HouseForm';
import { AuthContext } from '../contexts/AuthStore';

import housesService from '../services/houses-service';

function EditHouse() {

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [house, setHouse] = useState();

  useEffect(() => {
    async function fetchHouse() {
      const { id } = params;
      const house = await housesService.get(id);
      if (!isUnmounted) {
        if (user?.id !== house.idHost) {
          history.push('/403')
        } else {
          // Prepare model for EventForm
          house.images = house.images[''];
          house.latitude = house.location[1];
          house.longitude = house.location[0];
          house.start = moment(house.start).format('yyyy-MM-DDThh:mm');
          house.end = moment(house.end).format('yyyy-MM-DDThh:mm');
          delete house.location;
          setHouse(house);
        }
      }
    }

    let isUnmounted = false;
    fetchHouse();
    return () => {
      isUnmounted = true;
    }
  }, [params, history, user]);
  
  if (!house) {
    return null;
  }

  return (
    <HouseForm house={house} />
  )
}

export default EditHouse;
