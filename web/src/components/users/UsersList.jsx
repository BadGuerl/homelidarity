import { useState, useEffect } from "react";
import usersService from "../../services/users-service";
// import './users-list.css'

function UsersList() {

  const [state, setState] = useState({
    users: [],
    errors: {}
  })
  useEffect(() => {
    async function fetchUsers() {
      const users = await usersService.list();
      if (!isUnmounted) {
        setState({
          users: users
        })
      }
    }
    let isUnmounted = false;
    fetchUsers();
    return () => {
      isUnmounted = true;
    }
  }, []);

  const { users } = state;
  console.log(users);

  return (
    <div className="container col-8">
      <div className="title bg-secondary p-3 mb-3">
        <div>
          <h2 className="text-light">Lista de usuarios</h2>
        </div>
      </div>

      <div className="card-group">

        {users.map(user => (
          <div key={user.id} className="usuario col-4 p-1">

            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={user.avatar} alt="avatar" className="w-75 mt-3" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text"><small className="text-muted">{user.role}</small></p>
                  </div>
                  <div className="card-footer">
                    <span className={`${user.userState === true ? "text-dark" : "d-none"}`}>Activo</span>
                    <span className={`${user.userState === false ? "text-secondary text-danger" : "d-none"}`}>No activo</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default UsersList;
