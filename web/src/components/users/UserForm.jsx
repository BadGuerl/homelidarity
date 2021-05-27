import React, { useContext/*, useState*/, Fragment } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
// import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
// import usersService from '../../services/users-service';

function UserForm() {

    // const userData = usersService;
    // const [data, setData] = useState(userData);
    // const [modalEditor, setModalEditor] = useState(false);
    // const [userSelect, setUserSelect] = useState({
    //     id: '',
    //     name: '',
    //     avatar: '',
    //     email: ''
    // });

    // const selectUser = (element,) => {
    //     setUserSelect(element);
    //      setModalEditor(true)
    // }

    // const handleChange = e => {
    //     const { name, value } = e.target;
    //     setUserSelect((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    //     console.log(userSelect);
    // }
    const { user, isAuthenticated/*, onUserChange*/ } = useContext(AuthContext);

    return (
        <div className="login-card mt-27">
            {isAuthenticated() &&
                <Fragment>
                    <h3 className="text-warning border-bottom pb-5">Edita tu perfil</h3>
                    <div className="container col-md-5 mt-5">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <img src={user.avatar} alt="avatar" className="avatar w-100" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body position-relative h-100">
                                        <h4 className="name card-title mt-4">{user.name}</h4>
                                        <p className="email card-text mt-4">{user.email}</p>
                                        <div className="d-flex justify-content-around position-absolute bottom-0 pb-3 w-100">
                                            <button className="btn btn-success" 
                                            // onclick={() => selectUser(element, 'Edit')}
                                            > Editar </button>
                                            <button className="btn btn-danger"> Eliminar </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <Modal isOpen={modalEditor}>
                            <ModalHeader>
                                <div>
                                    <h3>
                                        Edita tu perfil
                                    </h3>
                                </div>
                            </ModalHeader>

                            <ModalBody>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        name="name"
                                        value={selectUser && selectUser.id}
                                    />
                                    <br />

                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={selectUser && selectUser.email}
                                        onChange={handleChange}
                                    />
                                    <br />

                                    <label>avatar</label>
                                    <input
                                        className="form-control"
                                        type="img"
                                        name="avatar"
                                        value={selectUser && selectUser.avatar}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-warning">
                                    Editar
                                </button>
                                <button className="btn btn-danger">
                                    Cancelar
                                </button>
                            </ModalFooter>
                        </Modal> */}
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default UserForm;