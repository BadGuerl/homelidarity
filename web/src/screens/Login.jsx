import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <LoginForm />
        <div className="d-grid gap-2">
          <Link className="btn btn-warning text-white" type="button" to="/authenticate/google">
            <i className="fa fa-google me-2"></i>Inicia sesión con Google</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
