import { useState, useEffect } from "react";
import usersService from "../../services/users-service";
import './users-list.css'

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
    <div className="grid container col-10">
      <div className="row py-5">
        <div className="col-12 d-flex justify-content-center border-2 bg-secondary text-light">
          <h2 className="py-2">Lista de usuarios</h2>

        </div>
      </div>

      <div className="row">

        <div className="d-flex justify-content-between border border-dark border-1 py-3">
          <th className="px-3">Nombre</th>
          <th className="px-3">Email</th>
          <th className="px-3">Rol</th>
          <th className="px-3">Estado</th>
          <th className="px-3">Avatar</th>
        </div>

        {users.map(user => (
          <div key={user.id} className="d-flex border justify-content-between align-items-center border border-dark border-1 py-1">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
            <span className={`${user.userState === true ? "text-secondary" : "d-none"}`}>Activo</span>
            <span className={`${user.userState === false ? "text-secondary text-danger" : "d-none"}`}>No activo</span>
            <span className="img-responsive m-2 rounded-2"><img src={user.avatar} alt="avatar" className="avatar" /></span>
          </div>
        ))}

      </div>
    </div>
  )
}

export default UsersList;
