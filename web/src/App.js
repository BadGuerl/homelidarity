import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './App.css';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer'
import HouseForm from './components/houses/HouseForm';
import Home from './components/houses/HousesList';
import About from './screens/About';
import Cookies from './screens/Cookies';
import HouseDetail from './components/houses/HouseDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthStore from './contexts/AuthStore';
import PrivateRoute from './guards/PrivateRoute';
import Error from './screens/Error';
import EditHouse from './screens/EditHouse';
import HousesList from './components/houses/HousesList';
import UsersList from './components/users/UsersList';
import AuthCallback from './screens/AuthCallback'
import BookingForm from './components/booking/BookingForm';
import BookingsList from './components/booking/BookingsList';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthStore>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/authenticate/google/cb" component={AuthCallback} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/houses" component={HousesList} />
            <Route exact path="/houses/:id" component={HouseDetail} />
            <PrivateRoute exact path="/houses/:id/edit" component={EditHouse} />
            <PrivateRoute exact path="/houses/:id/booking" component={BookingForm} />
            <PrivateRoute exact path="/bookings" component={BookingsList} />
            
            <PrivateRoute exact path="/create-house" component={HouseForm}/* roles={["admin", "editor"]}*/ />
            <PrivateRoute exact path="/users-list" component={UsersList} roles={["admin"]} />
            {/* <main className="mt-5 d-flex">
            <div className="col-2 mx-2">
              <HouseForm className="form">Formulario de busqueda de viviendas</HouseForm>
            </div>
            <div className="col-3">
              <div className="sponsor">Banner de sponsors</div>
            </div>
          </main> */}
          
            <Route exact path="/about" component={About} />
            <Route exact path="/cookies" component={Cookies} />

            <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} />

            <Redirect to="/home" />
          </Switch>
          <Footer />
        </AuthStore>
      </Router>
    </div>
  );
}

export default App;