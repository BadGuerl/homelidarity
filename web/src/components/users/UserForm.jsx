import { useContext, Fragment } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

function UserForm() {

    const { user, isAuthenticated/*, onUserChange*/ } = useContext(AuthContext);
    return (
        <div className="login-card">
            {isAuthenticated() &&
                <Fragment>
                    <div className="container">
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src={user.avatar} alt="avatar" className="w-100" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">{user.name}</h5>
                                        <p class="card-text">{user.email}</p>
                                        <p class="card-text"><small class="text-muted">{user.role}</small></p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-warning m-2"> Actualizar perfil </button>
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