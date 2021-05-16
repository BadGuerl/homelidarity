import RegisterForm from '../components/users/RegisterForm';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="login-card row">
      <div className="col-12 col-sm-4 mx-auto">
        <RegisterForm />
        <div className="d-grid gap-2">
          <Link className="btn btn-warning text-white" type="button" to="/authenticate/google">
            <i className="fa fa-google me-2"></i>Regístrate con Google</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;