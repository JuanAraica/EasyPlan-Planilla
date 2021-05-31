import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Adelantos from './pages/Adelantos';
import Historial from './pages/Historial';
import Jornadas from './pages/Jornadas';
import Prestamos from './pages/Prestamos';
import Soporte from './pages/Soporte';
import Trabajadores from './pages/Trabajadores';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/Adelantos' component={Adelantos} />
          <Route path='/clientes' component={Clientes} />
          <Route path='/trabajadores' component={Trabajadores} />
          <Route path='/prestamos' component={Prestamos} />
          <Route path='/historial' component={Historial} />
          <Route path='/soporte' component={Soporte} />
          <Route path='/jornadas' component={Jornadas} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;