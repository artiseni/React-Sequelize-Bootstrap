import App from './App';
import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

