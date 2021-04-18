import RegisterForm from '../components/users/RegisterForm';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <RegisterForm />
        <hr/>
        <div className="d-grid gap-2">
          <Link className="btn btn-primary mt-2" type="button" to="/authenticate/google"><i className="fa fa-google me-2"></i>Regístrate con Google</Link>
          <Link className="btn btn-secondary" type="button" to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;