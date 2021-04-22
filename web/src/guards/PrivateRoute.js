import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthStore';

function PrivateRoute({ component: Component, roles = [], ...routeProps}) {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route {...routeProps} component={(componentProps => {
      if (isAuthenticated()) {
        if (roles.length === 0 || roles.includes(user.role)) {
          return <Component {...componentProps}/>
        } else return <Redirect to="/403"/>
        
      } 
      return <Redirect to="/login"/>
    }) } />
  )
}

export default PrivateRoute;
