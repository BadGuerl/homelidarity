import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import usersService from "../services/users-service";

function Profile() {
  const params = useParams();

  const [state, setState] = useState();

  useEffect(() => {
    setState({});
    getUser();
  }, [params]);

  function getUser() {
      console.log(params)
    if (state === undefined) {
      usersService
        .profile(params.id)
        .then((user) => {
          console.log(typeof user);
          setState(user);
        })
        .catch((error) => console.log(error));
    }
  }

  

  console.log(state);
  if (state?.user !== undefined) {
    return <div>{state?.user?.name}</div>;
  } else {
    return (
      <div>
        <p>user Loading</p>
      </div>
    );
  }
}

export default Profile;
