import React, { Component } from 'react';
import logo from './logo.png';
import Login from './Components/login-form.js'
import LoginPage from './Components/login-page.js'
import TimesheetCreation from './Components/timesheet-creation.js'
import CompanyNavbar from './Components/navbar.js'
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, Col, Grid, Row} from "react-bootstrap";
import './App.css';

class App extends Component {

  render() {

    var homepageComponent = <LoginPage />

    if (localStorage.user) {
      homepageComponent = <div><CompanyNavbar /><TimesheetCreation /></div>
    }

    return (
      <div className="App">
        {homepageComponent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  if (state.session.authenticated === true) {
    return  {
      authenticated: true,
      name: state.session.user.username,
      user: state.session.user
    }
  } else {
    return  {
      authenticated: false,
      name: "anonymous",
      user: {}
    }
  }
}

export default connect(mapStateToProps)(App);
