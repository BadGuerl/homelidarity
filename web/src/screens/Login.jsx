import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';
import './login.css';


// const socialLoginUrl = `${process.env.REACT_APP_API_BASE_URL}/authenticate/google`

function Login() {
  return (
    <div className="login-card row">
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
