import { useState, /*useContext*/ } from "react";
// import { useHistory } from "react-router";
// import usersService from "../../services/users-service";
// import { AuthContext } from '../../contexts/AuthStore';

function UsersList() {
  // const { onUserChange } = useContext(AuthContext);
  // const history = useHistory();

  const [state] = useState({
    user: {
      avatar: '',
      name: '',
      email: '',
      role: ''
    },
    errors: {}
  })

  
  const { users } = state;
  

  return (
    <div>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1>Lista de usuarios</h1>
          <a className="btn btn-primary" href="/register"><i className="fa fa-plus"></i></a>
        </div>
      </div>

      <hr className="mt-0" />

      <div className="col-6 my-2">
        <table>
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {users.map(user => (
                <div key={user.id} className="col mb-4">
                  <th scope="row"></th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.avatar}</td>
                </div>
              ))}
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default UsersList;
