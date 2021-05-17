import { useContext, Fragment } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

function UserForm() {

    const { user, isAuthenticated/*, onUserChange*/ } = useContext(AuthContext);
    return (
        <div className="login-card mt-4">
            {isAuthenticated() &&
                <Fragment>
                    <h3 className="text-warning border-bottom pb-5">Edita tu perfil</h3>
                    <div className="container col-md-7 mt-5">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <img src={user.avatar} alt="avatar" className="avatar w-100" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h4 className="name card-title mt-4">{user.name}</h4>
                                        <p className="email card-text mt-4">{user.email}</p>
                                        <button className="btn btn-warning"> Editar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default UserForm;