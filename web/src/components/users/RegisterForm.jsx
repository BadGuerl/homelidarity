import { useState } from 'react';
import { useHistory } from 'react-router';

import { register } from '../../services/users-service';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'El nombre del usuario es requerido';
    }
    return message;
  },
  email: (value) => {
    let message;
    if (!value) {
      message = 'Se requiere un email válido';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'El email no es válido';
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = 'Se requiere una contraseña válida';
    } else if (!PASSWORD_PATTERN.test(value)) {
      message = 'La contraseña no es válida';
    }
    return message;
  }
}

function RegisterForm() {

  const history = useHistory();
  const [state, setState] = useState({
    user: {
      name: '',
      email: '',
      password: ''
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password()
    },
    touch: {}
  });

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      user: {
        ...state.user,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      try {
        const { user } = state;
        await register(user);
        history.push('/login', { email: user.email });
      } catch (error) {
        // const { message, errors } = error && error.response ? error.response.data : error;
        // console.error(message);
        // setState(state => ({
        //   ...state,
        //   errors: errors
        // }))
        console.log("Error ", error)
      }
    }
  }

  const { user, errors /*touch */ } = state;

  return (
    <form className="mt-3 mb-3" onSubmit={handleSubmit}>

      <h3 className="text-secondary m-5">Regístrate</h3>

      <div className="input-group mb-3">
        <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
        {/* <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`} */}
        <input
          type="text"
          name="name"
          required
          className={`form-control`}
          placeholder="Nombre de usuario"
          onBlur={handleBlur}
          onChange={handleChange}
          value={user.name} />
        <div className="invalid-feedback">{errors.name}</div>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text"><i className="fa fa-envelope fa-fw"></i></span>
        {/* <input type="text" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid' : ''}`} */}
        <input
          type="text"
          name="email"
          className={`form-control`}
          required
          placeholder="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={user.email} />
        <div className="invalid-feedback">{errors.email}</div>
      </div>

      <div className="input-group mb-4">
        <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
        {/* <input type="password" name="password" className={`form-control ${touch.password && errors.password ? 'is-invalid' : ''}`} */}
        <input
          type="password"
          name="password"
          className={`form-control`}
          required
          placeholder="Contraseña"
          onBlur={handleBlur}
          onChange={handleChange}
          value={user.password} />
        <div className="invalid-feedback">{errors.password}</div>
      </div>

      <div className="d-grid gap-2">
        <button className="btn btn-secondary mb-2" type="submit" disabled={!isValid()}>Regístrate</button>
      </div>

    </form>
  );
}

export default RegisterForm;
