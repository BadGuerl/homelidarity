import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <LoginForm />
        <hr/>
        <div className="d-grid gap-2">
          <Link className="btn btn-secondary mt-2" type="button" to="/authenticate/google"><i className="fa fa-google me-2"></i>Inicia sesión con Google</Link>
          <Link className="btn btn-secondary mt-2" type="button" to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
